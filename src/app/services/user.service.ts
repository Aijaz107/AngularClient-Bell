import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'users').pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: FormData): Observable<any> {
    return this.http.post(this.apiUrl + 'users', user).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}users/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred. Please try again.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
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
