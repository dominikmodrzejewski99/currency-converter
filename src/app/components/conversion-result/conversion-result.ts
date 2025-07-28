import { Component, input, output } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { Conversion } from '../../shared/models/conversion.model';

@Component({
  selector: 'app-conversion-result',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './conversion-result.html',
  styleUrl: './conversion-result.scss'
})
export class ConversionResult {

  conversionResult = input<Conversion | null>(null);  // Wynik konwersji
  isLoading = input(false);                           // Loading state
  error = input<Error | null>(null);                  // Error state

  clearResult = output<void>();                       // (clearResult)

  protected onClear(): void {
    this.clearResult.emit();
  }
}
