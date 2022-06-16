import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGamelist(
    ordering: string,
    search?:string
  ):Observable<APIResponse<Game>>  {
    let params= new HttpParams().set('ordering',ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id:string):Observable<Game>{
    const gameInfoReqest=this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailerReqest=this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotesReqest=this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);

    return forkJoin({
      gameInfoReqest,
      gameScreenshotesReqest,
      gameTrailerReqest
    }).pipe(
      map((resp:any)=>{
        return{
          ...resp['gameInfoReqest'],
          screenshots: resp['gameScreenshotesReqest']?.results,
          trailers: resp['gameTrailers']?.results,
        }
      })
    )
  }
}
