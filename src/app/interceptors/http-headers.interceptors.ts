import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"

@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor{
    constructor() {}

    intercept(
        req : HttpRequest<any>,
        next: HttpHandler
    ) : Observable<HttpEvent<any>> 
    {
        req =req.clone({
            setHeaders:{
                'X-RapidAPI-Key': '7a73d435e6msh3da30d08ccb430ep17d152jsn9e2d82f705ce',
                'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
            },
            setParams:{
                key : 'ba3867fbf9d34a67ae8646dc59faec98',
            }

        });
        return next.handle(req);
    }

}


