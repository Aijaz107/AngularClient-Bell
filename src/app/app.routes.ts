import { provideRouter, Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';

import { UserUpdateComponent  } from './user-update/user-update.component';

import { bootstrapApplication } from '@angular/platform-browser';

import { UserCreateComponent  } from './user-create/user-create.component';

import { AppComponent  } from './app.component';

export const routes: Routes = [

        { path: '', redirectTo: 'users', pathMatch: 'full' },

        { path: 'users', component: UserListComponent  },

        { path: 'users/create', component: UserCreateComponent  },

        { path: 'users/edit/:id', component: UserUpdateComponent  },

];

export const AppRoutes = provideRouter(routes);

bootstrapApplication(AppComponent, {

    providers: [AppRoutes]

});