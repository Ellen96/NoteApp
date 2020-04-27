import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { encode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private important : any;
  private urgent : any;

  private _users:any = [];
  usersSubject: Subject<any> = new Subject<any>();
  Users = this.usersSubject.asObservable();

  private _notes:any = [];
  notesSubject: Subject<any> = new Subject<any>();
  Notes = this.notesSubject.asObservable();

  private _categorys: any = [
    this.important,
    this.urgent,
  ];
  categorysSubject: Subject<any> = new Subject<any>();
  Categorys = this.categorysSubject.asObservable();

  selectedUser:any;
  

  constructor(
    private http: HttpClient
  ) {
    this.getUsers();
  }

  getUsers() {
    return this.http.get(`https://les5.glitch.me/users`).subscribe(data => {
      this._users = data;
      this.usersSubject.next(this._users);
  })
  }

  getNotes(user) {
    this.selectedUser=user;
    let encodeUri=encodeURI(`https://les5.glitch.me/notes?name=${this.selectedUser}`);
    return this.http.get(encodeUri).subscribe(data => {
      this._notes = data;
      this.notesSubject.next(this._notes);
    });
  }

  
  addUser = (user) => {
    return this.http.post(`https://les5.glitch.me/users`,{name:user});
  }

  addNote = (content) => {    
    return this.http.post(`https://les5.glitch.me/notes`,{name:this.selectedUser,content:content});
  }

  addCategory=(category,noteId)=>{
    return this.http.post(`https://les5.glitch.me/addCategory`,{name:this.selectedUser,id:noteId,category:category});
  }

  changeContent(content,noteId){
    return this.http.post(`https://les5.glitch.me/changeContent`,{name:this.selectedUser,id:noteId,content:content});
  }  

  deleteUser() {    
    let encodeUri = encodeURI(`https://les5.glitch.me/users?name=${this.selectedUser}`);
    return this.http.delete(encodeUri);    
  }

  deleteNote(noteId){
    let encodeUri = encodeURI(`https://les5.glitch.me/notes?name=${this.selectedUser}&id=${noteId}`);
    return this.http.delete(encodeUri);
  }

  deleteAllNote(){
    let encodeUri = encodeURI(`https://les5.glitch.me/AllNotes?name=${this.selectedUser}`);
    return this.http.delete(encodeUri);
  }
}