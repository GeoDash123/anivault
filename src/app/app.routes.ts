import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/pages/home/home').then(m => m.Home)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/pages/login-page/login-page').then(m => m.Login),
        canActivate: [guestGuard]
    },
    {
        path: 'favoritos',
        loadComponent: () =>
            import('./features/pages/favorites/favorites').then(m => m.Favorites),
        canActivate: [authGuard]
    },
    {
        path: 'anime/:id',
        loadComponent: () =>
            import('./features/pages/anime-detail/anime-detail').then(m => m.AnimeDetail)
    },
    {
        path: '**',
        loadComponent: () =>
            import('./features/pages/not-found/not-found').then(m => m.NotFound)
    }
];
