import { FirebaseService } from './../shared/firebase.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-start-box',
  templateUrl: './start-box.component.html',
  styleUrls: ['./start-box.component.scss'],
})
export class StartBoxComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}
  userForm!: FormGroup;
  ngOnInit(): void {
    this.userForm = this.fb.group({
      ten: ['', [Validators.required]],
      truong: ['', [Validators.required]],
      lop: ['', [Validators.required]],
      de: [null, [Validators.required]],
      cap: [null, [Validators.required]],
    });
  }

  cap_data = [
    { value: 'cap1', viewValue: 'Cấp 1' },
    { value: 'cap2', viewValue: 'Cấp 2' },
    { value: 'cap3', viewValue: 'Cấp 3' },
  ];
  de_data = [
    { value: 'de1', viewValue: 'Đề 1' },
    { value: 'de2', viewValue: 'Đề 2' },
    { value: 'de3', viewValue: 'Đề 3' },
  ];
  onSubmit() {
    /* this.firebaseService.getUsers().subscribe(e=>{
      console.log(e)
    }) */
    this.router.navigate(['start']);
  }
}
