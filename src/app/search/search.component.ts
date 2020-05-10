import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  public appel:any;
  public inputSearch:any;
  categoryFilter: any;
  selectedUser: any;

  constructor(
    public apiService: APIService,
  ) { 
    this.appel =this.apiService.searchInput;
  }

  search(){
    this.apiService.searchInput=this.inputSearch;
    this.categoryFilter=this.apiService.categoryFilter;
    this.selectedUser=this.apiService.selectedUser;
    if(this.inputSearch==0||this.inputSearch===undefined)
    { this.apiService.searchNotessSubject.next('')}
    this.apiService.getSearch(this.inputSearch);

  }
}
