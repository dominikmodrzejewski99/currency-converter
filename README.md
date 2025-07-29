# Currency Converter

## Prerequisites

* Node.js 18+
* Angular CLI ^20.1

## Getting Started

```bash
git clone https://github.com/dominikmodrzejewski99/currency-converter.git
cd currency-converter
npm install
```

## Environment

Create `src/environments/environment.ts` (or update existing) with your **CurrencyBeacon** token:

```ts
export const environment = {
  apiUrl: 'https://api.currencybeacon.com/v1/',
  apiKey: '<YOUR_API_KEY>',
};
```

Sign up at <https://currencybeacon.com> (free tier) and copy the key from **API Token Information**.

## Running Locally

```bash
ng serve
```

Navigate to <http://localhost>.

## Application Flow

1. **Currency Selection** – app fetches currencies (`/currencies`) and fills two `<select>` boxes.
2. **Conversion** – after selecting currencies and amount, it calls `/convert`.

## Architectural Decisions

- **httpResource** – deliberately chosen as an experimental Angular API that exposes built-in `isLoading`, `error`, and `value` signals, keeping view logic minimal. I know that `httpResource` is currently in developer preview, but I saw in the requirements that this approach is acceptable, so I wanted to demonstrate its usage. In the future, switching to the regular `HttpClient` will be straightforward since all HTTP calls are centralized in `CurrencyService`.

- **Smart / Dumb Components** – the root `App` smart component handles state and side effects, while `CurrencyConverterForm` and `ConversionResult` are stateless, presentational dump components.

- **Angular Signals** – state is managed with `signal`, `computed`, and `effect`. The decision to skip `ReactiveFormsModule` was deliberate, as native signal integration for forms is expected in a future Angular release.
