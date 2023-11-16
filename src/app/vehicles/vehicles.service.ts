import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Vehicle from './vehicle';
import Reservation from '../reservation/reservation';

@Injectable({
  providedIn: 'root'
})

export default class VehicleService {

  constructor (private http: HttpClient) {}

    private url = "http://localhost:8080/";

    public getAllVehicles(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(this.url+"vehicles");
    }

    public insertVehicle(vehicle: Vehicle): Observable<Vehicle> {
        return this.http.post<Vehicle>(this.url+"vehicles", vehicle);
    }

    public deleteVehicle(id:number): Observable<any> {
        return this.http.delete<Vehicle>(this.url+"vehicles"+"?id="+id);
    }

    public updateVehicle(vehicle: Vehicle): Observable<any> {
        return this.http.put<Vehicle>(this.url+"vehicles", vehicle);
    }

    public insertReservation(id: number): Observable<any> {
        return this.http.post<Reservation>(this.url+"reservations", {vehicleId: id})
    }

    public deleteReservation(id: number): Observable<any> {
        return this.http.post<Reservation>(this.url+"reservations", {id: id})
    }
}
