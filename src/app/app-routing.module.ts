import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomePage } from './home/home.page';
// import { HomePage } from './home/home.page'

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', component: HomePage },
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [TutorialGuard] },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'todo', loadChildren: './todo/todo.module#TodoPageModule', canActivate: [AuthGuard] },
  { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' }
  // { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
