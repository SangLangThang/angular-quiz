import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Levels, Questions, Topics } from '../models/User.model';
import { FirebaseService } from './../shared/firebase.service';

@Component({
  selector: 'app-start-box',
  templateUrl: './start-box.component.html',
  styleUrls: ['./start-box.component.scss'],
})
export class StartBoxComponent implements OnInit {
  clientForm: FormGroup;
  levels: Levels[] = [];
  topics: Topics[] = [];
  questions: Questions[] = [];
  levelDefault = '';
  selected: IClientForm;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLevels();
  }

  getLevels() {
    this.firebaseService.getLevels()
      .subscribe((levels: any[]) => {
        this.levels = levels;
        this.getTopics(levels);
      });
  }

  getTopics(levels: any[]) {
    this.firebaseService.getTopics()
      .subscribe((topics: any[]) => {
        this.topics = topics;
        this.initSelected(topics[0].topicId, levels[0].levelId);
        this.buildForm();
      });
  }

  initSelected(topicId: string, levelId: string) {
    this.selected = {
      name: '',
      school: '',
      clas: '',
      topicId: topicId,
      levelId: levelId,
    }
  }

  buildForm() {
    const {
      name,
      school,
      clas,
      topicId,
      levelId
    } = this.selected || {};
    this.clientForm = this.fb.group({
      name: [name ?? null, [Validators.required]],
      school: [school ?? null, [Validators.required]],
      class: [clas ?? null, [Validators.required]],
      topicId: [topicId ?? null, [Validators.required]],
      levelId: [levelId ?? null, [Validators.required]],
    });
  }

  onSubmit() {
    this.firebaseService.addClient({ score: 0, ...this.clientForm.value })
      .then((value) => {
        this.router.navigate([
          'start',
          value.id,
          this.clientForm.value.levelId,
          this.clientForm.value.topicId,
        ]);
      });
  }
}

interface IClientForm {
  name: string;
  school: string;
  clas: string;
  topicId: string;
  levelId: string;
}
