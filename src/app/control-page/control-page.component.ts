import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-page',
  templateUrl: './control-page.component.html',
  styleUrls: ['./control-page.component.css']
})
export class ControlPageComponent implements OnInit {
  public isRecording = false;
  public isCameraOn = false;
  constructor() { }

  ngOnInit(): void {
  }

  public startRecording() {
    this.isRecording = true;
  }

  public stopRecording() {
    this.isRecording = false;
  }

  public onChangeRecordingStatus(bool) {
    this.isRecording = bool;
  }

  public onChangeCameraStatus(bool) {
    this.isCameraOn = bool;
  }
}
