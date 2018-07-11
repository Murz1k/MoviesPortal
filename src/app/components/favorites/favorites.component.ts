import {Component, OnInit} from '@angular/core';
import {Paths} from '../../core/paths';
import {MovieResponse} from '../../services/movies.service/responses/movie-response';
import {FavoritesStorage} from '../../core/favorites-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public movies: MovieResponse[] = [];
  public Paths = Paths;

  constructor(private favoritesService: FavoritesStorage) {
    this.movies = this.favoritesService.getFavorites();
  }

  ngOnInit() {
  }
}
