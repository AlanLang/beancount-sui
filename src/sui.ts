import { ACCOUNT, CATEGORY, MEMBER } from './bean'

export interface BillResponse {
  income: number
  beginDate: string
  symbol: string
  pageCount: number
  endDate: string
  pageNo: number
  payout: number
  groups: Group[]
}

export interface Group {
  income: number
  payout: number
  list: List[]
}

export interface List {
  account: number
  buyerAcount: string
  buyerAcountId: keyof typeof ACCOUNT
  categoryIcon: string
  categoryId: keyof typeof CATEGORY
  categoryName: string
  content: string
  currencyAmount: number
  date: DateClass
  imgId: number
  itemAmount: number
  memberId: keyof typeof MEMBER
  memberName: string
  memo: string
  projectId: number
  projectName: ProjectName
  relation: Relation
  sId: string
  sellerAcount: string
  sellerAcountId: number
  tranId: number
  tranName: TranName
  tranType: number
  transferStoreId: number
  url: string
}

export interface DateClass {
  date: number
  day: number
  hours: number
  minutes: number
  month: number
  seconds: number
  time: number
  timezoneOffset: number
  year: number
}

export enum ProjectName {
  日常生活 = '日常生活',
}

export enum Relation {
  Empty = '',
  Fcd4Aca8611B4F3C9876C274A0C432B7 = 'FCD4ACA8-611B-4F3C-9876-C274A0C432B7',
}

export enum TranName {
  支出 = '支出',
  转账 = '转账',
}
