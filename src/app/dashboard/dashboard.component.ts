import { Component, OnInit } from '@angular/core';

import { CMSService } from '../cms.service';
import { Post } from '../post';
import { User } from '../user';
import { Album, Photo } from '../album';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  posts: Post[] = [];
  users: User[] = [];
  albums: Album[] = [];
  photos: Photo[] = [];
  
  constructor(
    private cmsService: CMSService,
  ) { }

  ngOnInit(): void {
    this.getPhotos();
    this.getPosts();
    this.getUsers();
  }

  getPosts() : void {
    this.cmsService.getPosts()
      .subscribe(posts => { 
        /* For variation we display a random slice of the Posts array */
        let randomNumber: number = this.cmsService.getRandomInt(0, posts.length - 10);
        this.posts = posts.slice(randomNumber, randomNumber + 10)
      });
  }
  
  getUsers() : void {
    this.cmsService.getUsers()
      .subscribe(users => {
        let randomNumber: number = this.cmsService.getRandomInt(0, users.length - 5);        
        this.users = users.slice(randomNumber, randomNumber + 5)
      });
  } 

  getAlbums() : void {
    this.cmsService.getAlbums()
      .subscribe(albums => {
        let randomNumber: number = this.cmsService.getRandomInt(0, albums.length - 10);
        this.albums = albums.slice(randomNumber, randomNumber + 10);
      });
  }
  
  getPhotos() : void {
    this.cmsService.getPhotos()
      .subscribe(photos => {
        this.photos = photos;
        /* We call this function here so the album preview doesnt get rendered before all photos are loaded */
        this.getAlbums();
      });
  }
}
