import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  selectedUser = 0;
  public users: any;

  constructor(
    public apiService: APIService
  ) { 
    apiService.Users.subscribe((users) => {
      this.users = users;
    });
  }

  getNotes(userId = 0) {
    this.selectedUser = userId;
    this.apiService.getNotes(this.selectedUser);
  }

  addUser() {
    let user = prompt("Geef de naam van de gebruiker in...");
    this.apiService.addUser(user).subscribe(data => {this.apiService.getUsers();}, error => {console.error(error);});
  }

  deleteUser() {
    this.apiService.deleteUser().subscribe(data => {this.apiService.getUsers();}, error => {console.error(error);});

    this.selectedUser = 0;
    this.getNotes();
  }
}
