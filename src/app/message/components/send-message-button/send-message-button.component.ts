import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService } from 'ng2-toasty';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../../shared/services';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'send-message-btn',
  template: '<button class="btn-add-cart" translate (click)="sendMessage()">Send message</button>'
})
export class SendMessageButtonComponent {
  @Input() recipientId: string;
  constructor(private toasty: ToastyService, private modalService: NgbModal,
    private authService: AuthService,
    private conversationService: ConversationService) {
  }

  sendMessage() {
    if (!this.authService.isLoggedin()) {
      return this.toasty.error('Please login to send message');
    }

    this.conversationService.create(this.recipientId)
      .then((resp) => {
        console.log(resp);
        const modalRef = this.modalService.open(MessageMessageModalComponent, {
          backdrop: 'static',
          keyboard: false
        });
        modalRef.componentInstance.conversation = resp.data;
        modalRef.result.then(result => {
          this.toasty.success('Your message has been sent');
        }, () => { });
      });

  }
}

@Component({
  templateUrl: './send-message-modal.html'
})
export class MessageMessageModalComponent implements OnInit {
  @Input() conversation: any;
  public message: any = {
    text: ''
  };
  public submitted: boolean = false;

  constructor(private service: MessageService, public activeModal: NgbActiveModal) {
  }

  ngOnInit() { }

  submit(frm: any) {
    this.submitted = true;
    if (frm.invalid) {
      return;
    }

    this.service.send({
      conversationId: this.conversation._id,
      type: 'text',
      text: this.message.text
    })
      .then(() => this.activeModal.close());
  }
}