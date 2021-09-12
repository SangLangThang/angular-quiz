import { FormControl } from '@angular/forms';
import { FirebaseService } from './../../shared/firebase.service';
import { Component, Input, OnInit } from '@angular/core';
import { Levels, Topics, Questions } from 'src/app/models/User.model';
import { take } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-questions',
  templateUrl: './manager-questions.component.html',
  styleUrls: ['./manager-questions.component.scss'],
})
export class ManagerQuestionsComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}
  levels: Levels[];
  topics: Topics[];
  questions: Questions[];
  showQuestion:boolean=true;
  showFormQuestion:boolean=false;
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
  }
  deleteQuestion(questionId:string){
    console.log(questionId)
  }
  addQuestion(topicId:string){
    
  }
}
