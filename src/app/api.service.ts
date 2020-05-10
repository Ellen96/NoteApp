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

  private _categorys: any = [];
  categorysSubject: Subject<any> = new Subject<any>();
  Categorys = this.categorysSubject.asObservable();
  
  private _filterdNotes:any = [];
  filterdNotessSubject :Subject<any>=new Subject<any>();
  FilterdNotes = this.filterdNotessSubject.asObservable();

  private _searchNotes:any = [];
  searchNotessSubject :Subject<any>=new Subject<any>();
  searchNotes = this.searchNotessSubject.asObservable();

  selectedUser:any;
  categoryFilter:any;
  selectedCategory:any;
  searchInput:any;
  

  constructor(
    private http: HttpClient
  ) {
    this.getUsers();
    this.categoryFilter=0;
    }


  getUsers() {
    return this.http.get(`https://les5.glitch.me/users`).subscribe(data => {
      this._users = data;
      this.usersSubject.next(this._users);
  })
  }

  getNotes(user) {
    this.selectedUser=user;
    return this.http.get(`https://les5.glitch.me/notes?name=${this.selectedUser}`).subscribe(data => {
      this._notes = data;
      this.notesSubject.next(this._notes);
    });
  }

  getCategorys(){
    return this.http.get(`https://les5.glitch.me/categorys`).subscribe(data => {
      this._categorys = data;
      this.categorysSubject.next(this._categorys);
  })     
  }

  getCategory(categoryId){
    return this.http.get(`https://les5.glitch.me/categoryName?name=${this.selectedUser}&id=${categoryId}`);
  }

  getfilterCategory(categoryName){
    this.categoryFilter=categoryName;
    return this.http.get(`https://les5.glitch.me/filter?name=${this.selectedUser}&category=${this.categoryFilter}`).subscribe(data => {
      this._filterdNotes = data;
      this.filterdNotessSubject.next(this._filterdNotes);
    });
  }

  getSearch(search){
    this.searchInput=search;
    return this.http.get(`https://les5.glitch.me/search?name=${this.selectedUser}&search=${this.searchInput}`).subscribe(data => {
      this._searchNotes = data;
      this.searchNotessSubject.next(this._searchNotes);
    });
  }

  addUser = (user) => {
    return this.http.post(`https://les5.glitch.me/users`,{name:user});
  }

  addNote = (content) => {    
    return this.http.post(`https://les5.glitch.me/notes`,{name:this.selectedUser,content:content});
  }

  addCategory = (category) => {
    this.categorysSubject.next(category);
    return this.http.post(`https://les5.glitch.me/addCategory`,{category:category})
  }

  addCategoryToNote=(category,noteId)=>{
    return this.http.post(`https://les5.glitch.me/addCategoryToNote`,{name:this.selectedUser,id:noteId,category:category});
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
  deleteCategoryNote(noteId){
    let encodeUri =encodeURI(`https://les5.glitch.me/removeCategoryFromNote?name=${this.selectedUser}&id=${noteId}`);
    return this.http.delete(encodeUri);
  }
  deleteCategory(categoryName){
    let encodeUri=encodeURI(`https://les5.glitch.me/removeCategory?name=${categoryName}`);
    return this.http.delete(encodeUri);
  }
  
}