import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movies.service/movies.service';
import {MovieResponse} from '../../services/movies.service/responses/movie-response';
import {Paths} from '../../core/paths';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public movies: MovieResponse[] = [];
  public Paths = Paths;

  constructor(private moviesService: MoviesService) {
  }

  async ngOnInit() {
    await this.updateDataAsync('Batman');
  }

  async updateDataAsync(search: string) {
    const response = await this.moviesService.getAsync(search);
    this.movies = response.Search;
  }
}
