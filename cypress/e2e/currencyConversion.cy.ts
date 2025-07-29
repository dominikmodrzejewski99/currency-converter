import { CurrencyConverterPage } from '../support/pageObjects/CurrencyConverterPage';

describe('Basic Currency Conversion Test with POM', () => {
  const converterPage = new CurrencyConverterPage();

  beforeEach(() => {
    converterPage.visit();
  });

  it('should calculate the currency conversion', () => {
    cy.intercept('GET', '**/convert*', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          response: {
            amount: 100,
            from: 'THB',
            to: 'EUR',
            value: 89.75
          }
        }
      })
    }).as('getConversion');

    converterPage.selectFromCurrency('THB');
    converterPage.selectToCurrency('EUR');

    converterPage.enterAmount('100');

    cy.wait('@getConversion').then((interception) => {
      const expected = interception.response?.body.response.value;
      converterPage.getResult().should('contain', expected);
      
      cy.log('Currency conversion displayed correctly');
    });
  });
});
