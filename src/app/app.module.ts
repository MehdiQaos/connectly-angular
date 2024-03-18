import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './component/post/post.component';
import { CommentComponent } from './component/comment/comment.component';
import { Post2Component } from './component/post2/post2.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { Sidebar2Component } from './component/sidebars/sidebar2/sidebar2.component';
import { Sidebar1Component } from './component/sidebars/sidebar1/sidebar1.component';
import { EditprofileComponent } from './component/editprofile/editprofile.component';
import { ImageformComponent } from './component/imageform/imageform.component';
import { PostsComponent } from './component/posts/posts.component';
import { PostDetailsComponent } from './component/post-details/post-details.component';
import { AddCommentComponent } from './component/add-comment/add-comment.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CommentComponent,
    Post2Component,
    NavbarComponent,
    Sidebar2Component,
    Sidebar1Component,
    EditprofileComponent,
    ImageformComponent,
    PostsComponent,
    PostDetailsComponent,
    AddCommentComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
