import { Routes } from '@angular/router';
import { Profile } from '../Components/profile/profile';
import { App } from './app';
import { Order } from '../Components/order/order';

export const routes: Routes = [
  { path: 'profile', component: Profile },
  { path: 'orders', component: Order },
];
