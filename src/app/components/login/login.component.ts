import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  @Output() login = new EventEmitter<{ name: string; age: number }>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      const { name, age } = this.loginForm.value;
      console.log('Form submitted:', this.loginForm.value);
      this.login.emit({ name, age });
    }
  }
}