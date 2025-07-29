import { computed, Injectable, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { CurrenciesApiResponse } from '../../shared/models/currency.model';
import { environment } from '../../../environments/environment';
import { ConversionApiResponse, ConversionParams } from '../../shared/models/conversion.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  public readonly currencies = computed(() => {
    const response = this.resourceCurrencies.value();
    return response?.response || [];
  });

  public readonly conversionResult = computed(() => {
    const response = this.resourceConversionResult.value();
    return response?.response || null;
  });

  public readonly isCurrenciesLoading = computed(() => this.resourceCurrencies.isLoading());
  public readonly isConversionLoading = computed(() => this.resourceConversionResult.isLoading());

  public readonly currenciesError = computed(() => this.resourceCurrencies.error());
  public readonly conversionError = computed(() => this.resourceConversionResult.error());

  public convertCurrency(params: ConversionParams): void {
    this.conversionParams.set(params);
  }

  private readonly conversionParams = signal<ConversionParams | null>(null);

  private resourceCurrencies = httpResource<CurrenciesApiResponse>(() => {
    const url = `${environment.apiUrl}currencies`;
    return {
      url: url,
      params: {
        api_key: environment.apiKey,
        type: 'fiat'
      },
      method: 'GET'
    };
  });

  private resourceConversionResult = httpResource<ConversionApiResponse>(() => {
    const params = this.conversionParams();
    if (!params) return undefined;
    return {
      url: `${environment.apiUrl}convert`,
      params: {
        api_key: environment.apiKey,
        from: params.from,
        to: params.to,
        amount: params.amount.toString()
      },
      method: 'GET'
    };
  });
}
