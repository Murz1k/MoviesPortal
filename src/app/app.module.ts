import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MoviesComponent} from './components/movies/movies.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {LandingComponent} from './components/landing/landing.component';
import {RootComponent} from './components/root/root.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MovieProfileComponent} from './components/movie-profile/movie-profile.component';
import {FavoritesStorage} from './core/favorites-storage.service';
import {HeaderComponent} from './components/header/header.component';
import {FavoritesComponent} from './components/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    LandingComponent,
    RootComponent,
    MovieProfileComponent,
    HeaderComponent,
    FavoritesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatAutocompleteModule,
    HttpClientModule
  ],
  providers: [FavoritesStorage],
  bootstrap: [AppComponent]
})
export class AppModule {
}
