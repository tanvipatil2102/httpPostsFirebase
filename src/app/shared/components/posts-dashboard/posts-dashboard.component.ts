import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Ipost } from '../../models/post';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.scss']
})
export class PostsDashboardComponent implements OnInit {

  postsArray !: Array<Ipost>;
  constructor(
    private _postsService : PostsService
  ) { }

  ngOnInit(): void {
    this.getArray();
  }

  getArray(){
    this._postsService.fetchALlPosts()
        .subscribe({
          next: data => {
            let arr : Array<Ipost> = [];
            for (const key in data) {
              arr.unshift({...data[key], id : key})
            }
            this.postsArray = arr;
          }
        })
  }



}
