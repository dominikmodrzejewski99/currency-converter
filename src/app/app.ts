import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from './core/services/currency-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Currency Converter');

  protected currencyService = inject(CurrencyService);

  public currencies = this.currencyService.currencies;
}
