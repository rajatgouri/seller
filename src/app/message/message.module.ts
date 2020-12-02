import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversationsComponent } from './components/conversations/conversations.component'
import { MessagesComponent } from './components/messages/messages.component';
import { SendMessageButtonComponent, MessageMessageModalComponent } from './components/send-message-button/send-message-button.component';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';
import { PusherService } from './services/pusher.service';
import { AuthService } from '../shared/services/auth.service';
import { ConverstionsResolver } from './resolvers/conversations.resolver';
import { CurrentUserResolver } from '../shared/resolver/current-user.resolver';
import { UtilsModule } from '../utils/utils.module';

const routes: Routes = [{
  path: 'conversations',
  component: ConversationsComponent,
  resolve: {
    conversations: ConverstionsResolver,
    currentUser: CurrentUserResolver
  },
  data: {
    title: 'Messages',
    urls: [{ title: 'Messages', url: '/messages/conversations' }]
  }
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    UtilsModule
  ],
  declarations: [
    ConversationsComponent,
    MessagesComponent,
    SendMessageButtonComponent,
    MessageMessageModalComponent
  ],
  providers: [
    ConversationService,
    MessageService,
    PusherService,
    AuthService,
    ConverstionsResolver,
    CurrentUserResolver
  ],
  exports: [
    ConversationsComponent,
    MessagesComponent,
    SendMessageButtonComponent
  ],
  entryComponents: [
    MessageMessageModalComponent
  ]
})
export class MessageModule { }
