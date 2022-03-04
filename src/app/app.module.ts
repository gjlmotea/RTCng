import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebRtcComponent } from './web-rtc/web-rtc.component';
import { ControlPageComponent } from './control-page/control-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WebRtcComponent,
    ControlPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
