import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ImageService } from 'src/app/service/image.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component {
  hideDropDown = true;

  constructor(
    public auth: AuthService,
    public store: StoreService,
    private router: Router,
    public imageService: ImageService
  ) {}

  logout() {
    this.auth.logout();
    // this.router.navigate(['/login']);
  }

  toggleDropDown() {
    this.hideDropDown = !this.hideDropDown;
  }
}
