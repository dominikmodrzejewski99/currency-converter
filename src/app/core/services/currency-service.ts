import {computed, Injectable} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {CurrencyType} from '../../shared/models/currency.model';
import {environment} from '../../../environments/environment';
import {ConversionType} from '../../shared/models/conversion.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  public readonly currencies = computed(() => {
    return this.resourceCurrencies.value();
  });

  private resourceCurrencies = httpResource<CurrencyType>(() => {
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

  private resourceConversionResult = httpResource<ConversionType>(() => {
    const url = `${environment.apiUrl}convert`;

    return {
      url: url,
      params: {
        api_key: environment.apiKey,
        from: 'USD',
        to: 'PLN',
        amount: '100'
      },
      method: 'GET'
    };
  });



}
