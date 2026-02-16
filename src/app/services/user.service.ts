import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user.model';

/**
 * UserService
 *
 * Centralized HTTP client for interacting with the backend user API.
 * The service exposes CRUD helpers and normalizes error handling so
 * components can display user-friendly messages.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /** Base URL for API calls. Update this for different environments. */
  private apiUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  /** Retrieve the full user list from the API. */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'users').pipe(
      catchError(this.handleError)
    );
  }

  /** Create a new user. The payload is FormData to support file uploads. */
  createUser(user: FormData): Observable<any> {
    return this.http.post(this.apiUrl + 'users', user).pipe(
      catchError(this.handleError)
    );
  }

  /** Fetch a single user by id. */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /** Update an existing user by id using FormData. */
  updateUser(id: number, user: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}users/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  /** Delete a user by id. */
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Centralized error handler for all HTTP responses.
   * Maps HTTP errors to friendly messages and returns a throwError
   * so subscribers can use the message in the UI.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred. Please try again.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side / network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side response mapping
      if (error.status === 0) {
        errorMessage = 'Unable to connect to the server. Please check your connection.';
      } else if (error.status === 400) {
        errorMessage = `Bad Request: ${error.error?.message || 'Invalid input data'}`;
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized. Please log in again.';
      } else if (error.status === 404) {
        errorMessage = 'Resource not found.';
      } else if (error.status === 409) {
        errorMessage = `Conflict: ${error.error?.message || 'This record may already exist'}`;
      } else if (error.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else {
        errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
