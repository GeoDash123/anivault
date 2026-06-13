import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page';
//import { describe, it, beforeEach, expect } from '@jest/globals';

describe('LoginPageComponent', () => {

  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [LoginPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login with valid credentials', () => {

    component.email = 'admin@anivault.com';
    component.password = 'admin123';

    component.login();

    expect(component.successMessage)
      .toContain('Inicio de sesión exitoso');
  });

  it('should fail with invalid credentials', () => {

    component.email = 'test@test.com';
    component.password = '123456';

    component.login();

    expect(component.errorMessage)
      .toContain('incorrectos');
  });

});