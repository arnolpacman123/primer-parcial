import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Role } from '../interfaces/auth.interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  roles!: Role[];
  registerForm!: FormGroup;
  hide!: boolean;
  loading: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.getRoles().subscribe({
      next: (roles: any) => {
        this.roles = roles;
      },
    });
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      roleId: new FormControl('', [Validators.required]),
    });
  }

  //method for error in register
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  // function call on submit register form
  public submit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        this._snackBar.open('Registrado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/public']);
      },
      error: () => {
        this.loading = false;
        this._snackBar.open('El correo ya existe', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  public register() {
    console.log('Navigate to Registration Form');
  }
}
