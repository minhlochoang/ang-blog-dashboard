import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Post } from '../models/post';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  uploadImage(selectedImg: any, postData: Post, id: string) {
    const filePath = `postIMG/${Date.now()}`

    this.storage.upload(filePath, selectedImg).then(() => {

      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL

        id ? this.updateData(id, postData): this.saveData(postData)
      })
    })
  }

  saveData(postData: any) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Data uploaded successfully')
      this.router.navigate(['/posts'])
    })
  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {id, data}
        })
      })
    )
  }

  loadDataById(id: string) {
    // return this.afs.collection('posts').doc(id).valueChanges()
    return this.afs.doc(`posts/${id}`).valueChanges()
  }

  updateData(id: string, postData: any) {
    this.afs.doc(`posts/${id}`).update(postData).then(docRef => {
      this.toastr.success('Data updated successfully')
      this.router.navigate(['/posts'])
    })
  }

  deleteData(postImgPath: string, id: string) {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.afs.doc(`posts/${id}`).delete().then(() => {
        this.toastr.warning('Data deleted successfully')
      })
    })
  }

  putFeatured(id: string, featured: any) {
    this.afs.doc(`posts/${id}`).update(featured).then(() => {
      this.toastr.info('Featured updated successfully')
    })
  }
}
