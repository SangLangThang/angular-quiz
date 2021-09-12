import { Component, OnInit } from '@angular/core';
import {
  FormArray, FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionAnswers, QuestionsDto } from 'src/app/models/User.model';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { DialogService } from '../../../shared/dialog.service';
@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss'],
})
export class FormQuestionComponent implements OnInit {
  form: FormGroup;
  id: string;
  isSubmitted: boolean = false;
  selected: QuestionsDto;

  get answers() {
    return this.form.get('answers') as FormArray;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private firebaseService: FirebaseService
  ) {
    this.activatedRoute.params
      .subscribe((val: any) => {
        this.id = val.id
      });
  }

  ngOnInit(): void {
    if (!this.id || this.id === 'new') {
      this.buildForm();
    } else {
      this.getItem(this.id);
    }
  }

  getItem(id: string) {
    this.firebaseService.getQuestion(id)
      .subscribe((response: any) => {
        this.selected = response;
        this.buildForm();
      });
  }

  buildForm() {
    const {
      name,
      answers,
    } = this.selected || {};
    this.form = this.fb.group({
      name: [name ?? null, Validators.required],
      answers: this.fb.array(answers?.length > 0 ? answers.map(item => this.createFormGroup(item)) : [this.createFormGroup({
        name: '',
        status: false
      })])
    });
  }

  createFormGroup(questionAnswers: QuestionAnswers) {
    return this.fb.group({
      name: [questionAnswers.name ?? null, []],
      status: [questionAnswers.status ?? null, []]
    });
  }

  addAnswer() {
    this.answers.push(this.fb.control('', Validators.required));
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  onSubmit(value: any) {
    console.log('submit: ', value);
    this.isSubmitted = true;
    if (this.form.invalid) return;
    if (this.id) {
      // Chỉnh sửa submit
      this.dialogService.openDialog('Lưu câu hỏi thành công');
    }
    // Thêm mới submit
    this.dialogService.openDialog('Lưu câu hỏi thành công');
  }
}
