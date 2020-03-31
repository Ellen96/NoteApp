import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { encode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private _users:any = [];
  usersSubject: Subject<any> = new Subject<any>();
  Users = this.usersSubject.asObservable();

  private _notes:any = [];
  notesSubject: Subject<any> = new Subject<any>();
  Notes = this.notesSubject.asObservable();

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
    let encodeUri = encodeURI(`https://les5.glitch.me/add?name=`+user);
    return this.http.get(encodeUri);
  }

  addNote = (content) => {
    let encodeUri = encodeURI(`https://les5.glitch.me/addnote?name=${this.selectedUser}&content=${content}`)
    return this.http.get(encodeUri);
  }

  deleteUser() {    
    let encodeUri = encodeURI(`https://les5.glitch.me/remove?name=${this.selectedUser}`);
    return this.http.get(encodeUri);    
  }

  deleteNote(noteId){
    let encodeUri = encodeURI(`https://les5.glitch.me/removeNote?name=${this.selectedUser}&id=${noteId}`);
    return this.http.get(encodeUri);
  }
}