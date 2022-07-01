import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Photo } from '../../album';
import { User } from '../../user';
import { CMSService } from '../../cms.service';

@Component({
  selector: 'app-view-albums',
  templateUrl: './view-albums.component.html',
  styleUrls: ['./view-albums.component.css']
})
export class ViewAlbumsComponent implements OnInit {

  album: any;
  photos: Photo[] = [];
  users: User[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private cmsService: CMSService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAlbum();
    this.getPhotosForAlbumID();
    this.getUsers();
  }

  getAlbum(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cmsService.getAlbum(id)
      .subscribe(album => this.album = album);
  }

  getPhotosForAlbumID(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cmsService.getPhotosForAlbumID(id)
      .subscribe(photos => this.photos = photos);
  }

  getUsers() : void {
    this.cmsService.getUsers()
      .subscribe(users => this.users = users);
  }

  goBack(): void {
    this.location.back();
  }
}
