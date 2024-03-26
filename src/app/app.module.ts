import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './component/post/post.component';
import { CommentComponent } from './component/comment/comment.component';
import { Post2Component } from './component/post2/post2.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { EditprofileComponent } from './component/editprofile/editprofile.component';
import { ImageformComponent } from './component/imageform/imageform.component';
import { PostsComponent } from './component/posts/posts.component';
import { PostDetailsComponent } from './component/post-details/post-details.component';
import { AddCommentComponent } from './component/add-comment/add-comment.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { AddPostComponent } from './component/add-post/add-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ProfileComponent } from './component/profile/profile.component';
import { EditEmailComponent } from './component/forms/edit-email/edit-email.component';
import { EditPasswordComponent } from './component/forms/edit-password/edit-password.component';
import { EditInfosComponent } from './component/forms/edit-infos/edit-infos.component';
import { EditProfilePictureComponent } from './component/forms/edit-profile-picture/edit-profile-picture.component';
import { CreatePostComponent } from './component/forms/create-post/create-post.component';
import { NoImageComponent } from './component/images/no-image/no-image.component';
import { SearchMemberComponent } from './component/search-member/search-member.component';
import { MemberCardComponent } from './component/member-card/member-card.component';
import { SearchPostComponent } from './component/search-post/search-post.component';
import { Navbar2Component } from './component/layout/navbar2/navbar2.component';
import { SidebarComponent } from './component/layout/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { EventsComponent } from './component/events/events.component';
import { NotificationComponent } from './component/notification/notification.component';
import { OffcanvasNotificationsComponent } from './component/offcanvas-notifications/offcanvas-notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CommentComponent,
    Post2Component,
    NavbarComponent,
    EditprofileComponent,
    ImageformComponent,
    PostsComponent,
    PostDetailsComponent,
    AddCommentComponent,
    RegisterComponent,
    LoginComponent,
    AddPostComponent,
    ProfileComponent,
    EditEmailComponent,
    EditPasswordComponent,
    EditInfosComponent,
    EditProfilePictureComponent,
    CreatePostComponent,
    NoImageComponent,
    SearchMemberComponent,
    MemberCardComponent,
    SearchPostComponent,
    Navbar2Component,
    SidebarComponent,
    LayoutComponent,
    EventsComponent,
    NotificationComponent,
    OffcanvasNotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
