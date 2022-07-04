import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent } from './posts/posts.component'
import { EditPostsComponent } from './posts/edit-posts/edit-posts.component'
import { ViewPostsComponent } from './posts/view-posts/view-posts.component'
import { NewPostComponent } from './posts/new-post/new-post.component'

import { UsersComponent } from './users/users.component'
import { ViewUsersComponent } from './users/view-users/view-users.component'

import { AlbumsComponent } from './albums/albums.component'
import { ViewAlbumsComponent } from './albums/view-albums/view-albums.component'

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    { path: 'posts', component: PostsComponent, data: { title: 'Posts' } },
    { path: 'posts/edit/:id', component: EditPostsComponent, data: { title: 'Edit Post' }  },
    { path: 'posts/:id', component: ViewPostsComponent, data: { title: 'Post' }  },
    { path: 'new-post', component: NewPostComponent, data: { title: 'New Post' }  },
    { path: 'users', component: UsersComponent, data: { title: 'Users' }  },
    { path: 'users/:id', component: ViewUsersComponent, data: { title: 'User Profile' }  },
    { path: 'albums', component: AlbumsComponent, data: { title: 'Albums' }  },
    { path: 'albums/:id', component: ViewAlbumsComponent, data: { title: 'Album View' }  },
    { path: 'dashboard', component: DashboardComponent, data: { title: 'JSONPlaceholder Frontend' }  },
    { path: '', component: DashboardComponent, data: { title: 'JSONPlaceholder Frontend' }  },
    { path: '**', component: DashboardComponent, data: { title: 'JSONPlaceholder Frontend' }  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
