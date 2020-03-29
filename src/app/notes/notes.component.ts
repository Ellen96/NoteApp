import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  public notes:any;
  public notesSize: number=0;
  public selectedUser: number=0;
  public contentNewNote = "";

  constructor(
    public apiService:APIService
  ) { 
    apiService.Notes.subscribe((notes)=>{
      this.notes=notes;
      this.notesSize=this.notes.length;
      this.selectedUser=this.apiService.selectedUserId;
    });
  }

  addNewNote() {
    this.apiService.addNote(this.contentNewNote).subscribe(data =>{this.apiService.getNotes(this.selectedUser);},
    error =>{console.error(error);});
    this.contentNewNote="";
  }
  
}
