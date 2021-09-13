import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss'],
})
export class InfoBoxComponent implements OnInit {
  constructor() {}
  @Output() continues = new EventEmitter();
  ngOnInit(): void {}
  onContinues() {
    console.log('Continues');
    this.continues.emit();
  }
}