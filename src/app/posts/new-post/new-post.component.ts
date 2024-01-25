import { Component } from '@angular/core';
import { CategoriesService } from './../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  imgSrc: any = './assets/image-placeholder.png';
  selectedImg: any;
  categories: Array<any> = []
  postForm!: FormGroup;
  post: any
  postStatus: string = 'Add new'
  id: string = ''

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ){
    this.route.queryParams.subscribe(val => {
      this.id = val['id'];
      this.postService.loadDataById(this.id).subscribe(post => {
        this.post = post

        if (this.post) {
          this.postForm = this.fb.group({
            title: [this.post.title,[Validators.required, Validators.minLength(5)]],
            excerpt: [this.post.excerpt,[Validators.required, Validators.minLength(10)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`,Validators.required],
            postImg: ['',Validators.required],
            content: [this.post.content,Validators.required],
          })
          this.imgSrc = this.post.postImgPath
          this.postStatus = 'Edit'
        } else {
          this.postForm = this.fb.group({
            // { value: '', disabled: true }
            title: ['',[Validators.required, Validators.minLength(5)]],
            excerpt: ['',[Validators.required, Validators.minLength(10)]],
            category: ['',Validators.required],
            postImg: ['',Validators.required],
            content: ['',Validators.required],
          })
        }
      })
    })
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val
    })
  }

  // get fc() {
  //   return this.postForm.controls
  // }

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

    this.postService.uploadImage(this.selectedImg, postData, this.id)

    this.postForm.reset()
    this.imgSrc = './assets/image-placeholder.png'
  }
}
