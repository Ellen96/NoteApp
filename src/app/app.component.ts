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

  constructor(apiService:APIService)  {}
}
