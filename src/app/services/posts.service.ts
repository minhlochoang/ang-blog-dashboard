import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Post } from '../models/post';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) { }

  uploadImage(selectedImg: any, postData: Post) {
    const filePath = `postIMG/${Date.now()}`

    this.storage.upload(filePath, selectedImg).then(() => {

      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL

        this.afs.collection('posts').add(postData).then(docRef => {
          this.toastr.success('Data uploaded successfully')
        })
      })
    })
  }
}