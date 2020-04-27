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
  public selectedUser: any;
  public category:Text; 
  public newNoteContent = "";

  constructor(
    public apiService: APIService
  ) { 
    apiService.Notes.subscribe((notes) => {
      this.notes = notes;
      this.notesSize = this.notes.length;
      this.selectedUser = this.apiService.selectedUser;
      this.apiService.Categorys.subscribe((category)=>{
        this.category=category;
      });
    });
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
  addCategory(category,noteId){
    this.apiService.addCategory(category,noteId).subscribe(data =>{this.apiService.getNotes(this.selectedUser);},error =>{console.error(error);});
  }
  changeContent(content,noteId){
    this.apiService.changeContent(content,noteId).subscribe(data =>{this.apiService.getNotes(this.selectedUser);},error =>{console.error(error);});
  }
}
