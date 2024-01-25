import { Component } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent {
  postArray: Array<any> = [];

  constructor(
    private postService: PostsService
  ){}

  ngOnInit() {
    this.postService.loadData().subscribe(val => {
      this.postArray = val
    })
  }

  onDelete(postImgPath: string, id: string) {
    this.postService.deleteData(postImgPath,id)
  }
}
