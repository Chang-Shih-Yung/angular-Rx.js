import { Routes } from '@angular/router';
import { ChildComponent } from './components/child/child.component';
import { HomeComponent } from './components/home/home.component';
import { PopupComponent } from './components/popup/popup.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // 根路由重定向到 'home'
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'popup',
    component: PopupComponent,
  },
  {
    path: 'child',
    component: ChildComponent,
  },
];
