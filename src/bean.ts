export const MEMBER = { 60777929312: '老公', 60777929298: '家用', 60777929314: '老婆' } as const
export const ACCOUNT = {}
export const CATEGORY = {}

export function getMember(memberId: keyof typeof MEMBER) {
  return MEMBER[memberId] || '未知'
}

export function getAccount(accountId: keyof typeof ACCOUNT, accountName: string) {
  return ACCOUNT[accountId] || accountName
}

export function getCategory(categoryId: keyof typeof CATEGORY, categoryName: string) {
  return CATEGORY[categoryId] || categoryName
}
