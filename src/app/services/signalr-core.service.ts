import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrCoreService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.startConnection();
  }

  public startConnection() {
    // 連線通道
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:44317/chatHub').build();

    // 開始連線
    this.hubConnection
      .start()
      .then(() => console.log('Core Connection finished'))
      .catch(err => console.log(`Error occur: ${err}`));
  }

  public disConnection() {
    // 停止連線
    this.hubConnection
      .stop()
      .then(() => console.log('Core Connection stop'))
      .catch(err => console.log(`Error occur: ${err}`));
  }

  public sendToServer(invokeName: string, ...args: any[]) {
    // 向Server端發送
    // Invoke 第一個參數對應到 Hub function name，第二個參數開始都是Input param
    if (args) {
      this.hubConnection
        .invoke(invokeName, ...args)
        .catch(err => console.error(err));
    }
  }

  public on(methodName: string, afterCatch: (...args: any[]) => void) {
    // 事件接收
    this.hubConnection.on(methodName, afterCatch);
  }
}
