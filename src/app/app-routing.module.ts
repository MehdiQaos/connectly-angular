import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './component/posts/posts.component';
import { PostDetailsComponent } from './component/post-details/post-details.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { NoAuthGuard } from './guard/no-auth.guard';
import { AuthGuard } from './guard/auth.guard';
import { ProfileComponent } from './component/profile/profile.component';
import { EditprofileComponent } from './component/editprofile/editprofile.component';
import { SearchMemberComponent } from './component/search-member/search-member.component';
import { SearchPostComponent } from './component/search-post/search-post.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
      { path: 'profile/edit', component: EditprofileComponent, canActivate: [AuthGuard] },
      { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'posts/search', component: SearchPostComponent, canActivate: [AuthGuard] },
      { path: 'posts/:id', component: PostDetailsComponent, canActivate: [AuthGuard] },
      { path: 'members/search', component: SearchMemberComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'posts' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }