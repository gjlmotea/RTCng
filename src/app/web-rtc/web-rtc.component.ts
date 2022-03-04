import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-web-rtc',
  templateUrl: './web-rtc.component.html',
  styleUrls: ['./web-rtc.component.css']
})
export class WebRtcComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('camera', {static: true}) camera: ElementRef;
  @Input() public isRecording = false;
  public isCameraOn = false;
  public defaultSec = 60;
  public displaySec = 0;
  private countDown$: Subscription;


  constructor() {

  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    const constraints = {
      audio: true,
      video: {
        width: {exact: 1280},
        height: {exact: 720},
        //   width: { min: 1024, ideal: 1280, max: 1920 },
        //   height: { min: 576, ideal: 720, max: 1080 },
      },
    };

    // 開啟鏡頭
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      this.camera.nativeElement.srcObject = stream;
      this.isCameraOn = true;
    }).catch((err) => {
      console.error(err);
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    for (const propName of Object.keys(changes)) {
      const tick = timer(1000, 1000);

      // 當錄影開始
      if (changes.isRecording.currentValue === true && changes.isRecording.previousValue === false) {
        this.displaySec = this.defaultSec;
        this.countDown$ = tick.subscribe(sec => {
          this.displaySec = this.defaultSec - (sec + 1);
        } );
      }

      // 當結束錄影
      if (changes.isRecording.currentValue === false && changes.isRecording.previousValue === true) {
        this.countDown$.unsubscribe();
      }
    }
  }

}
