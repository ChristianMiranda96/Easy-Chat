import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    ChatComponent,
    LoginComponent,
  ],
})
export class AppComponent implements OnInit {
  user: { name: string; age: number } | null = null;
  isLoggedIn = false;

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  handleLogin(user: { name: string; age: number }) {
    this.user = user;
    this.isLoggedIn = true;
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.user = null;
  }
}