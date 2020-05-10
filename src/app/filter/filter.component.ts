import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent{ 
public categorys:any;
public categoryFilter=0;
public appel;
public selectedUser;
public searchInput: any;

  constructor(
  public apiService: APIService
) { 
  apiService.Categorys.subscribe((categorys)=>{
    this.categorys=categorys;
  });
  apiService.getCategorys();

  
};
filterCategory(categoryName){
  this.categoryFilter=categoryName;
  this.apiService.categoryFilter=categoryName;
  this.searchInput=this.apiService.searchInput;
  this.selectedUser = this.apiService.selectedUser;
  if(this.categoryFilter==0||this.categoryFilter===undefined){
    this.apiService.filterdNotessSubject.next('');
  }
  this.apiService.getfilterCategory(this.categoryFilter);
}

}
