import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.html'
})
export class ProfileCardComponent implements OnInit {
  @Input() user: any;

  // TODO - add option to query user from server by user id
  constructor(){ }

  ngOnInit() {
    // TODO - add event emitter listen the change
  }
}
