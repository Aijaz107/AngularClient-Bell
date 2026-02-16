import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * UserListComponent
 *
 * Displays a table of users and provides edit/delete actions. This component
 * delegates HTTP interactions to `UserService` and focuses on UI state and
 * presentation concerns such as loading and success/error messages.
 */
@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy {
  /** Loaded users */
  users: User[] = [];

  /** UI state flags */
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  /** Currently deleting user id (used to disable the delete button) */
  deletingId: number | null = null;

  private destroy$ = new Subject<void>();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  /** Load users from the API and update the component state. */
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

  /**
   * Delete a user after confirmation. On success the list is refreshed and
   * a transient success message is shown.
   */
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

  /** Navigate to the edit page for the given user id. */
  editUser(id: number): void {
    this.router.navigate([`/users/edit/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
