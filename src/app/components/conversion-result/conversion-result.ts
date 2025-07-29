import { Component, input, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ConversionType } from '../../shared/models/conversion.model';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-conversion-result',
  imports: [DecimalPipe, MatIcon, MatProgressSpinner],
  templateUrl: './conversion-result.html',
  styleUrl: './conversion-result.scss',
})
export class ConversionResult {
  conversionResult = input<ConversionType | null>(null);
  isLoading = input(false);
  error = input<Error | null>(null);
}
