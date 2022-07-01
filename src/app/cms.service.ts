import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Post } from './post'
import { User, ToDo } from './user'
import { Album, Photo } from './album'

@Injectable({
  providedIn: 'root'
})
export class CMSService {

  private ROOT_URL = "https://jsonplaceholder.typicode.com";
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
  };
  
  constructor(
    private http: HttpClient
  ) { }

  /* Services for Post components */

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.ROOT_URL + '/posts')
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.ROOT_URL}/posts/${id}`;
    return this.http.get<Post>(url);
  }

  updatePost(post: Post): Observable<any> {
    return this.http.patch(`${this.ROOT_URL}/posts/${post.id}`, post, this.httpOptions);
  }

  deletePost(post: Post): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/posts/${post.id}`);
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(`${this.ROOT_URL}/posts/${post.id}`, post, this.httpOptions);
  }

  getCommentsForPostID(id: number): Observable<Comment[]> {
    const url = `${this.ROOT_URL}/posts/${id}/comments`;
    return this.http.get<Comment[]>(url);
  }

  /* Services for User components */

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.ROOT_URL + '/users');
  }

  getUser(id: number): Observable<User> {
    const url = `${this.ROOT_URL}/users/${id}`;
    return this.http.get<User>(url);
  }

  getToDosForUserID(id: number): Observable<ToDo[]> {
    const url = `${this.ROOT_URL}/users/${id}/todos`;
    return this.http.get<ToDo[]>(url);
  }

  /* Services for Album components */
  
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.ROOT_URL + '/albums');
  }

  getAlbum(id: number): Observable<Album> {
    const url = `${this.ROOT_URL}/albums/${id}`;
    return this.http.get<Album>(url);
  }

  getAlbumsForUserID(id: number): Observable<Album[]> {
    const url = `${this.ROOT_URL}/users/${id}/albums`;
    return this.http.get<Album[]>(url);
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.ROOT_URL + '/photos');
  }
  
  getPhotosForAlbumID(id: number): Observable<Photo[]> {
    const url = `${this.ROOT_URL}/albums/${id}/photos`;
    return this.http.get<Photo[]>(url);
  }

  /* Misc services */
  
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
