import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stat-card',
  templateUrl: './stat-card.html'
})
export class StatCardComponent implements OnInit {
  @Input() stat: any;
  @Input() type: any;

  constructor() {
  }

  ngOnInit() { }
}
