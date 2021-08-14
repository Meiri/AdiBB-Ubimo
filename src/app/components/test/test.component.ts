import { Component, Input, OnInit } from '@angular/core';
import { IAdEvent } from 'ubimo-ad-dispatcher';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  
  @Input('ad-object') adObject!: IAdEvent;


  progress: number = 0;
  positionX = 0;
  positionY = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
      this.progress = this.progress + 20;
    },1000);
  }

}
