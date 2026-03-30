// ─────────────────────────────────────────────
// Page Object Model — Gestión de Empleados (PIM)
// URL: /web/index.php/pim/viewEmployeeList
// ─────────────────────────────────────────────

class EmpleadoPage {
  // ── Selectores ───────────────────────────────

  get botonAgregarEmpleado()  { return cy.get('.oxd-button').contains(' Add '); }
  get campoNombre()           { return cy.get('[name="firstName"]'); }
  get campoApellido()         { return cy.get('[name="lastName"]'); }
  get campoIdEmpleado()       { return cy.get('.--right-col .oxd-input').eq(0); }
  get botonGuardar()          { return cy.get('[type="submit"]').contains('Save'); }
  get mensajeExito()          { return cy.get('.oxd-toast--success'); }
  get tablaEmpleados()        { return cy.get('.oxd-table-body'); }
  get filasTabla()            { return cy.get('.oxd-table-row--with-border'); }
  get campoBusquedaNombre()   { return cy.get('[placeholder="Type for hints..."]').first(); }
  get botonBuscar()           { return cy.get('[type="submit"]').contains('Search'); }
  get botonEliminar()         { return cy.get('.oxd-icon-button').contains('delete'); }
  get botonConfirmarEliminar(){ return cy.get('.oxd-button--label-danger').contains('Yes, Delete'); }

  // ── Acciones ─────────────────────────────────

  // Navega a la lista de empleados
  visitar() {
    cy.visit('/web/index.php/pim/viewEmployeeList');
    cy.esperarCarga();
  }

  // Abre el formulario de nuevo empleado
  clickAgregarEmpleado() {
    this.botonAgregarEmpleado.click();
    cy.url().should('include', '/pim/addEmployee');
  }

  // Completa el formulario de nuevo empleado
  completarFormulario(nombre, apellido) {
    this.campoNombre.clear().type(nombre);
    this.campoApellido.clear().type(apellido);
  }

  // Guarda el empleado
  guardar() {
    this.botonGuardar.click();
    cy.esperarCarga();
  }

  // Busca un empleado por nombre
  buscarPorNombre(nombre) {
    this.campoBusquedaNombre.type(nombre);
    cy.get('.oxd-autocomplete-option').first().click();
    this.botonBuscar.click();
    cy.esperarCarga();
  }

  // ── Verificaciones ───────────────────────────

  // Verifica mensaje de éxito al guardar
  verificarGuardadoExitoso() {
    this.mensajeExito.should('be.visible');
  }

  // Verifica que la tabla tiene resultados
  verificarResultadosEnTabla() {
    this.filasTabla.should('have.length.greaterThan', 0);
  }

  verificarSinResultadosCero() {
    cy.contains('No Records Found').should('be.visible');
  }

// Verifica que la tabla no tiene resultados
  verificarSinResultados() {
    cy.get('.oxd-table-body').should('contain', 'No Records Found');
  }

  // Verifica que un empleado aparece en la tabla
  verificarEmpleadoEnTabla(nombre) {
    this.tablaEmpleados.should('contain', nombre);
  }
}

export const empleadoPage = new EmpleadoPage();
