import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-web-rtc',
  templateUrl: './web-rtc.component.html',
  styleUrls: ['./web-rtc.component.css']
})
export class WebRtcComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('camera', { static: true }) camera: ElementRef;
  @Input() public isRecording = false;

  constructor() {
    let mediaRecorder;
    let chunks = [];
    const record$ = document.querySelector('#record');
    const playback$ = document.querySelector('#playback');
    const timer$ = document.querySelector('#timer');
    const memoryUsage$ = document.querySelector('#memoryUsage');

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const constraints = {
      audio: true,
      video: {
        width: { exact: 1280 },
        height: { exact: 720 },
        //   width: { min: 1024, ideal: 1280, max: 1920 },
        //   height: { min: 576, ideal: 720, max: 1080 },
      },
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      this.camera.nativeElement.srcObject = stream;
    }).catch((err) => {
      console.error(err);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

}
