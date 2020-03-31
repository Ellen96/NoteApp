import { Component, OnInit,Input } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  public notes: any;
  public notesSize: number = 0;
  public selectedUser: any; 
  public newNoteContent = "";

  constructor(
    public apiService: APIService
  ) { 
    apiService.Notes.subscribe((notes) => {
      this.notes = notes;
      this.notesSize = this.notes.length;
      this.selectedUser = this.apiService.selectedUser;
    });
  }

  saveNewNote() {
    this.apiService.addNote(this.newNoteContent).subscribe(data => {this.apiService.getNotes(this.selectedUser);}, error => {console.error(error);});
    this.newNoteContent = "";
  }   
  deleteNote(){
    let noteId =prompt("Wat is de id van deze note?")
    this.deleteNoteId(noteId);
  }
  deleteNoteId(noteId){
    this.apiService.deleteNote(noteId).subscribe(data => {this.apiService.getNotes(this.selectedUser);},error=> {console.error(error);});
  }
}
