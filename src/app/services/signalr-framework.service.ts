import { Injectable } from '@angular/core';
require('signalr');

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SignalrFrameworkService {
  private connection;
  private hub;

  constructor() {
    this.startConnection();
  }

  public startConnection() {
    // 連線通道
    this.connection = $.hubConnection('http://localhost:49594');

    // Hub
    this.hub = this.connection.createHubProxy('ChatHub');

    // 開始連線
    this.connection
      .start()
      .done(() => console.log('Framework Connection finished'))
      .catch(err => console.log(`Error: ${err}`));
  }

  public on(eventName: string, afterCatch: (...args: any) => void) {
    // 接收Hub事件後處理
    this.hub.on(eventName, afterCatch);
  }

  public sendToServer(invokeName: string, ...args: any[]) {
    // 發送事件
    this.hub
      .invoke(invokeName, ...args)
      .catch(err => console.log(`Error: ${err}`));
  }

  public disConnection() {
    // 停止連線
    this.hub
      .stop()
      .then(() => console.log('Core Connection stop'))
      .catch(err => console.log(`Error occur: ${err}`));
  }
}
