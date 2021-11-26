import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class SaveDataService {
  
  constructor(private http:HttpClient) { }
  url='https://atsgroup-a5496-default-rtdb.firebaseio.com/regform.json';
  UserDetails(users:any[]){
    return this.http.put(this.url,users)
  }
  fetchUsers(users:any[]){
    return this.http.get(this.url)
  }
}