import { BillResponse } from './sui'

init()
async function init() {
  const list = await getBillList()
  console.log(list)
}

async function getBillList() {
  const bill = await getBillResponse(0)
  const list = bill.groups
  if (bill.pageCount > 0) {
    for (let index = 1; index < bill.pageCount; index++) {
      const { groups } = await getBillResponse(index)
      list.push(...groups)
    }
  }
  return list
}

function getBillResponse(page = 0): Promise<BillResponse> {
  return new Promise<BillResponse>((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'POST',
      url: 'https://www.sui.com/tally/new.rmi',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        cookie: document.cookie,
      },
      data: `opt=list2&beginDate=${dateFormat('YYYY.mm', new Date())}.01&endDate=${dateFormat(
        'YYYY.mm.dd',
        new Date()
      )}&cids=0&bids=0&sids=0&pids=0&memids=0&order=&isDesc=0&page=${page}&note=&mids=0`,
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
