
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiclesComponent } from './vehicles.component';
import { LoadingComponent } from '../loading/loading.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import VehicleService from './vehicles.service';
import { listMockVehicle} from './mock';
import { of, throwError } from 'rxjs';

describe('VehicleComponent', () => {
  let component: VehiclesComponent;
  let fixture: ComponentFixture<VehiclesComponent>;
  let vehiclesService: VehicleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        FormsModule,
      ],
      declarations: [ 
        VehiclesComponent, 
        LoadingComponent,
      ],
      providers: [{ provide: VehicleService, useClass: VehicleService }]
    }).compileComponents();
    vehiclesService = TestBed.inject(VehicleService);
    fixture = TestBed.createComponent(VehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find vehicles', () => {
    spyOn(vehiclesService, "getAllVehicles").and.returnValue(of(listMockVehicle))
    fixture.detectChanges();

    component.getAllVehicles();
    expect(component.vehicles).toEqual(listMockVehicle);
    expect(vehiclesService.getAllVehicles).toHaveBeenCalledWith();
  });

  it('should find vehicles and return erro', () => {
    const mockErro = new Error("erro");
    
    spyOn(vehiclesService, "getAllVehicles").and.callFake(() => throwError(mockErro));

    spyOn(console, 'log');

    fixture.detectChanges();

    component.getAllVehicles();
    expect(console.log).toHaveBeenCalledWith(mockErro);
  });
  
});

