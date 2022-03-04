import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-page',
  templateUrl: './control-page.component.html',
  styleUrls: ['./control-page.component.css']
})
export class ControlPageComponent implements OnInit {
  public isRecording = false;
  constructor() { }

  ngOnInit(): void {
  }

  public startRecording() {
    this.isRecording = true;
  }

  public stopRecording() {
    this.isRecording = false;
  }
}
