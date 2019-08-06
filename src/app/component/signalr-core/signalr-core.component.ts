import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalrCoreService } from 'src/app/services/signalr-core.service';

@Component({
  selector: 'app-signalr-core',
  templateUrl: './signalr-core.component.html',
  styleUrls: ['./signalr-core.component.css']
})
export class SignalrCoreComponent implements OnInit, OnDestroy {
  public name: string;
  public message: string;
  public messages: { name: string, message: string }[] = [];

  constructor(public signalrCoreService: SignalrCoreService) { }

  ngOnInit() {
    // 建立收到從Server來的事件後的處理
    this.signalrCoreService.on('ReceiveMessage', (name, message) => {
      this.messages.push({ name, message });
    });
  }

  ngOnDestroy() {
    // 斷開連線
    this.signalrCoreService.disConnection();
  }

  public sendMessage() {
    // 向Server發送
    this.signalrCoreService.sendToServer('SendMessage', this.name, this.message);
  }
}
