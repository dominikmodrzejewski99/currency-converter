export class CurrencyConverterPage {
  visit() {
    cy.visit('/');
  }

  selectFromCurrency(currency: string) {
    cy.get('[data-cy=from-currency]').click();
    cy.get(`[data-cy=option-${currency}]`).click();
  }

  selectToCurrency(currency: string) {
    cy.get('[data-cy=to-currency]').click();
    cy.get(`[data-cy=option-${currency}]`).click();
  }

  enterAmount(amount: string) {
    cy.get('[data-cy=amount]').clear().type(amount);
  }

  getResult() {
    return cy.get('[data-cy=conversion-result]');
  }
}
