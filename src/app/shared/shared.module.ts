import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [ProfileComponent, LoginComponent],
  imports: [
    CommonModule
  ],
  exports: [ProfileComponent,LoginComponent]
})
export class SharedModule { }
