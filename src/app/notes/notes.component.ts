import { Component, OnInit,Input } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { element } from 'protractor';
import { APIService } from '../api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  public notes: any;
  public notesSize: number = 0;
  public filterdNotes: any;
  public filterdNotesSize: number = 0;
  public searchNotes: any;
  public searchNotesSize: number = 0;
  public selectedUser: any;
  public categoryFilter:any;
  public searchInput:any;
  public categorys:any;
  public newNoteContent = "";
  public selectedCategory: any;

  constructor(
    public apiService: APIService
  ) {
     
    apiService.Notes.subscribe((notes) => {
      this.notes = notes;
      this.notesSize = this.notes.length;
      this.selectedUser = this.apiService.selectedUser;
    });
    apiService.Categorys.subscribe((categorys)=>{
      this.categorys=categorys;
    });
    apiService.FilterdNotes.subscribe((filterdNotes)=>{
      this.filterdNotes = filterdNotes;
      this.filterdNotesSize = this.filterdNotes.length;
      this.categoryFilter=this.apiService.categoryFilter;
    });
    apiService.searchNotes.subscribe((searchNotes)=>{
      this.searchNotes=searchNotes;
      this.searchNotesSize=this.searchNotes.length;
      this.searchInput=this.apiService.searchInput;
    })
    apiService.getCategorys();
  };
  
  saveNewNote() {
    this.apiService.addNote(this.newNoteContent).subscribe(data => {this.apiService.getNotes(this.selectedUser);}, error => {console.error(error);});
    this.newNoteContent = "";
  }
  deleteNote(notesId){
    this.apiService.deleteNote(notesId).subscribe(data => {this.apiService.getNotes(this.selectedUser);},error=> {console.error(error);});
  }
  deleteAllNotes(){
    this.apiService.deleteAllNote().subscribe(data =>{this.apiService.getNotes(this.selectedUser);},error =>{console.error(error);});
  }
  
  changeContent(content,noteId){
    this.apiService.changeContent(content,noteId).subscribe(data =>{this.apiService.getNotes(this.selectedUser);},error =>{console.error(error);});
  }
  addCategory(noteId){
    let category = prompt("Geef de naam van de categorie in...");
    this.selectedCategory=category;
    this.apiService.addCategory(category).subscribe(data =>{this.apiService.getCategorys();},error =>{console.error(error);});
    this.apiService.addCategoryToNote(this.selectedCategory,noteId).subscribe(data =>{this.apiService.getNotes(this.selectedUser);},error =>{console.error(error);});
  }
  addCategoryNote(category,noteId){
    this.selectedCategory=category;
    this.apiService.addCategoryToNote(this.selectedCategory,noteId).subscribe(data =>{this.apiService.getNotes(this.selectedUser);},error =>{console.error(error);});
  }

  removeCategoryNote(noteId){
    this.apiService.deleteCategoryNote(noteId).subscribe(data =>{this.apiService.getCategorys();this.apiService.getNotes(this.selectedUser);},error =>{console.error(error);});
  }
  removeCategory(categoryName){
    this.apiService.deleteCategory(categoryName).subscribe(data =>{this.apiService.getCategorys();this.apiService.getNotes(this.selectedUser);},error =>{console.error(error);});
  }
  
}
