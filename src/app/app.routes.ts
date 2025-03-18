import { Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'article'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'article',
        component: ArticleComponent
    }
];
