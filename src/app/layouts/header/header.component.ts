import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  email: string = ''
  isLoggedIn$: Observable<boolean> | undefined

  constructor(
    private authService: AuthService
  ){}

  ngOnInit() {
    this.email = JSON.parse(localStorage.getItem('user') || 'undefined').email
    this.isLoggedIn$ = this.authService.isLoggedIn()
  }

  onLogout() {
    this.authService.logOut()
  }
}
