// ─────────────────────────────────────────────
// Steps — Login
// Implementación de los pasos del login.feature
// ─────────────────────────────────────────────

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { loginPage } from '../../../support/pages/LoginPage';
import { dashboardPage } from '../../../support/pages/DashboardPage';


// ── Given ────────────────────────────────────

// Navega a la página de login
Given('que estoy en la página de login', () => {
  loginPage.visitar();
});

// Login completo como admin usando el comando personalizado
Given('que estoy autenticado como administrador', () => {
  cy.loginComoAdmin();
});

// ── When ─────────────────────────────────────

// Escribe las credenciales en el formulario
When('ingreso el usuario {string} y la contraseña {string}', (usuario, password) => {
  loginPage.escribirUsuario(usuario);
  loginPage.escribirPassword(password);
});

// Hace clic en el botón de ingresar
When('hago clic en el botón de ingresar', () => {
  loginPage.clickIngresar();
});

// Intenta ingresar sin completar datos
When('hago clic en el botón de ingresar sin completar datos', () => {
  loginPage.clickIngresar();
});

// Verifica que está en el dashboard
When('estoy en el dashboard', () => {
  dashboardPage.verificarEnDashboard();
});

// Hace logout
When('hago logout', () => {
  dashboardPage.logout();
});

// ── Then ─────────────────────────────────────

// Verifica redirección al dashboard
Then('debo ser redirigido al dashboard', () => {
  dashboardPage.verificarEnDashboard();
});

// Verifica que el menú lateral está visible
Then('debo ver el menú lateral de navegación', () => {
  cy.get('.oxd-main-menu').should('be.visible');
});

// Verifica los widgets del dashboard
Then('debo ver los widgets del dashboard', () => {
  dashboardPage.verificarWidgetsVisibles();
});

// Verifica mensaje de error de credenciales
Then('debo ver un mensaje de error de credenciales inválidas', () => {
  loginPage.verificarLoginFallido();
  loginPage.obtenerMensajeError().should('contain', 'Invalid credentials');
});

// Verifica que permanece en login
Then('debo permanecer en la página de login', () => {
  cy.url().should('include', '/auth/login');
});

// Verifica mensajes de validación de campos requeridos
Then('debo ver mensajes de validación de campos requeridos', () => {
  cy.get('.oxd-input-field-error-message')
    .should('be.visible')
    .and('contain', 'Required');
});

// Verifica que el campo password es tipo password
Then('el campo de contraseña debe ser de tipo password', () => {
  loginPage.campoPassword.should('have.attr', 'type', 'password');
});

// Verifica redirección a login después del logout
Then('debo ser redirigido a la página de login', () => {
  cy.url().should('include', '/auth/login');
  loginPage.logoOrangeHRM.should('be.visible');
});

// Verifica que no se puede acceder al dashboard sin login
Then('no debo poder acceder al dashboard sin login', () => {
  cy.visit('/web/index.php/dashboard/index');
  cy.url().should('include', '/auth/login');
});
