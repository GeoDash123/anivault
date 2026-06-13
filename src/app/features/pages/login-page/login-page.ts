import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'tslib';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPageComponent {

  email = '';
  password = '';

  showPassword = false;

  errorMessage = '';
  successMessage = '';

  private readonly demoUser = {
    email: 'admin@anivault.com',
    password: 'admin123'
  };

  login(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (
      this.email === this.demoUser.email &&
      this.password === this.demoUser.password
    ) {

      this.successMessage = 'Inicio de sesión exitoso';

      console.log('Usuario autenticado');

    } else {

      this.errorMessage =
        'Correo o contraseña incorrectos';
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}