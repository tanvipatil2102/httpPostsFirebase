import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ipost } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  BASE_URL : string = `${environment.BASE_URL}`;
  POST_URL : string = `${environment.BASE_URL}/posts.json`;
  constructor(
    private _http : HttpClient
  ) { }

  createNewPost(post : Ipost): Observable<any>{
    return this._http.post(this.POST_URL, post)
  }

  fetchALlPosts(): Observable<any>{
    return this._http.get(this.POST_URL)
  }

  fetchSinglePost(id: string): Observable<any> {
    return this._http.get(`${this.BASE_URL}/posts/${id}.json`)
  }

  updatePost(post : Ipost): Observable<any>{
    return this._http.patch(`${this.BASE_URL}/posts/${post.id}.json`, post)
  }

  removePost(post: string){
    return this._http.delete(`${this.BASE_URL}/posts/${post}.json`)
  }
}
