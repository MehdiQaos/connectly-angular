import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ImageService } from 'src/app/service/image.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showDropDown = false;
  isMenuOpen = true;
  // profilePictureUrl: string | null = null;
  // private userSubscription!: Subscription;

  constructor(
    public auth: AuthService,
    public store: StoreService,
    private router: Router,
    public imageService: ImageService
  ) {
    // this.profilePictureUrl = imageService.getImageUrl(this.store.user?.profilePictureLocation);
  }

  // ngOnInit() {
  //   this.userSubscription = this.store.userChange.subscribe((user) => {
  //     this.profilePictureUrl = this.imageService.getImageUrl(user?.profilePictureLocation);
  //   });
  // }

  // ngOnDestroy() {
  //   if (this.userSubscription) {
  //     this.userSubscription.unsubscribe();
  //   }
  // }

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
