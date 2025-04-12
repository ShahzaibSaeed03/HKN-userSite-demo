import { Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { VideoNewsComponent } from './components/video-news/video-news.component';
import { BusinessComponent } from './components/business/business.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {path:"video-news/:type/:slug",
        component:VideoNewsComponent
    },
    { path: 'article/:type/:slug', component: ArticleComponent },

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'business',
        component: BusinessComponent
    },
];
