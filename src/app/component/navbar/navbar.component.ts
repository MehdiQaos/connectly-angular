import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showDropDown = false;
  isMenuOpen = true;

  constructor(
    public auth: AuthService
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
}
