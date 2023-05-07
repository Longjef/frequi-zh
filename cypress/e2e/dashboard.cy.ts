import { setLoginInfo, defaultMocks } from './helpers';

function tradeMocks() {
  cy.intercept('GET', '**/api/v1/status', { fixture: 'status_empty.json' }).as('Status');
  cy.intercept('GET', '**/api/v1/profit', { fixture: 'profit.json' }).as('Profit');
  cy.intercept('GET', '**/api/v1/trades*', { fixture: 'trades.json' }).as('Trades');
  cy.intercept('GET', '**/api/v1/balance', { fixture: 'balance.json' }).as('Balance');
  cy.intercept('GET', '**/api/v1/whitelist', { fixture: 'whitelist.json' }).as('Whitelist');
  cy.intercept('GET', '**/api/v1/blacklist', { fixture: 'blacklist.json' }).as('Blacklist');
  cy.intercept('GET', '**/api/v1/locks', { fixture: 'locks_empty.json' }).as('Locks');
  cy.intercept('GET', '**/api/v1/performance', { fixture: 'performance.json' }).as('Performance');
  // TODO: Daily mock is missing.
  // cy.intercept('GET', '**/api/v1/daily', { fixture: 'performance.json' }).as('Performance');
}

describe('Dashboard', () => {
  it('Dashboard view', () => {
    defaultMocks();
    tradeMocks();
    setLoginInfo();

    cy.visit('/dashboard');
    cy.wait('@Ping');
    cy.wait('@Status');
    cy.wait('@Profit');
    cy.wait('@Balance');
    cy.wait('@Trades');
    cy.wait('@Whitelist');
    cy.wait('@Blacklist');
    cy.wait('@Locks');
    cy.wait('@Performance');
    cy.get('.drag-header').contains('机器人对比').should('be.visible');
    cy.get('.drag-header').contains('日收益').should('be.visible');
    cy.get('.drag-header').contains('当前委托').should('be.visible');
    cy.get('.drag-header').contains('累计收益').should('be.visible');

    // Assert Botcomparison content
    cy.get('span').contains('TestBot').should('be.visible');
    cy.get('span').contains('统计').should('be.visible');
    // Scroll lower
    cy.get('.drag-header').contains('成交记录').scrollIntoView();
    cy.get('.drag-header').contains('成交记录').should('be.visible');
    cy.get('.drag-header').contains('收益分布').should('be.visible');
    cy.get('.drag-header').contains('日志').should('be.visible');
  });
});
