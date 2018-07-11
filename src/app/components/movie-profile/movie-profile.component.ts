import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from '../../services/movies.service/movies.service';
import {MovieResponse} from '../../services/movies.service/responses/movie-response';
import {Star} from '../../core/star';
import {FavoritesStorage} from '../../core/favorites-storage.service';

@Component({
  selector: 'app-movie-profile',
  templateUrl: './movie-profile.component.html',
  styleUrls: ['./movie-profile.component.scss']
})
export class MovieProfileComponent implements OnInit {

  public movie: MovieResponse;
  public stars: Array<Star> = [];
  public isFavorite: boolean;

  constructor(private route: ActivatedRoute,
              private favoriteService: FavoritesStorage,
              private moviesService: MoviesService) {
  }

  async ngOnInit() {
    await this.route.params.forEach(async params => {
      await this.updateDataAsync(params['id']);
    });
  }

  async updateDataAsync(id: string) {
    this.movie = await this.moviesService.getByIdAsync(id);
    this.stars = this.convertAverageScoreToStars(+this.movie.imdbRating);
    this.isFavorite = this.favoriteService.isFavorite(this.movie);
  }

  public changeFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.favoriteService.addFavorite(this.movie);
    } else {
      this.favoriteService.removeFavorite(this.movie);
    }
  }

  private convertAverageScoreToStars(score: number): Array<Star> {
    score = score / 2;
    const allStars = [];
    if (score > 4.5) {
      for (let i = 0; i < 5; i++) {
        allStars.push(<Star>{isFull: true});
      }
      return allStars;
    }
    if (score < 0.5) {
      for (let i = 0; i < 5; i++) {
        allStars.push(<Star>{isEmpty: true});
      }
      return allStars;
    }
    const fillStars = Math.trunc(score);
    for (let i = 0; i < fillStars; i++) {
      allStars.push(<Star>{isFull: true});
    }
    const halfStars = Number.isInteger(score) ? 0 : 1;
    for (let i = 0; i < halfStars; i++) {
      allStars.push(<Star>{isHalf: true});
    }
    const emptyStars = 5 - fillStars - halfStars;
    for (let i = 0; i < emptyStars; i++) {
      allStars.push(<Star>{isEmpty: true});
    }
    return allStars;
  }
}
