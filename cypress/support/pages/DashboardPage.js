// ─────────────────────────────────────────────
// Page Object Model — Dashboard
// URL: /web/index.php/dashboard/index
// ─────────────────────────────────────────────

class DashboardPage {
  // ── Selectores ───────────────────────────────

  get tituloBienvenida()  { return cy.get('.oxd-topbar-header-breadcrumb'); }
  get menuLateral()       { return cy.get('.oxd-main-menu'); }
  get nombreUsuario()     { return cy.get('.oxd-userdropdown-name'); }
  get botonUsuario()      { return cy.get('.oxd-userdropdown'); }
  get opcionLogout()      { return cy.get('.oxd-userdropdown-link').contains('Logout'); }
  get widgetsDashboard()  { return cy.get('.orangehrm-dashboard-widget'); }

  // ── Acciones ─────────────────────────────────

  // Navega a una sección del menú
  irASeccion(seccion) {
    this.menuLateral
      .contains(seccion)
      .click();
  }

  // Hace logout
  logout() {
    this.botonUsuario.click();
    this.opcionLogout.click();
    cy.url().should('include', '/auth/login');
  }

  // ── Verificaciones ───────────────────────────

  // Verifica que está en el dashboard
  verificarEnDashboard() {
    cy.url().should('include', '/dashboard');
    this.tituloBienvenida.should('be.visible');
  }

  // Verifica el nombre del usuario logueado
  verificarNombreUsuario(nombre) {
    this.nombreUsuario.should('contain', nombre);
  }

  // Verifica que los widgets del dashboard están visibles
  verificarWidgetsVisibles() {
    this.widgetsDashboard.should('have.length.greaterThan', 0);
  }
}

export const dashboardPage = new DashboardPage();
