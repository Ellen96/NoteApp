import { Component } from '@angular/core';
import { APIService } from './api.service';

interface User{
  name: String;
  id: Number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotesApp';
  usersList:User[]=[];
  name : String;
  apiServiceT:APIService;

  constructor(apiService:APIService)  {
    apiService.getUsers().subscribe((data:User[])=>{
    console.log(data);
    this.usersList=data
  })
  }
  addUser()
  {
    this.apiServiceT.addUsers(this.name).subscribe();
  }
}
