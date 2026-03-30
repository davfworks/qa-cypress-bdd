// ─────────────────────────────────────────────
// Comandos personalizados de Cypress
// Reutilizables en todos los tests del proyecto
// ─────────────────────────────────────────────

/**
 * Login en OrangeHRM
 * Uso: cy.login('Admin', 'admin123')
 */
Cypress.Commands.add('login', (usuario, password) => {
  cy.visit('/web/index.php/auth/login');

  // Espera a que el formulario esté visible
  cy.get('[name="username"]').should('be.visible').clear().type(usuario);
  cy.get('[name="password"]').should('be.visible').clear().type(password);
  cy.get('[type="submit"]').click();

  // Verifica que el login fue exitoso esperando el dashboard
  cy.url().should('include', '/dashboard');
  cy.get('.oxd-topbar-header-breadcrumb').should('be.visible');
});

/**
 * Login rápido usando las credenciales del entorno
 * Uso: cy.loginComoAdmin()
 */
Cypress.Commands.add('loginComoAdmin', () => {
  cy.login(
    Cypress.env('ADMIN_USER'),
    Cypress.env('ADMIN_PASSWORD')
  );
});

/**
 * Navega a una sección del menú lateral
 * Uso: cy.irASeccion('PIM')
 */
Cypress.Commands.add('irASeccion', (seccion) => {
  cy.get('.oxd-main-menu-item')
    .contains(seccion)
    .click();
  cy.get('.oxd-topbar-header-breadcrumb').should('contain', seccion);
});

/**
 * Verifica que aparece un mensaje de éxito (toast)
 * Uso: cy.verificarMensajeExito('Successfully Saved')
 */
Cypress.Commands.add('verificarMensajeExito', (mensaje) => {
  cy.get('.oxd-toast--success', { timeout: 8000 })
    .should('be.visible')
    .and('contain', mensaje);
});

/**
 * Verifica que aparece un mensaje de error
 * Uso: cy.verificarMensajeError('Invalid credentials')
 */
Cypress.Commands.add('verificarMensajeError', (mensaje) => {
  cy.get('body').then(($body) => {

    // Caso 1: error de credenciales (login)
    if ($body.find('.oxd-alert-content-text').length) {
      cy.get('.oxd-alert-content-text', { timeout: 8000 })
        .should('be.visible')
        .and('contain', mensaje);

    // Caso 2: error de validación (inputs)
    } else if ($body.find('.oxd-input-field-error-message').length) {
      cy.get('.oxd-input-field-error-message')
        .should('be.visible')
        .and('contain', mensaje);

    } else {
      throw new Error('No se encontró ningún mensaje de error en pantalla');
    }

  });
});

/**
 * Espera a que el spinner de carga desaparezca
 * Uso: cy.esperarCarga()
 */
Cypress.Commands.add('esperarCarga', () => {
  cy.get('.oxd-loading-spinner', { timeout: 10000 }).should('not.exist');
});

/**
 * Busca un empleado en la lista por nombre
 * Uso: cy.buscarEmpleado('John Smith')
 */
Cypress.Commands.add('buscarEmpleado', (nombre) => {
  cy.get('[placeholder="Type for hints..."]').first().type(nombre);
  cy.get('.oxd-autocomplete-option').first().click();
  cy.get('[type="submit"]').contains('Search').click();
  cy.esperarCarga();
});
