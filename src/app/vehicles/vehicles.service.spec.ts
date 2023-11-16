import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';

import VehiclesService from './vehicles.service';

describe('VehiclesService', () => {
  let vehiclesService: VehiclesService;
  let httpController: HttpTestingController;   

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehiclesService]
    });
    vehiclesService = TestBed.inject(VehiclesService);
    httpController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(vehiclesService).toBeTruthy();
  });
});
