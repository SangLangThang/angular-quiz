import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ClientForm, Question } from 'src/app/models/User.model';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'app-game-box',
  templateUrl: './game-box.component.html',
  styleUrls: ['./game-box.component.scss'],
})
export class GameBoxComponent implements OnInit {
  /* load data for game */
  showResult = false;
  showGame = true;
  questions: Question[] = [];
  /* variable start game */
  clientId:string
  topicId:string
  clientData:ClientForm
  text_btn_next = 'Câu tiếp theo';
  time_start = 15;
  percent = '0%';
  ques_start = 0;
  ques_total = 0;
  score = 0;
  correct = 0;
  start: any;
  result_icon = '🎉';
  result_slogan = 'Thật tuyệt!';
  client = '';
  can_next_question = false;
  /* game function */

  constructor(
    private renderer: Renderer2,
    private routes: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  @ViewChildren('option') options: QueryList<ElementRef>;

  ngOnInit(): void {
    this.clientId = this.routes.snapshot.params['client'];
    this.topicId = this.routes.snapshot.params['topic'];
    this.firebaseService.getClient(this.clientId).pipe(take(1))
      .subscribe((client:any)=>{
        this.clientData = client
        this.client = client.name;
      });
    this.firebaseService.getQuestions(this.topicId).pipe(take(1))
      .subscribe((questions: any[])=>{
        this.questions = questions
        this.ques_total = questions.length;
        this.startGame();
      })
  }

  questionName(val: any) {
    return val?.name;
  }

  startGame() {
    this.time_start = 15;
    this.percent = '0%';
    this.start = setInterval(() => {
      this.time_start--;
      this.percent = `${((15 - this.time_start) * 100) / 15}%`;
      if (this.time_start === 0) {
        clearInterval(this.start);
        this.optionSelected(1000, this.questions[0].answer);
      }
    }, 1000);
  }

  endGame() {
    if (this.score > 3) {
      this.result_icon = '🎉';
      this.result_slogan = 'Thật tuyệt!';
    } else {
      if (this.score > 1) {
        this.result_icon = '😎';
        this.result_slogan = 'Chúc mừng!';
      } else {
        this.result_icon = '😐';
        this.result_slogan = 'Thật tiếc!';
      }
    }
    this.showGame = false;
    this.showResult = true;
    this.firebaseService.updateClient(this.clientId,this.score)

  }
  nextQuestion() {
    if (this.ques_start < this.ques_total) {
      this.startGame();
      this.ques_start++;
    }
    if (this.ques_start === this.ques_total - 1) {
      this.text_btn_next = 'Hoàn thành';
    }
    if (this.ques_start === this.ques_total) {
      this.endGame();
    }
    this.can_next_question = false;
  }

  optionSelected(select: number, answer: number) {
    this.can_next_question = true;
    clearInterval(this.start);
    this.options.forEach((ele: ElementRef, i: number) => {
      if (select === i) {
        if (select === answer) {
          this.score++;
          this.renderer.addClass(ele.nativeElement, 'correct');
        } else {
          this.renderer.addClass(ele.nativeElement, 'incorrect');
        }
      } else {
        if (i === answer) {
          this.renderer.addClass(ele.nativeElement, 'correct');
        }
      }
      this.renderer.addClass(ele.nativeElement, 'unselect');
    });
  }
}
