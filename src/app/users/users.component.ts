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
  public searchInput:any;
  constructor(
    public apiService: APIService,
  ) { 
    apiService.Users.subscribe((users) => {
      this.users = users;
    });
  }

  getNotes(userId = 0) {
    this.selectedUser = userId;
    this.filterdCategory=this.apiService.categoryFilter;
    this.searchInput=this.apiService.searchInput;
    if((this.filterdCategory==0||this.filterdCategory===undefined)&&(this.searchInput==0||this.searchInput===undefined)){
      this.apiService.getNotes(this.selectedUser);
    }
    else{
      if((this.filterdCategory!=0&&this.filterdCategory!=undefined)&&(this.searchInput==0||this.searchInput===undefined)){
        this.apiService.getfilterCategory(this.filterdCategory);
      }
      else{
        if((this.filterdCategory==0||this.filterdCategory===undefined)&&(this.searchInput!=0&&this.searchInput!=undefined)){
          this.apiService.getSearch(this.searchInput);
        }
        else{     
        }
      } 
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
