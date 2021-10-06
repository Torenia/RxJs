import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { IPosts } from './posts';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {

  private postsURL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<IPosts[]> {
    return this.http
      .get<IPosts[]>(this.postsURL)
      .pipe(catchError(this.handleError)
      );
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
