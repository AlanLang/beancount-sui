import { getAccount, getCategory, getMember } from './bean'
import { BillResponse, List } from './sui'
init()

async function init() {
  const button = document.createElement('button')
  button.style.position = 'fixed'
  button.style.top = '20px'
  button.style.right = '20px'
  button.style.zIndex = '10000000'
  button.textContent = '生成'

  const input = document.createElement('input')
  input.style.position = 'fixed'
  input.style.top = '20px'
  input.style.right = '70px'
  input.style.zIndex = '10000000'
  input.style.width = '150px'
  input.style.height = '26px'
  input.value = `${dateFormat('YYYY.mm', new Date())}.01-${dateFormat('YYYY.mm.dd', new Date())}`
  document.body.appendChild(button)
  document.body.appendChild(input)

  button.addEventListener('click', async () => {
    const inputValue = input.value //2022.08.01-2022.08.11
    const [start, end] = inputValue.split('-')
    const bean: string[] = []
    const account: { [key: number]: string } = {}
    const category: { [key: number]: string } = {}
    const list = await getBillList(start, end)
    list.forEach((day) => {
      day.list.forEach((item) => {
        bean.push(renderBean(item))
        account[item.buyerAcountId] = item.buyerAcount
        category[item.categoryId] = item.categoryName
      })
      bean.push(`;--------${dateFormat('YYYY年mm月dd日', new Date(day.list[0].date.time))}--------`)
    })
    console.log(bean.reverse().join('\r\n'))
  })
}

function renderBean(item: List) {
  const meno = `${item.memo}`.trim()
  return `${dateFormat('YYYY-mm-dd', new Date(item.date.time))} * "${item.sellerAcount}" "${meno}" #${getMember(item.memberId)}
    ${getCategory(item.categoryId, item.categoryName)}    ${item.tranName === '收入' ? '-' : ''}${
    item.itemAmount
  } CNY
    ${getAccount(item.buyerAcountId, item.buyerAcount)}  ${item.tranName === '收入' ? '' : '-'}${
    item.itemAmount
  } CNY \r\n`
}

async function getBillList(start: string, end: string) {
  const bill = await getBillResponse(start, end, 0)
  const list = bill.groups
  if (bill.pageCount > 0) {
    for (let index = 1; index < bill.pageCount; index++) {
      const { groups } = await getBillResponse(start, end, index)
      list.push(...groups)
    }
  }
  return list
}

function getBillResponse(start: string, end: string, page = 0): Promise<BillResponse> {
  return new Promise<BillResponse>((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'POST',
      url: 'https://www.sui.com/tally/new.rmi',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        cookie: document.cookie,
      },
      data: `opt=list2&beginDate=${start}&endDate=${end}&cids=0&bids=0&sids=0&pids=0&memids=0&order=&isDesc=0&page=${page}&note=&mids=0`,
      onload(response) {
        const result = JSON.parse(response.responseText)
        resolve(result)
      },
      onerror(response) {
        console.error('请求失败:')
        console.error(response)
        reject(response)
      },
    })
  })
}

function dateFormat(fmt: string, date: Date) {
  let ret
  const opt: any = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp(`(${k})`).exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
}
