import { DialogService } from '../../../shared/dialog.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss'],
})
export class FormQuestionComponent implements OnInit {
  constructor(private fb: FormBuilder, private dialogService: DialogService) {}
  questionForm: FormGroup;
  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      answer:[1],
      answers: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }
  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  addAnswer() {
    this.answers.push(this.fb.control('', Validators.required));
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }
  onSubmit(value: any) {
    console.log(value);
    this.dialogService.openDialog('Lưu câu hỏi thành công');
  }
  onRadioCheck(e: number) {
    this.questionForm.patchValue({answer:e})
  }
}
