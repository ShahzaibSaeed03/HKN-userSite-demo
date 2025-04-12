import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private selectedArticle: any;

  setSelectedArticle(article: any) {
    this.selectedArticle = article;
  }
  

  getSelectedArticle() {
    return this.selectedArticle;
  }


  
  private apiurls ='https://new.hardknocknews.tv/api/post'


  private apiurl ='https://new.hardknocknews.tv/api/posts/all'
  constructor(private http:HttpClient) { }

  getArticle():Observable<any>{
return this.http.get(`${this.apiurl}`)
  }

 getsinglepost(type: string, slug: string): Observable<any> {
 
  const url = `${this.apiurls}/${type}/${slug}`;
  console.log('GET Request URLs:', url); 

  return this.http.get(`${this.apiurls}/${type}/${slug}`);
}

}
