import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CMSService } from '../cms.service';
import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  visiblePosts: Post[] = [];
  pageIndex: number = 0;
  
  constructor(
    private cmsService: CMSService,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() : void {
    this.cmsService.getPosts()
      .subscribe(posts => { 
        this.posts = posts; 
        this.visiblePosts = posts.slice(this.pageIndex, this.pageIndex + 10)
      });
  }

  delete(indexOf: any): void {
    let post = this.visiblePosts[indexOf];
    if (post) {
      console.log(this.visiblePosts.indexOf(post));
      this.cmsService.deletePost(post)
        .subscribe(() => {
          /* Since the backend doesnt delete anything we only do it visually by removing the post from the posts array */
          this.visiblePosts.splice(this.visiblePosts.indexOf(post), 1); 
        });
    }
  }

  nextPage(): void {
    if (this.pageIndex < (this.posts.length / 10))
      this.pageIndex++;

    this.visiblePosts = this.posts.slice(this.pageIndex, this.pageIndex + 10);
  }

  previousPage(): void {   
    if (this.pageIndex > 0)
      this.pageIndex--;

    this.visiblePosts = this.posts.slice(this.pageIndex, this.pageIndex + 10);
  }
}
