import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService } from 'ng2-toasty';

@Component({
  templateUrl: 'publish-modal.component.html'
})
export class PublishModalComponent {
  
  message: any = {
    text: ''
  };

  submitted: boolean = false;
    constructor(public activeModal: NgbActiveModal) {}

  submit(frm: NgForm) {
    this.submitted = true;
    if(!frm.valid) {
      return 
    }

    this.activeModal.close(frm.value.text)
  }
}
