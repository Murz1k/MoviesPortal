import {Injectable, EventEmitter} from '@angular/core';
import {MovieResponse} from '../services/movies.service/responses/movie-response';
import {isNullOrUndefined} from 'util';

@Injectable()
export class FavoritesStorage {

  public favoritesChanged: EventEmitter<any> = new EventEmitter<any>();

  readonly favoriteKey = 'movies';

  public getFavorites(): MovieResponse[] {
    const result = JSON.parse(localStorage.getItem(this.favoriteKey));
    if (isNullOrUndefined(result)) {
      return [];
    }
    return <MovieResponse[]> result;
  }

  public addFavorite(movie: MovieResponse) {
    const favorites = this.getFavorites();
    favorites.push(movie);
    localStorage.setItem(this.favoriteKey, JSON.stringify(favorites));
    this.favoritesChanged.emit(favorites);
  }

  public isFavorite(movie: MovieResponse): boolean {
    const result = JSON.parse(localStorage.getItem(this.favoriteKey));
    if (isNullOrUndefined(result)) {
      return false;
    }
    return result.some(i => i.imdbID === movie.imdbID);
  }

  public removeFavorite(movie: MovieResponse) {
    let favorites = this.getFavorites();
    favorites = favorites.filter(i => i.imdbID !== movie.imdbID);
    localStorage.setItem(this.favoriteKey, JSON.stringify(favorites));
    this.favoritesChanged.emit(favorites);
  }
}


