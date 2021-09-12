import { FirebaseService } from './../shared/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Levels, Topics } from '../models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-box',
  templateUrl: './admin-box.component.html',
  styleUrls: ['./admin-box.component.scss']
})
export class AdminBoxComponent implements OnInit {

  constructor(private firebaseService:FirebaseService,private router:Router) { }
  levels:Levels[]=[]
  ngOnInit(): void {
    this.firebaseService.getLevels().subscribe((levels:any)=>{
      this.levels=levels
    })
    
  }
  
}
