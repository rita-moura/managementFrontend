import Vehicle from "../vehicles/vehicle"
import ReservationDto from "./reservationDto"

export default class Reservation {
    reservation: ReservationDto | null = null;
    vehicle: Vehicle | null = null;
}