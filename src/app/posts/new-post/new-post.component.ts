import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../../post';
import { User } from '../../user';
import { CMSService } from '../../cms.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  post: Post = {id: 0, userId: 0, title: "", body: ""};
  posts: Post[] = [];
  users: User[] = [];
  username: string = "";
  
  constructor(
    private route: ActivatedRoute,
    private cmsService: CMSService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getPosts();
  }

  getPosts() : void {
    this.cmsService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

  getUsers() : void {
    this.cmsService.getUsers()
      .subscribe(users => {
        this.users = users;
      })
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.post.id = this.posts.length + 1;
    /* We need to convert the username to the corresponding userId */
    let selecteduser: any;
    if (selecteduser = this.users.find(element => element.name === this.username))
      this.post.userId = selecteduser.id;
    this.cmsService.createPost(this.post);
  }
}
