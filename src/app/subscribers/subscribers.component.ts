import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent {
  subArray: Array<any> = [];

  constructor(
    private subService: SubscribersService
  ){}

  ngOnInit() {
    this.subService.loadData().subscribe(data => {
      this.subArray = data
    })
  }

  onDelete(id: string) {
    this.subService.deleteData(id)
  }
}
