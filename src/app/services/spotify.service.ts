import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer BQAoB4vAqVx3b2943Aqpho7yY4M3kgxB5ECN3zcC-O6M6i4Z5PnCayhYRx8S2rtHRM6km5m6vhZU0G5-udA'
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases')
        .pipe( map( data => data['albums'].items ) );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
        .pipe( map( data => data['artists'].items ) );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${ id }`);
        // .pipe( map( data => data['artists'].items ) );
  }
}
