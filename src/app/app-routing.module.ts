import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsDashboardComponent } from './shared/components/posts-dashboard/posts-dashboard.component';
import { PostsFormComponent } from './shared/components/posts-form/posts-form.component';
import { PostsDetailsComponent } from './shared/components/posts-details/posts-details.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostsDashboardComponent
  },
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'posts/addPost',
    component: PostsFormComponent
  },
  {
    path: 'posts/:postId',
    component: PostsDetailsComponent
  },
  {
    path: 'posts/:postId/edit',
    component: PostsFormComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
