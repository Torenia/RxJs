import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { IPosts } from './posts';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { switchMap, debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  postsArray: IPosts[];
  loadData = new Subject<void>();
  onSearchChange = new Subject<string>();

  constructor(private ApiService: ApiService) {
  }

  getPosts(): Observable<IPosts[]> {
    return this.ApiService.getPosts();
  }

  ngOnInit() {
    this.loadData
      .switchMap(() => this.getPosts())
      .do(posts => this.postsArray = posts)
      .subscribe();

    this.onSearchChange.pipe(
      debounceTime(1000),
      switchMap(input =>
        this.getPosts().map(posts => posts.filter(post => post.body.indexOf(input) !== -1))
      ),
      tap(filteredPosts => this.postsArray = filteredPosts)
    ).subscribe();
  }
}
