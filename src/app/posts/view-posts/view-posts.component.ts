import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Comment } from '../../post';
import { User } from '../../user';
import { CMSService } from '../../cms.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {

  post: any;
  comments: any;
  users: User[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private cmsService: CMSService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCommentsForPostID();
    this.getUsers();
  }

  getPost(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cmsService.getPost(id)
      .subscribe(post => this.post = post);
  }

  getCommentsForPostID(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cmsService.getCommentsForPostID(id)
      .subscribe(comments => {
        this.comments = comments;
        /* To prevent errors we need to make sure we load the comments before we load the post 
        This is because the comments are not stored in the post object but are requested via a different route */
        this.getPost();
      });
  }

  getUsers() : void {
    this.cmsService.getUsers()
      .subscribe(users => this.users = users);
  }

  goBack(): void {
    this.location.back();
  }
}
