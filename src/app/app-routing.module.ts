import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './component/posts/posts.component';
import { PostDetailsComponent } from './component/post-details/post-details.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { NoAuthGuard } from './guard/no-auth.guard';
import { AuthGuard } from './guard/auth.guard';
import { ProfileComponent } from './component/profile/profile.component';

const routes: Routes = [
  { path: '', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'member/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: PostDetailsComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }