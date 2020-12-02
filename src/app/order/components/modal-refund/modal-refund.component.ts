import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService } from 'ng2-toasty';
import { OrderService } from '../../services/order.service';



@Component({
  selector: 'app-ng-modal',
  templateUrl: './modal-refund.html'
})

export class ModalRefundComponent {

  @Input() orderData: any;
  public amount: any = "";
  public refund: any = '';

  constructor(
    private activeModal: NgbActiveModal,
    private toasty: ToastyService,
    private orderService: OrderService
  ) { }

  submit() {

    if (this.amount === '') {
      return this.toasty.error('Amount cannot be blank.');
    }
    if (isNaN(this.amount)) {
      return this.toasty.error('Please enter only numbers.');
    }
    if (this.amount > this.orderData.depositAmount) {
      return this.toasty.error('Return amount must be less than deposit amount.');
    }

    this.refund = { amount: this.amount };

    this.orderService.makerefund(this.refund, this.orderData).then(resp => {
      this.toasty.success('Deposit Refunded successfully.')
      window.location.reload();
    }).catch((err) =>
      this.toasty.error('Something went wrong, please try again!')
    );
  }
}