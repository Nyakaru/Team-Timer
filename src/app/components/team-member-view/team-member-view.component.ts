import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-team-member-view',
  templateUrl: './team-member-view.component.html',
  styleUrls: ['./team-member-view.component.scss']
})
export class TeamMemberViewComponent implements OnInit {
  
  @Input() member;
  @Output() selectedMember = new EventEmitter();
  @Output() deletedMember = new EventEmitter();
  timer;
  timeLeft: string = "04:00";
  isClicked: boolean = false;
  duration : number = 60 * 4;
  constructor() { }

  ngOnInit() {
  }

  deleteMember(key: any): void {
    this.deletedMember .emit(key);
  }

  initTimer(duration) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    const timer = ()=> {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        if (diff >= 0) {
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
       this.duration = (minutes*60 + seconds);
       this.timeLeft = minutes + ":" + seconds; 
        }

    };
    // we don't want to wait a full second before the timer starts
    timer();
    this.timer = setInterval(timer, 1000);
}

startTimer() {
  if(!this.isClicked){
  this.isClicked= true;
  var fiveMinutes = 5 * 1;
  this.initTimer(this.duration);
}else{
  this.isClicked= false;
  clearInterval(this.timer)
}
  
  }

  stopTimer() {
    this.isClicked= false;
    clearInterval(this.timer)
  }

  handleMemberClick(key) {
    this.selectedMember.emit(key);
    if(!this.isClicked){
      this.startTimer()
    }
    else{
      this.stopTimer()
    }
  }

  handleMemberPause() {
    if(this.isClicked) {
    }
  }
  
}
