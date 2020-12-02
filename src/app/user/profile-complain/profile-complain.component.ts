import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { ToastyService } from 'ng2-toasty';
@Component({
  selector: 'profile-complain',
  templateUrl: './profile-complain.html'
})
export class ProfileComplainComponent implements OnInit {

  public content: String = "";
  constructor(public activeModal: NgbActiveModal, private userService: UserService, private toasty: ToastyService) { }

  ngOnInit() {
  }
  submit() {
    if (this.content === '') {
      return this.toasty.error('Please leave some text in the complain box');
    }

    this.userService.complain({ content: this.content }).then((res) => {
      this.toasty.success('Complain has been sent!');
    }).catch((err) => {
      this.toasty.error('Something went wrong, please check and try again!');
    })
    this.activeModal.close();
  }
}
