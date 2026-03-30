// ─────────────────────────────────────────────
// Archivo de soporte global de Cypress
// Se carga automáticamente antes de cada test
// ─────────────────────────────────────────────

import './commands';

// ── Hook global: antes de cada test ──────────

beforeEach(() => {
  // Limpia cookies y storage entre tests para evitar contaminación
  cy.clearCookies();
  cy.clearLocalStorage();
});

// ── Hook global: después de cada test ────────

afterEach(function () {
  // Si el test falló — captura screenshot con nombre descriptivo
  if (this.currentTest?.state === 'failed') {
    const nombreTest = this.currentTest.fullTitle()
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '')
      .substring(0, 100);

    cy.screenshot(`FALLO_${nombreTest}`, {
      capture: 'fullPage',    // captura la página completa
      overwrite: true,
    });

    cy.log(`❌ Test fallido: ${this.currentTest.fullTitle()}`);
  }
});

// ── Manejo global de errores no capturados ────

Cypress.on('uncaught:exception', (err) => {
  // OrangeHRM lanza algunos errores de JS internos que no afectan los tests
  // Los ignoramos para que no rompan los escenarios
  if (err.message.includes('ResizeObserver') ||
      err.message.includes('Cannot read properties of undefined')) {
    return false;
  }
  return true;
});
