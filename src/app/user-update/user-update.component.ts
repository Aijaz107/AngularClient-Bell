import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';

import { UserService } from '../services/user.service';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css',
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  providers:[UserService]

})
export class UserUpdateComponent implements OnInit {
 
 userForm: FormGroup;

  userId!: number;

  constructor(

    private fb: FormBuilder,

    private userService: UserService,

    private route: ActivatedRoute,

    private router: Router

  ) {

    this.userForm = this.fb.group({

      first_name: ['', Validators.required],

      last_name: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      password: ['', Validators.required],

      image: [null]


    });

  }

    ngOnInit(): void {

    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.userId) {

      this.userService.getUserById(this.userId).subscribe(user => {

        this.userForm.patchValue({

          first_name: user.first_name,

          last_name: user.last_name,

          email: user.email,

          password: user.password

        });

      });

    }

  }

  onFileSelected(event: any): void {

    const file = event.target.files[0];

    if (file) {

      this.userForm.patchValue({ image: file });

      this.userForm.get('image')!.updateValueAndValidity();

    }

  }

  updateUser(): void {

    if (this.userForm.invalid) return;

    const formData = new FormData();

    formData.append('first_name', this.userForm.get('first_name')!.value);

    formData.append('last_name', this.userForm.get('last_name')!.value);

    formData.append('email', this.userForm.get('email')!.value);

    formData.append('password', this.userForm.get('password')!.value);

    const imageFile = this.userForm.get('image')!.value;

    if (imageFile) {

      formData.append('image', imageFile, imageFile.name);

    }

    this.userService.updateUser(this.userId, formData).subscribe(() => {

      this.router.navigate(['/users']);

    });

  }

}