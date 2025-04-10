import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
// import {
//   trigger,
//   state,
//   style,
//   transition,
//   animate,
// } from '@angular/animations';
import { UserCreation } from '../../../core/models/UserCreation';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
enum Scene {
  EnterUserName,
  EnterPasswordNewAccount,
  EnterPasswordExistedAccount,
  EnterNameBirthdayGender,
}

@Component({
  selector: 'app-auth-modal',
  standalone: false,
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
})
export class AuthModalComponent {
  Scene = Scene;
  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  dob: string = '';
  gender: string = '';
  displayName: string = '';
  currentScene: Scene = Scene.EnterUserName;
  passwordMessage = '';
  usernameMessage = '';
  firstNameMessage = '';
  lastNameMessage = '';
  dobMessage = '';
  genderMessage = '';
  emailMessage = '';
  displayMessage = '';
  isOpen = true;
  isClosing = false;
  @Output() modalClosed = new EventEmitter<void>();
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}
  onCheckUsername() {
    if (this.username.length < 3) {
      this.usernameMessage = 'User is at least 3 characters';
      return;
    }
    this.authService.checkUsernameExisted(this.username).subscribe({
      next: (res) => {
        if (res.data['existed']) {
          this.currentScene = Scene.EnterPasswordExistedAccount;
        } else {
          this.currentScene = Scene.EnterPasswordNewAccount;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onBackToFirstScene() {
    this.currentScene = Scene.EnterUserName;
    this.passwordMessage = '';
    this.password = '';
  }
  onSignIn() {
    if (this.password.length < 8) {
      this.passwordMessage = 'Enter a valid password. (at least 8 characters)';
      return;
    }
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.data['token']);
          this.router.navigate(['/discover']);
          this.onCloseModal();
        },
        error: (err) => {
          this.passwordMessage = err.message;
        },
      });
  }
  onNextSceneEnterPasswordNewAccount() {
    if (this.password.length === 0) {
      this.passwordMessage = 'Enter a valid password.';
      return;
    }
    this.currentScene = Scene.EnterNameBirthdayGender;
  }

  onCloseModal() {
    this.isClosing = true; // Kích hoạt animation đóng
    setTimeout(() => {
      this.isOpen = false; // Ẩn modal sau animation
      this.isClosing = false; // Reset trạng thái
      this.modalClosed.emit(); // Gửi sự kiện sau khi modal đóng
    }, 300); // Delay = thời gian animation (300ms)
  }

  onSignUp() {
    let isValid = true;

    // Reset error messages
    this.genderMessage = '';
    this.dobMessage = '';
    this.firstNameMessage = '';
    this.lastNameMessage = '';
    this.emailMessage = '';

    // Validate gender
    if (!this.gender || this.gender.length === 0) {
      this.genderMessage = 'Please indicate your gender.';
      isValid = false;
    }

    // Validate date of birth
    if (!this.dob || this.dob.length === 0) {
      this.dobMessage = 'Enter your birthday';
      isValid = false;
    }

    // Validate first name
    if (!this.firstName || this.firstName.length === 0) {
      this.firstNameMessage = 'Enter your first name';
      isValid = false;
    }

    // Validate last name
    if (!this.lastName || this.lastName.length === 0) {
      this.lastNameMessage = 'Enter your last name';
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.email || this.email.length === 0) {
      this.emailMessage = 'Enter your email';
      isValid = false;
    } else if (!emailPattern.test(this.email)) {
      this.emailMessage = 'Enter a valid email address';
      isValid = false;
    }

    if (!this.displayName || this.displayName.length === 0) {
      this.displayMessage = 'Enter your display name';
      isValid = false;
    }

    if (!isValid) return;

    let user: UserCreation = {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      gender: this.gender,
      roles: ['USER'],
      email: this.email,
      displayName: this.displayName,
    };

    this.authService.register(user).subscribe({
      next: (value) => {
        this.toast.success('Register successfully', 'Success');
        this.router.navigate(['home']);
        this.onCloseModal();
      },
      error: (err) => {
        console.log(err);

        if (err['code'] === 1014) {
          this.emailMessage = 'Email existed';
        }
      },
    });
  }
  loginWithGoogle() {
    window.location.href =
      'http://localhost:8888/api/identity/oauth2/authorization/google';
  }
}
