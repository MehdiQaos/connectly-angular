import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showDropDown = false;
  isMenuOpen = true;

  constructor(
    public auth: AuthService,
    public store: StoreService,
    private router: Router
  ) {}

  toggleMenu() {
    console.log('toggleMenu: ' + this.isMenuOpen);

    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.showDropDown = !this.showDropDown;
  }

  logout() {
    this.toggleDropdown();
    this.auth.logout();
  }

  goToProfile() {
    this.toggleDropdown();
    this.router.navigate(['/profile', this.store.user.id]);
  }
}
