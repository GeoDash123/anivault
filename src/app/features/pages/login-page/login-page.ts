import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class Login {
  email = '';
  password = '';

  showPassword = false;

  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Ingresa tu correo y contraseña.';
      return;
    }

    const isValid = this.authService.login(this.email, this.password);

    if (isValid) {
      this.successMessage = 'Inicio de sesión exitoso';

      setTimeout(() => {
        this.router.navigate(['/explorar']);
      }, 700);

      return;
    }

    this.errorMessage = 'Correo o contraseña incorrectos.';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}