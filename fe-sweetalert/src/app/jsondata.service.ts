import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsondataService {

  constructor(private http:HttpClient) { }
  url = "https://jsonplaceholder.typicode.com/users/";
 
  getDataApi(): Observable<any>{
    
    return this.http.get<any>(this.url);
 }
 deletePost(id : number): Observable<number>{
  console.log('deleted',id);
  //  this.http.delete<any>(this.url + id).splice(id,1);
   return this.http.delete<any>(this.url + id);
   
}
}
