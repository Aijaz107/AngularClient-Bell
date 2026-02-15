import { Component, OnInit } from '@angular/core';

import { User } from '../model/user.model';

import { UserService } from '../services/user.service';

import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
    users: User[] = [];

    constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {

    this.getUsers();

  }

  getUsers() {

    this.userService.getUsers().subscribe((data: User[]) => {

      this.users = data;  // Store the fetched users

     // console.log(this.users)

    });

  }

   deleteUser(id: any) {

    this.userService.deleteUser(id).subscribe(() => {

      this.getUsers();  // Refresh the user list after deletion

    });

  }

  editUser(id: any ) {

    this.router.navigate([`/users/edit/${id}`]);  // Navigate to the update component

  }

}
