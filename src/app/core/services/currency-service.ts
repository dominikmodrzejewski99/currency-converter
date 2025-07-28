import { computed, Injectable, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { CurrenciesApiResponse } from '../../shared/models/currency.model';
import { environment } from '../../../environments/environment';
import { ConversionApiResponse } from '../../shared/models/conversion.model';

interface ConversionParams {
  readonly from: string;
  readonly to: string;
  readonly amount: number;
}

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

  public readonly isCurrenciesLoading = computed(() => {
    return this.resourceCurrencies.isLoading();
  });

  public readonly isConversionLoading = computed(() => {
    return this.resourceConversionResult.isLoading();
  });

  public readonly currenciesError = computed(() => {
    return this.resourceCurrencies.error();
  });

  public readonly conversionError = computed(() => {
    return this.resourceConversionResult.error();
  });


  public convertCurrency(params: ConversionParams): void {
    this.conversionParams.set(params);
  }

  public clearConversion(): void {
    this.conversionParams.set(null);
  }

  public reloadCurrencies(): void {
    this.resourceCurrencies.reload();
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
    }
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
