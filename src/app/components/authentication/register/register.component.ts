import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpRequestService } from '../service/http-request.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: ''
  };

  constructor(private httpRequestService: HttpRequestService) {}

  registerUser(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.httpRequestService.register(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
      },
      error => {
        console.error('Error during registration', error);
      }
    );
  }
}
