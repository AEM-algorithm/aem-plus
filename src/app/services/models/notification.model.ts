export class Notification {
  constructor(
    public id: string,
    public type: string,
    public title: string,
    public message: string,
    public date: number,
    public isRead: boolean,
    public walletAddress?: string
  ) {
    // type: system || transaction
    //    if type === transaction: has walletAddress
    //    if type === system: no walletAddress
  }
}
