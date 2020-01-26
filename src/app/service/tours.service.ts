import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) { }

  getTours(link)
  {
    return this.http.get<any>(environment.API_URL+link);
  }

  checkUser(link,header)
  {
    return this.http.post<any>(environment.API_URL+link,header);
  }

  cancelBooking(link,header)
  {
    return this.http.put<any>(environment.API_URL+link,header);
  }
}
