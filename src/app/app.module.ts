import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignalrFrameworkComponent } from './component/signalr-framework/signalr-framework.component';
import { SignalrCoreComponent } from './component/signalr-core/signalr-core.component';

@NgModule({
  declarations: [
    AppComponent,
    SignalrFrameworkComponent,
    SignalrCoreComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
