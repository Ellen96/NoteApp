import { Component, OnInit,Input } from '@angular/core';
import { APIService } from '../api.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

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
  public selectedUser: any;
  public categoryFilter=0;
  public categorys:any;
  public categoryIdNote:any;
  public selectedCategory=0; 
  public newNoteContent = "";

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
    this.categoryFilter=apiService.categoryFilter;
    apiService.FilterdNotes.subscribe((filterdNotes)=>{
      this.filterdNotes = filterdNotes;
      this.filterdNotesSize = this.filterdNotes.length;
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
    this.apiService.addCategory(category).subscribe(data =>{this.apiService.getCategorys();},error =>{console.error(error);});
    this.apiService.addCategoryToNote(category,noteId).subscribe(data =>{this.apiService.getCategorys();},error =>{console.error(error);});
  }
  addCategoryNote(category,noteId){
    this.selectedCategory=category;
    this.apiService.addCategoryToNote(category,noteId).subscribe(data =>{this.apiService.getCategorys();},error =>{console.error(error);});
  }
  selectCategory(CategoryId){
    return this.apiService.getCategory(CategoryId);
  }
  removeCategoryNote(noteId){
    this.apiService.deleteCategoryNote(noteId).subscribe(data =>{this.apiService.getCategorys();},error =>{console.error(error);});
  }
  removeCategory(categoryName){
    this.apiService.deleteCategory(categoryName).subscribe(data =>{this.apiService.getCategorys();},error =>{console.error(error);});
  }
  
}
