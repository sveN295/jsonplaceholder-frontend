import { Component, OnInit } from '@angular/core';

import { CMSService } from '../cms.service';
import { Album, Photo } from '../album';
import { User } from '../user';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = [];
  visibleAlbums: Album[] = [];
  photos: Photo[] = [];
  users: User[] = [];
  pageIndex: number = 0;
  
  constructor(
    private cmsService: CMSService
  ) { }

  ngOnInit(): void {
    this.getPhotos();
    this.getUsers();
  }

  getAlbums() : void {
    this.cmsService.getAlbums()
      .subscribe(albums => {
        this.albums = albums;
        this.visibleAlbums = albums.slice(this.pageIndex, this.pageIndex + 10);
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

  getUsers() : void {
    this.cmsService.getUsers()
      .subscribe(users => this.users = users.slice(0, 5));
  }
  
  nextPage(): void {
    if (this.pageIndex < (this.albums.length / 10))
      this.pageIndex++;

    this.visibleAlbums = this.albums.slice(this.pageIndex, this.pageIndex + 10);
  }

  previousPage(): void {   
    if (this.pageIndex > 0)
      this.pageIndex--;

    this.visibleAlbums = this.albums.slice(this.pageIndex, this.pageIndex + 10);
  }
}
