import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { TransferComponent } from './transfer.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard] },
];
