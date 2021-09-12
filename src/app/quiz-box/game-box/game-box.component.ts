import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/User.model';
import { questions } from 'src/app/shared/questions';
@Component({
  selector: 'app-game-box',
  templateUrl: './game-box.component.html',
  styleUrls: ['./game-box.component.scss']
})
export class GameBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  questions:Question[]=questions
  time_start=15;
  ques_start=0;
  game(){
    setInterval(()=>{
      this.time_start--
    },1000)
  }
  nextQuestion(){
    console.log(this.ques_start)
    this.ques_start++
  }
}
