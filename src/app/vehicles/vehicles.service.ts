import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Vehicle from './vehicle';
// import Reservation from '../reservation/reservation';

@Injectable({
  providedIn: 'root'
})

export default class VehicleService {

  constructor (private http: HttpClient) {}

    private url = "http://localhost:8080/vehicles";

    public getAllVehicles(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(this.url);
    }

    public insertVehicle(vehicle: Vehicle): Observable<Vehicle> {
        return this.http.post<Vehicle>(this.url, vehicle);
    }

    public deleteVehicle(id:number): Observable<any> {
        return this.http.delete<Vehicle>(this.url+"?id="+id);
    }

    public updateVehicle(vehicle: Vehicle): Observable<any> {
        return this.http.put<Vehicle>(this.url, vehicle);
    }

}
