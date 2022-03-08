import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-web-rtc',
  templateUrl: './web-rtc.component.html',
  styleUrls: ['./web-rtc.component.css']
})
export class WebRtcComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('camera', {static: true}) camera: ElementRef;
  @Input() public isRecording = false;
  @Output() public isRecordingChange = new EventEmitter<boolean>();
  @Output() public isCameraOnChange = new EventEmitter<boolean>();
  public isCameraOn = false;
  public defaultSec = 60; // 預設錄影秒數
  public displaySec = 0; // 畫面顯示的倒數秒數
  private chunks = [];
  private recorder: MediaRecorder;
  private countDown$: Subscription;
  private tick = timer(0, 1000); // tick的初始化時讀秒與後續讀秒

  constructor() {

  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.openCamera();
  }

  public openCamera() {
    const constraints = {
      audio: true,
      video: {
        width: {exact: 1280}, // { min: 1024, ideal: 1280, max: 1920 },
        height: {exact: 720}, // { min: 576, ideal: 720, max: 1080 },
      },
    };

    // 開啟鏡頭
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      this.camera.nativeElement.srcObject = stream;
      this.isCameraOn = true;
      this.isCameraOnChange.emit(true);
    }).catch((err) => {
      console.error(err);
      this.isCameraOn = false;
      this.isCameraOnChange.emit(false);
    });
  }

  public closeCamera() {
    this.camera.nativeElement.srcObject.getVideoTracks().forEach(track => {
      track.stop();
    });
    this.camera.nativeElement.srcObject = null;
    this.isCameraOn = false;
    this.isCameraOnChange.emit(false);
  }


  public ngOnChanges(changes: SimpleChanges) {
    for (const propName of Object.keys(changes)) {

      // 當按下錄影鍵
      if (changes.isRecording.currentValue === true && changes.isRecording.previousValue === false) {
        this.startRecording();
      }

      // 按下結束錄影鍵
      if (changes.isRecording.currentValue === false && changes.isRecording.previousValue === true) {
        this.stopRecording();
      }
    }
  }

  private startRecording() {
    this.isRecordingChange.emit(true);
    this.displaySec = this.defaultSec;
    this.countDown$ = this.tick.subscribe(sec => {
      this.displaySec = this.defaultSec - sec;
      if (this.displaySec <= 0) {
        this.isRecordingChange.emit(false);
      }
    });
    this.recorder = new MediaRecorder(this.camera.nativeElement.srcObject);
    this.recorder.start(50); // 每隔50毫秒回傳一次串流影片
    this.recorder.ondataavailable = (event) => {
      this.chunks.push(event.data);
    };
  }

  private stopRecording() {
    this.isRecordingChange.emit(false);
    this.displaySec = 0;
    this.countDown$.unsubscribe();
    this.recorder.stop();

    const blob = new Blob(this.chunks, {type: 'video/mp4; codecs=vp8'});

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = (e) => {
      console.log(reader.result); // 當停止錄影時，輸出base64字串
    };
  }
}
