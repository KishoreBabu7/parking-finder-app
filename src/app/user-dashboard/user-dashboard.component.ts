// src/app/user-dashboard/user-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  users: User[] = [];
  userForm!: FormGroup;
  isEditMode = false;
  currentUserId: number | null = null;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
    });
  }

  // Fetch all users
  getAllUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  // Add a new user
  addUser(): void {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe((data: User) => {
        this.users.push(data);
        this.userForm.reset();
      });
    }
  }

  // Update user information
  updateUser(): void {
    if (this.userForm.valid && this.currentUserId !== null) {
      this.userService.updateUser(this.currentUserId, this.userForm.value).subscribe(() => {
        this.getAllUsers();
        this.userForm.reset();
        this.isEditMode = false;
        this.currentUserId = null;
      });
    }
  }

  // Edit user (populate the form for updating)
  editUser(user: User): void {
    this.userForm.patchValue(user);
    this.isEditMode = true;
    this.currentUserId = user.id;
  }

  // Delete user
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }

  // Submit form to add/update user
  onSubmit(): void {
    if (this.isEditMode) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  // Reset the form
  resetForm(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.currentUserId = null;
  }
}
