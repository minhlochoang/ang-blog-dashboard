import { Component } from '@angular/core';
import { CategoriesService } from './../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  permalink: string = '';
  imgSrc: any = './assets/image-placeholder.png';
  selectedImg: any;
  categories: Array<any> = []
  postForm: FormGroup;

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService
  ){
    this.postForm = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(5)]],
      permalink: [{disabled: true}, Validators.required],
      excerpt: ['',[Validators.required, Validators.minLength(10)]],
      category: ['',Validators.required],
      postImg: ['',Validators.required],
      content: ['',Validators.required],
    })
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val
    })
  }

  get fc() {
    return this.postForm.controls
  }

  onTitleChanged($event: any) {
    const title = $event.target.value
    this.permalink = title.replace(/\s/g, '-')
  }

  showPreview($event: any) {
    const reader = new FileReader()
    reader.onload = (e) => this.imgSrc = e.target?.result
    reader.readAsDataURL($event.target.files[0])
    this.selectedImg = $event.target.files[0]
  }

  onSubmit() {
    let splitted = this.postForm.value.category.split('-')

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }

    this.postService.uploadImage(this.selectedImg)
  }
}
