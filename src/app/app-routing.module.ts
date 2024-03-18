import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './component/posts/posts.component';
import { PostDetailsComponent } from './component/post-details/post-details.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }