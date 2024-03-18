import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showDropDown = false;
  isMenuOpen = true;

  toggleMenu() {
    console.log('toggleMenu: ' + this.isMenuOpen);
    
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.showDropDown = !this.showDropDown;
  }
}
