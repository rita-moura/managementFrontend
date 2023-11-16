import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import Vehicle from './vehicle';
import Reservation from './reservationDto';

@Injectable({
  providedIn: 'root'
})

export default class ReservationService {

  constructor (private http: HttpClient) {}

    private url = "http://localhost:8080/reservations";

    public getAllreservations(): Observable<any> {
        return this.http.get(this.url);
    }

    public insertReservation(id: number): Observable<any> {
        return this.http.post<Reservation>(this.url, {vehicleId: id})
    }

    public deleteReservation(id: number): Observable<any> {
        return this.http.delete<Reservation>(this.url+"?id="+id)
    }

}
