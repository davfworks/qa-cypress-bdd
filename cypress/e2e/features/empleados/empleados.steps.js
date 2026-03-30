// ─────────────────────────────────────────────
// Steps — Empleados
// Implementación de los pasos del empleados.feature
// ─────────────────────────────────────────────

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { empleadoPage } from '../../../support/pages/EmpleadoPage';
import "../login/login.steps";
// ── Given ────────────────────────────────────

// Navega al módulo de empleados (PIM)
Given('navego al módulo de empleados', () => {
  empleadoPage.visitar();
});

// ── When ─────────────────────────────────────

// Busca un empleado por nombre
When('busco al empleado {string}', (nombre) => {
  empleadoPage.buscarPorNombre(nombre);
});

// Hace clic en agregar empleado
When('hago clic en agregar empleado', () => {
  empleadoPage.clickAgregarEmpleado();
});

// Completa el formulario con nombre y apellido
When('completo el nombre {string} y apellido {string}', (nombre, apellido) => {
  empleadoPage.completarFormulario(nombre, apellido);
});

// Guarda el formulario
When('guardo el formulario', () => {
  empleadoPage.guardar();
});

// ── Then ─────────────────────────────────────

// Verifica que la tabla de empleados está visible
Then('debo ver la tabla de empleados', () => {
  empleadoPage.tablaEmpleados.should('be.visible');
});

// Verifica que hay al menos 1 empleado en la tabla
Then('la tabla debe tener al menos {int} empleado', (cantidad) => {
  empleadoPage.filasTabla.should('have.length.gte', cantidad);
});

// Verifica que hay resultados en la tabla
Then('debo ver resultados en la tabla', () => {
  empleadoPage.verificarResultadosEnTabla();
});

// Verifica que los resultados contienen el texto buscado
Then('los resultados deben contener {string}', (texto) => {
  empleadoPage.verificarEmpleadoEnTabla(texto);
});

// Verifica mensaje de sin resultados
Then('debo ver el mensaje {string}', (mensaje) => {
  cy.get('.oxd-table-body').should('contain', mensaje);
});

// Validar null
Then('no hay resultados', () => {
  empleadoPage.verificarSinResultadosCero();
});

// Verifica mensaje de guardado exitoso
Then('debo ver el mensaje de guardado exitoso', () => {
  empleadoPage.verificarGuardadoExitoso();
});

// Verifica la URL del formulario de nuevo empleado
Then('la URL debe contener {string}', (url) => {
  cy.url().should('include', url);
});

// Verifica que el formulario de nuevo empleado está visible
Then('debo ver el formulario de nuevo empleado', () => {
  cy.get('[name="firstName"]').should('be.visible');
  cy.get('[name="lastName"]').should('be.visible');
});
