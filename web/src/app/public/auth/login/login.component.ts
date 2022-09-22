import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'angularMaterialLogin';
  loginForm!: FormGroup;
  hide!: boolean;
  loading!: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  //method for error in login
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  // function call on submit login form
  public submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        this._snackBar.open('Inicio de sesión correcto', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/private']);
      },
      error: (error) => {
        console.clear();
        this.loading = false;
        this._snackBar.open('Credenciales incorrectas', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  public register() {
    console.log('Navigate to Registration Form');
  }
}
