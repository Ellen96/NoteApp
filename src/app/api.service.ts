import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http:HttpClient){};
  getUsers=()=>{return this.http.get('https://les5.glitch.me//users');}
  addUsers=(name)=>{return this.http.post('https://les5.glitch.me//users',{name:name},);}
}
