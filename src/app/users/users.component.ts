import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { FilterComponent} from '../filter/filter.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  selectedUser=0;

  public users: any;
  public filterdCategory:any;
  constructor(
    public apiService: APIService,
  ) { 
    apiService.Users.subscribe((users) => {
      this.users = users;
    });
    this.filterdCategory=apiService.categoryFilter;
  }

  getNotes(userId = 0) {
    this.selectedUser = userId;
    if(this.filterdCategory==0){
      this.apiService.getNotes(this.selectedUser);
    }
    else{
      this.apiService.getfilterCategory(this.filterdCategory,this.selectedUser);
    }
  }

  addUser() {
    let user = prompt("Geef de naam van de gebruiker in...");
    this.apiService.addUser(user).subscribe(data => {this.apiService.getUsers();}, error => {console.error(error);});
  }

  deleteUser() {
    this.apiService.deleteUser().subscribe(data => {this.apiService.getUsers();}, error => {console.error(error);});
    this.selectedUser =0;
    this.getNotes();
  }
  
}
