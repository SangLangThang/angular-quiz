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
  topicId:string;
  levelId:string;
  topicsData: Topics[];
  questions: Questions[];
  canAddTopics:boolean=false;
  showQuestion: boolean = true;
  showFormQuestion: boolean = false;
  selectValue: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firebaseService
      .getLevels()
      .pipe(take(1))
      .subscribe((levels: any) => {
        console.log("get levels ok")
        this.levels = levels;
      });
    this.firebaseService
      .getTopics()
      .pipe(take(1))
      .subscribe((topics: any) => {
        console.log("get topics ok")
        this.topicsData = topics;
      });
  }

  selectedTopics(levelId: string, topics: Topics[]): Topics[] {
    return topics.filter((topic) => topic.levelId === levelId);
  }
  onChange(levelId: string) {
    this.topics = this.selectedTopics(levelId, this.topicsData);
    this.canAddTopics=true;
    this.levelId=levelId
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.topicId=tabChangeEvent.tab.ariaLabel
    
    this.firebaseService
      .getQuestions(this.topicId)
      .pipe(take(1))
      .subscribe((questions: any) => {
        console.log("get questions ok")
        this.questions = questions;
      });
  }
  goForm() {
    this.router.navigate(['/admin/edit']);
  }

  editQuestion(questionId: string) {
    console.log(questionId);
    this.router.navigate(['/admin/edit']);
  }

  deleteQuestion(questionId: string) {
    console.log(questionId);
  }

  // addQuestion(topicId:string){
  //   this.router.navigate(['/admin/edit']);
  // }
}
