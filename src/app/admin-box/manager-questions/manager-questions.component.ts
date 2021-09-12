import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Levels, Questions, Topics } from 'src/app/models/User.model';
import { FirebaseService } from './../../shared/firebase.service';

@Component({
  selector: 'app-manager-questions',
  templateUrl: './manager-questions.component.html',
  styleUrls: ['./manager-questions.component.scss'],
})
export class ManagerQuestionsComponent implements OnInit {
  levels: Levels[];
  topics: Topics[];
  questions: Questions[];
  showQuestion:boolean=true;
  showFormQuestion:boolean=false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firebaseService
      .getLevels()
      .pipe(take(1))
      .subscribe((levels: any) => {
        this.levels = levels;
      });
  }

  onChange(levelId: string) {
    this.firebaseService
      .getTopics(levelId)
      .pipe(take(1))
      .subscribe((topics: any) => {
        this.topics = topics;
        console.log(topics);
      });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.firebaseService
      .getQuestions(tabChangeEvent.tab.ariaLabel)
      .pipe(take(1))
      .subscribe((questions: any) => {
        this.questions = questions;
      });
  }

  goForm() {
    this.router.navigate(['/admin/edit']);
  }

  editQuestion(questionId:string){
    console.log(questionId)
    this.router.navigate(['/admin/edit']);
  }

  deleteQuestion(questionId:string){
    console.log(questionId)
  }

  addQuestion(topicId:string){
    this.router.navigate(['/admin/edit']);
  }
}
