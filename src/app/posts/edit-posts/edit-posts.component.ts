import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../user';
import { CMSService } from '../../cms.service';

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.css']
})
export class EditPostsComponent implements OnInit {

  post: any;
  users: User[] = [];
  username: string = "Unknown";
  
  constructor(
    private route: ActivatedRoute,
    private cmsService: CMSService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cmsService.getPost(id)
      .subscribe(post => {
        this.post = post;
        this.getUsers();
      });
  }

  getUsers() : void {
    this.cmsService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.getUsername();
      })
  }

  /* JSON Placeholder doesnt offer a route to get a Username by UserID so we have to do a workaround */
  getUsername() {
    for (let user of this.users.values()) {
      if (this.post.userId === user.id) {
        this.username = user.name;
        break;  
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.post) {
      this.cmsService.updatePost(this.post)
        .subscribe(() => this.goBack());
    }
  }
}
