import { Component, OnInit } from '@angular/core';
import Vehicle from './vehicle'
import VehicleService from './vehicles.service';
import ReservationService from '../reservation/reservetion.service';
import Reservation from '../reservation/reservation';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})

export class VehiclesComponent implements OnInit{
  constructor(
    private vehicleService:VehicleService, 
    private reservetionService: ReservationService,
  ){};

  vehicle:Vehicle = new Vehicle;
  
  vehicles:Vehicle[] = [];

  reservations: Reservation[] = [];

  loading:boolean = true;

  ngOnInit(): void {
    this.getAllVehicles();
    this.getAllreservations();
    this.loading = false
  }

  recarregarPagina(): void {
    location.reload();
  }

  getAllVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe(
      response => {
        this.loading = true;
        this.vehicles = response;
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    )
  }

  insertVehicle(): void {
    this.vehicleService.insertVehicle(this.vehicle).subscribe(
      response => {
        this.loading = true;
        this.getAllVehicles();
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    )
  }

  deleteVehicle(id:number | null): void{
    if(id != null){
      this.vehicleService.deleteVehicle(id).subscribe(
        resposta => {
          this.loading = true;
          this.getAllVehicles();
        },
        error => {
          this.loading = false;
          alert("Veículo está reservado, por isso não pode ser excluído")
          console.log(error);
        }
      )
    }
  }

  updateVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle
    
    this.vehicleService.updateVehicle(this.vehicle).subscribe(
      response => {
        this.loading = true;
        // this.handleSuccess("Veículo atualizado com sucesso!!");
        this.getAllVehicles();
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    )
  }

  filterUnreserved() {
    this.vehicles = this.vehicles.filter(vehicle => !vehicle.reserved);
  }

  getAllreservations(): void {
    this.reservetionService.getAllreservations().subscribe(
      response => {
        this.loading = true;
        this.reservations = response;
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    )
  }
  

  insertReservation(id: number) {
    this.reservetionService.insertReservation(id).subscribe(
      response => {
        this.loading = true;
        // this.handleSuccess("Veículo atualizado com sucesso!!");

      },
      error => {
        this.loading = false;
        console.log(error);
      }
    )
  }

  deleteReservation(id: number) {
    this.getAllreservations
    
    const reservationToDelete = this.reservations.find((reservation) => {
      return reservation.vehicle!.id === id;
    });
    
    if (reservationToDelete !== null && reservationToDelete !== undefined) {
      const reservationId = reservationToDelete.reservation!.id;
      this.reservetionService.deleteReservation(reservationId!).subscribe(
        response => {
          this.loading = true;
          // this.handleSuccess("Veículo atualizado com sucesso!!");
        },
        error => {
          this.loading = false;
          console.log(error);
        }
      )
    }
  }
}
