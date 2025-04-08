import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeServiceService {

  baseUrl = "https://new.hardknocknews.tv/api/reactions";


  constructor(private http: HttpClient) { }

 
  getReaction(): Observable<any> {
    return this.http.get(`${this.baseUrl}`,);
  }
  addReaction(add:any):Observable<any>{
     return this.http.post(`${this.baseUrl}/add`,add)
  }
  
}
