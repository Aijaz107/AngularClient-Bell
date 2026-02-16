import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  deletingId: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.users = [];

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: User[]) => {
          this.users = data;
          this.isLoading = false;
          if (data.length === 0) {
            console.log('No users found');
          }
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to load users. Please try again.';
          this.isLoading = false;
          console.error('Load users error:', error);
        }
      });
  }

  deleteUser(id: number, firstName: string): void {
    if (!confirm(`Are you sure you want to delete ${firstName}?`)) {
      return;
    }

    this.deletingId = id;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.deleteUser(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.successMessage = `${firstName} has been deleted successfully!`;
          this.deletingId = null;
          this.getUsers();
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to delete user. Please try again.';
          this.deletingId = null;
          console.error('Delete error:', error);
        }
      });
  }

  editUser(id: number): void {
    this.router.navigate([`/users/edit/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
