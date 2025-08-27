import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }
}
