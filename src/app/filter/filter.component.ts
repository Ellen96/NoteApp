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

  constructor(
  public apiService: APIService
) { 
  apiService.Categorys.subscribe((categorys)=>{
    this.categorys=categorys;
  });
  apiService.getCategorys();
  this.selectedUser = apiService.selectedUser;
  
};
filterCategory(categoryName){
  this.categoryFilter=categoryName;
  this.apiService.categoryFilter=categoryName;
  this.apiService.getfilterCategory(this.categoryFilter);
}

}
