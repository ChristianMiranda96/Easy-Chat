import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ChatService } from '../../services/chat.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  standalone: true,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule, MatIconModule],
})
export class ChatComponent {
  @Input() userId: string = '';
  message: string = '';
  messages: { content: string; userId: string; timestamp: string }[] = [];
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  constructor(private chatService: ChatService) {
    this.chatService.getMessages().subscribe((msg) => {
      this.messages.push({
        content: msg.content,
        userId: msg.userId,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  sendMessage() {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.userId, this.message);
      this.message = '';
      this.scrollToBottom();
    }
  }
}