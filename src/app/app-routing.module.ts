import {Paths} from './core/paths';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RootComponent} from './components/root/root.component';
import {LandingComponent} from './components/landing/landing.component';
import {MovieProfileComponent} from './components/movie-profile/movie-profile.component';
import {FavoritesComponent} from './components/favorites/favorites.component';
import {MoviesComponent} from './components/movies/movies.component';

const appRoutes: Routes = [
  {
    path: Paths.Root, component: RootComponent, children: [
      {path: Paths.Root, pathMatch: 'full', component: LandingComponent},
      {path: Paths.Movies + '/:id', pathMatch: 'full', component: MovieProfileComponent},
      {path: Paths.Movies, component: MoviesComponent},
      {path: Paths.Favorites, pathMatch: 'full', component: FavoritesComponent}
    ]
  },
  {path: '**', redirectTo: Paths.Root}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
