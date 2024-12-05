import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  flights: any[] = [];
  bookings: any[] = [];
  departure = '';
  destination = '';
  date = '';
  searchResult: any = null; // תוצאת החיפוש

  API_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  async fetchFlights() {
    try {
      this.flights = await lastValueFrom(this.http.get<any[]>(`${this.API_URL}/flights`));
    } catch (error) {
      console.error('Error fetching flights:', error);
      alert('Failed to load flights.');
    }
  }

  async searchFlights() {
    try {
      this.searchResult = this.flights.find((flight) => {
        return (
          flight.departure.toLowerCase() === this.departure.toLowerCase() &&
          flight.destination.toLowerCase() === this.destination.toLowerCase() &&
          flight.date.startsWith(this.date)
        );
      });

      if (!this.searchResult) {
        alert('No matching flight found. Please adjust your search criteria.');
      }
    } catch (error) {
      console.error('Error searching flights:', error);
    }
  }

  isMatchingFlight(flight: any): boolean {
    // מציג את כפתור "Book Now" רק עבור הטיסה שחיפשו
    return this.searchResult && this.searchResult._id === flight._id;
  }



  async bookFlight(flightId: string) {
    const booking = { flight: flightId, customerName: 'John Doe' };
    try {
      const newBooking = await lastValueFrom(this.http.post(`${this.API_URL}/bookings`, booking));
      this.bookings.push(newBooking);
      alert('Flight booked successfully!');
    } catch (error) {
      console.error('Error booking flight:', error);
      alert('Failed to book flight.');
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // תאריך בפורמט פשוט
  }

  ngOnInit() {
    this.fetchFlights();
  }
}
