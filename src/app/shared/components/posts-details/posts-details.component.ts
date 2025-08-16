import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ipost } from '../../models/post';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
  styleUrls: ['./posts-details.component.scss']
})
export class PostsDetailsComponent implements OnInit {
  postId !: string;
  postObj !: Ipost;
  constructor(
    private _postService : PostsService,
    private _routes : ActivatedRoute,
    private _matDialog : MatDialog,
    private _router : Router,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.getPostObj()
  }

  getPostObj(){
    this.postId = this._routes.snapshot.paramMap.get('postId')!
    this._postService.fetchSinglePost(this.postId)
        .subscribe({
          next : data => {
            this.postObj = data
          }
        })
  }

  onRemove(){
    let matConfig = new MatDialogConfig()

    matConfig.data = `Are you sure, you want to remove ${this.postObj.title}`

    this._matDialog.open(GetConfirmComponent, matConfig)
        .afterClosed().subscribe(res => {
          if(res){
            this._postService.removePost(this.postId)
                .subscribe({
                  next : res => {
                    console.log(res)
                    this._router.navigate(['posts'])
                  },
                  error : err => {
                    this._snackbar.openSnackbar(err)
                  }
                })
          }
        })
  }
}
