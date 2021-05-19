import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatGuard } from './guards/chat.guard';
import { LoginComponent } from './login/login.component';
import { MainContainerComponent } from './main-container/main-container.component';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,    
    canActivate: [ChatGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
