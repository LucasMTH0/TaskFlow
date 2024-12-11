import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateTaskComponent } from './pages/task/create-task/create-task.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
    },
    {
        path: 'task',
        children: [
            {
                path: 'create',
                loadComponent: () => 
                    import('./pages/task/create-task/create-task.component').then((m) => m.CreateTaskComponent) 
            }
        ]
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/edit-profile/edit-profile.component').then((m) => m.EditProfileComponent)
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/auth/login/login.component')
                .then((m) => m.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/auth/register/register.component')
                .then((m) => m.RegisterComponent)
            }
        ]
    }
];
