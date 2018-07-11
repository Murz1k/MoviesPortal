import {Component, OnInit} from '@angular/core';
import {Paths} from '../../core/paths';
import {MovieResponse} from '../../services/movies.service/responses/movie-response';
import {MoviesService} from '../../services/movies.service/movies.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public movies: MovieResponse[] = [];
  public Paths = Paths;

  constructor(private moviesService: MoviesService,
              private router: Router) {
  }

  ngOnInit() {
  }

  async submitAsync(event) {
    const response = await this.moviesService.getAsync(event.target.value);
    this.movies = response.Search;
  }

  async loadMoviesAsync(event) {
    this.router.navigate([Paths.Movies], {queryParams: {s: event.target.value}});
  }
}
