import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpRequestService } from '../service/http-request.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private httpRequestService: HttpRequestService) {}

  loginUser(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.httpRequestService.login(this.user).subscribe(
      response => {
        console.log('Login successful', response);
        alert('Login successful!');
      },
      error => {
        console.error('Error during login', error);
        alert('Login failed!');
      }
    );
  }
}
