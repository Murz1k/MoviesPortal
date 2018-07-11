import {Component, OnInit} from '@angular/core';
import {Paths} from '../../core/paths';
import {MovieResponse} from '../../services/movies.service/responses/movie-response';
import {MoviesService} from '../../services/movies.service/movies.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public movies: MovieResponse[] = [];
  public Paths = Paths;

  constructor(private moviesService: MoviesService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(async (params: Params) => {
      await this.updateDataAsync(params['s']);
    });
  }

  ngOnInit() {
  }

  async updateDataAsync(search: string) {
    const response = await this.moviesService.getAsync(search);
    this.movies = response.Search;
  }
}
