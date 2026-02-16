import { provideRouter, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { UserCreateComponent } from './user-create/user-create.component';
import { AppComponent } from './app.component';

/**
 * Application route definitions
 *
 * Routes are intentionally simple: list, create and edit flows for users.
 * Additional routes (authentication, admin, etc.) should be added here
 * and registered in `AppRoutes`.
 */
export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: UserListComponent },
    { path: 'users/create', component: UserCreateComponent },
    { path: 'users/edit/:id', component: UserUpdateComponent },
];

/** Provider used by `bootstrapApplication` */
export const AppRoutes = provideRouter(routes);

// Bootstrap the standalone AppComponent and attach the router provider.
bootstrapApplication(AppComponent, {
    providers: [AppRoutes]
});