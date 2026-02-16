import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-create',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnDestroy {
  userForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      image: [null]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validImageTypes.includes(file.type)) {
        this.errorMessage = 'Please select a valid image file (JPEG, PNG, GIF, or WebP)';
        this.clearAlertAfterDelay();
        return;
      }
      // Validate file size (e.g., max 5MB)
      const maxSizeInMB = 5;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        this.errorMessage = `Image size must not exceed ${maxSizeInMB}MB`;
        this.clearAlertAfterDelay();
        return;
      }
      this.userForm.patchValue({ image: file });
      this.userForm.get('image')!.updateValueAndValidity();
      this.errorMessage = '';
    }
  }

  createUser(): void {
    if (this.userForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly';
      this.clearAlertAfterDelay();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('first_name', this.userForm.get('first_name')!.value.trim());
    formData.append('last_name', this.userForm.get('last_name')!.value.trim());
    formData.append('email', this.userForm.get('email')!.value.trim());
    formData.append('password', this.userForm.get('password')!.value);

    const imageFile = this.userForm.get('image')!.value;
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }

    this.userService.createUser(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.successMessage = 'User created successfully!';
          this.isLoading = false;
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 1500);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to create user. Please try again.';
          this.isLoading = false;
          console.error('Creation error:', error);
        }
      });
  }

  private clearAlertAfterDelay(): void {
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
