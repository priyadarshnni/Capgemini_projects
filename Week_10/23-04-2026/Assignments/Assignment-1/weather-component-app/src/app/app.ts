import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface WeatherRecord {
  name: string;
  temperature: string;
  wind: string;
  humidity: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  cityName: string = '';
  matchedWeather: WeatherRecord | null = null;
  searched: boolean = false;

  weatherData: WeatherRecord[] = [
    { name: 'London', temperature: '12°C', wind: '10 km/h', humidity: '80%' },
    { name: 'Delhi', temperature: '35°C', wind: '15 km/h', humidity: '45%' },
    { name: 'Mumbai', temperature: '30°C', wind: '20 km/h', humidity: '70%' },
    { name: 'Jaipur', temperature: '32°C', wind: '12 km/h', humidity: '50%' }
  ];

  onSearch(): void {
    const typedCity = this.cityName.trim();

    if (typedCity === '') {
      this.matchedWeather = null;
      this.searched = false;
      return;
    }

    this.searched = true;

    const result = this.weatherData.find(
      record => record.name.toLowerCase() === typedCity.toLowerCase()
    );

    this.matchedWeather = result ? result : null;
  }
}