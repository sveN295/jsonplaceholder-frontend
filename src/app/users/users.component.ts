import { Component, OnInit } from '@angular/core';

import { User, Adress, Geo, Company } from '../user';
import { CMSService } from '../cms.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;
  
  constructor(
    private cmsService: CMSService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() : void {
    this.cmsService.getUsers()
      .subscribe(users => this.users = users);
  }
}
