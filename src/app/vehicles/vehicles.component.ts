import { Component, OnInit } from '@angular/core';
import Vehicle from './vehicle'
import VehicleService from './vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})

export class VehiclesComponent implements OnInit{
  constructor(private vehicleService:VehicleService){};
  
  vehicle:Vehicle = new Vehicle;
  
  vehicles:Vehicle[] = [];

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe(
      response => {
        this.vehicles = response;
      },
      error => {
        this.handleError(error);
      }
    )
  }

  insertVehicle(): void {
    this.vehicleService.insertVehicle(this.vehicle).subscribe(
      response => {
        // this.handleSuccess("Veículo inserido com sucesso!!!");
        this.getAllVehicles();
      },
      error => {
        this.handleError(error);
      }
    )
  }

  deleteVehicle(id:number | null): void{
    if(id != null){
      this.vehicleService.deleteVehicle(id).subscribe(
        resposta => {
          // this.handleSuccess("Veículo apagado com sucesso!");
          this.getAllVehicles();
        },
        error => {
          this.handleError(error);
        }
      )
    }
  }

  updateVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle
    console.log(vehicle);
    
    this.vehicleService.updateVehicle(this.vehicle).subscribe(
      response => {
        // this.handleSuccess("Veículo atualizado com sucesso!!");
        this.limpar()
        this.getAllVehicles();
      },
      error => {
        this.handleError(error);
      }
    )
  }

  insertReservation(id: number) {
    this.vehicleService.insertReservation(id).subscribe(
      response => {
        // this.handleSuccess("Veículo atualizado com sucesso!!");
        this.limpar()
        this.getAllVehicles();
      },
      error => {
        this.handleError(error);
      }
    )
  }

  deleteReservation(id: number) {
    this.vehicleService.deleteReservation(id).subscribe(
      response => {
        // this.handleSuccess("Veículo atualizado com sucesso!!");
        this.limpar()
        this.getAllVehicles();
      },
      error => {
        this.handleError(error);
      }
    )
  }

  filterUnreserved() {
    this.vehicles = this.vehicles.filter(vehicle => !vehicle.reserved);
  }

  limpar(): void{
    this.vehicle = new Vehicle;
  }

  handleSuccess(message: string): void {
    alert(message);
    this.vehicle = new Vehicle;
    this.getAllVehicles();
  }

  handleError(error: any): void {
    console.log(error);
    // alert("Ocorreu um erro. Por favor, tente novamente.");
  }
}
