import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/pages/home/home').then(m => m.Home)
    },

    {
        path: 'explorar',
        loadComponent: () =>
            import('./features/pages/explore/explore').then(m => m.Explore)
    },
    {
        path: 'top',
        loadComponent: () =>
            import('./features/pages/top/top').then(m => m.Top)
    },
    {
        path: 'favoritos',
        loadComponent: () =>
            import('./features/pages/favorites/favorites').then(m => m.Favorites)
    },
    {
        path: 'anime/:id',
        loadComponent: () =>
            import('./features/pages/anime-detail/anime-detail').then(m => m.AnimeDetail)
    },
];
