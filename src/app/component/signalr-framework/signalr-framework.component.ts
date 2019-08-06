import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalrFrameworkService } from 'src/app/services/signalr-framework.service';

@Component({
  selector: 'app-signalr-framework',
  templateUrl: './signalr-framework.component.html',
  styleUrls: ['./signalr-framework.component.css']
})
export class SignalrFrameworkComponent implements OnInit, OnDestroy {
  public name: string;
  public message: string;
  public messages: { name: string, message: string }[] = [];

  constructor(private signalrFrameworkService: SignalrFrameworkService) { }

  ngOnInit() {
    // 建立收到事件後動作
    this.signalrFrameworkService
      .on('BroadcastMessage', (name, message) => {
        this.messages.push({ name, message });
      });
  }

  ngOnDestroy() {
    // 斷開連線
    this.signalrFrameworkService.disConnection();
  }

  public sendMessage() {
    // 向Server發送
    this.signalrFrameworkService.sendToServer('SendMessage', this.name, this.message);
  }
}
