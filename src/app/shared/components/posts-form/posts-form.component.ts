import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ipost } from '../../models/post';
import { UuidService } from '../../services/uuid.service';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss']
})
export class PostsFormComponent implements OnInit {

  postId !: string;
  isInEditMode : boolean = false;
  base64Img !: string;
  postForm !: FormGroup;
  userIdArr = [1, 2, 3 ,4, 5, 6, 7, 8, 9, 10]

  constructor(
    private _routes : ActivatedRoute,
    private _uuid : UuidService,
    private fb : FormBuilder,
    private _postService : PostsService,
    private _router : Router,
    private _snackbar : SnackbarService
  ) { 
    this.postForm = fb.group({
      title : [null, [Validators.required]],
      userId : [null, [Validators.required]],
      content : [null, [Validators.required]],
      imageSrc : [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.editModeSetup();
  }

  editModeSetup(){
    this.postId = this._routes.snapshot.paramMap.get('postId')!
    if(this.postId){
      this.isInEditMode = true
      this._postService.fetchSinglePost(this.postId)
          .subscribe(res => {
            this.postForm.patchValue(res);
          })
    }
  }
  

  onPhotoUpload(event: Event){
    let input = event.target as HTMLInputElement
    
    if(input.files && input.files.length > 0){
      let file = input.files[0]
      
      const blob = new Blob([file], {type: file.type})
      
      const reader = new FileReader()
      reader.onload = () => {
        let base64 = reader.result as string;
        console.log(base64);
        
        this.base64Img = base64
        let fileObj = {
          fileName : file.name,
          fileBlob : base64,
          fileType : file.type,
          fileSize : file.size
        }

        this.postForm.get('imageSrc')?.patchValue(fileObj)
        
      }

      reader.readAsDataURL(blob)
    }
    
  }

  onPostFormSubmit(){

    if(this.postForm.valid){
      let postObj : Ipost = {...this.postForm.value, id : this._uuid.uuid()}
      this._postService.createNewPost(postObj)
          .subscribe({
            next: res => {
              this._router.navigate(['posts'])
              this._snackbar.openSnackbar(`${postObj.title} Added successfully !!`)
            },
            error : err => {
              this._snackbar.openSnackbar(err)
            }
          })
    }
  }

  onUpdate(){
    if(this.postForm.valid){
      let postObj : Ipost = {...this.postForm.value, id : this.postId}
      console.log(postObj);
      
      this._postService.updatePost(postObj)
          .subscribe({
            next: res => {
              this._router.navigate(['posts'])
              this._snackbar.openSnackbar(`${postObj.title} Updated successfully !!`)
            },
            error : err => {
              this._snackbar.openSnackbar(err)
            }
          })
    }
  }

}
