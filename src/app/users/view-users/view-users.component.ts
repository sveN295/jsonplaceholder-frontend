import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User, Adress, Geo, Company, ToDo } from '../../user';
import { Post } from '../../post';
import { Album, Photo } from '../../album';
import { CMSService } from '../../cms.service';
import { UsersComponent } from '../users.component';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  user: any;
  todos: ToDo[] = [];
  albums: Album[] = [];
  photos: Photo[] = [];
  posts: Post[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private cmsService: CMSService,
    private location: Location    
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getToDos();
    this.getPhotos();
    this.getPosts();
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cmsService.getUser(id)
      .subscribe(user => this.user = user);
  }

  getToDos(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cmsService.getToDosForUserID(id)
      .subscribe(todos => this.todos = todos);
  }

  getAlbums(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cmsService.getAlbumsForUserID(id)
      .subscribe(albums => this.albums = albums);
  }

  getPhotos() : void {
    this.cmsService.getPhotos()
      .subscribe(photos => {
        this.photos = photos;
        /* We call this function here so the album preview doesnt get rendered before all photos are loaded */
        this.getAlbums();
      });
  }

  getPosts() : void {
    this.cmsService.getPosts()
      .subscribe(posts => this.posts = posts);
  }
  
  goBack(): void {
    this.location.back();
  }
}
