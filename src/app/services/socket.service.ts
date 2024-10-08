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

  getMessages(): Observable<{ userId: string; content: string; timestamp: string }> {
    return new Observable((observer) => {
      this.socket.on('message', (message) => {
        observer.next({
          userId: message.userId,
          content: message.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      });
    });
  }
}
