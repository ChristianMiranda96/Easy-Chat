// chat.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:4200');
  }

  sendMessage(userId: string, content: string) {
    this.socket.emit('message', { userId, content });
  }

  getMessages(): Observable<{ userId: string; content: string }> {
    return new Observable((observer) => {
      this.socket.on('messages', (message) => {
        observer.next(message);
      });
    });
  }
}
