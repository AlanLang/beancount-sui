export const MEMBER = { 60777929312: '老公', 60777929298: '家用', 60777929314: '老婆' } as const
export const ACCOUNT = {
  5617194443: 'Liabilities:Alan:招商银行',
  5617194649: 'Assets:MeiMei:宁波银行',
  5617194740: 'Assets:MeiMei:交通银行',
  5617194742: 'Assets:MeiMei:支付宝',
  5617194745: 'Assets:Alan:微信',
  5617194747: 'Assets:Alan:招商银行储蓄卡',
  5617194748: 'Assets:Alan:饭卡',
  5617194750: 'Assets:MeiMei:微信',
  5617194751: 'Assets:Alan:公交卡',
  5620194972: 'Assets:Home:五口灶',
  5620195088: 'Liabilities:MeiMei:蚂蚁花呗',
  5620195090: 'Liabilities:MeiMei:招商银行',
}
export const CATEGORY = {
  0: '未知',
  311593040: 'Expenses:Traffic:充电',
  60777929323: 'Expenses:Diet:饮用水',
  60777929324: 'Expenses:Diet:水果',
  60777929325: 'Expenses:Diet:零食',
  60777929326: 'Expenses:Diet:餐馆',
  60777929327: 'Expenses:Diet:餐馆',
  60777929328: 'Expenses:Diet:餐馆',
  60777929331: 'Expenses:Diet:买菜',
  60777929354: 'Expenses:Fun:彩票',
  60777929381: 'Expenses:Shop:衣服',
  60777929387: 'Expenses:Shop:护肤',
  60777929389: 'Expenses:Shop:日用',
  60777929393: 'Expenses:Shop:数码',
  60777929400: 'Expenses:Traffic:打车',
  60777929402: 'Expenses:Traffic:地铁',
  60777929403: 'Expenses:Traffic:车险',
  60777929408: 'Expenses:Traffic:停车',
  60777929409: 'Expenses:Traffic:加油',
  60777929428: 'Expenses:Shop:药品',
  60777929444: 'Expenses:Daily:燃气费',
  60777929456: 'Income:Life:红包',
  60777929340: 'Expenses:Life:红包',
  60777929440: 'Expenses:Daily:电费',
}

export function getMember(memberId: keyof typeof MEMBER) {
  return MEMBER[memberId] || '未知'
}

export function getAccount(accountId: keyof typeof ACCOUNT, accountName: string) {
  return ACCOUNT[accountId] || `${accountId}:${accountName}`
}

export function getCategory(categoryId: keyof typeof CATEGORY, categoryName: string) {
  return CATEGORY[categoryId] || `${categoryId}:${categoryName}`
}
