import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  uploadImage(selectedImg: any) {
    const filePath = `postIMG/${Date.now()}`

    this.storage.upload(filePath, selectedImg).then(() => {
      console.log('Post image uploaded successfully')
    })
  }
}
