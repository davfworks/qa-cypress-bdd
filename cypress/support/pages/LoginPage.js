// ─────────────────────────────────────────────
// Page Object Model — Página de Login
// URL: /web/index.php/auth/login
// ─────────────────────────────────────────────

class LoginPage {
  // ── Selectores ───────────────────────────────

  get campoUsuario()    { return cy.get('[name="username"]'); }
  get campoPassword()   { return cy.get('[name="password"]'); }
  get botonIngresar()   { return cy.get('[type="submit"]'); }
  get mensajeError()    { return cy.get('.oxd-alert-content-text'); }
  get logoOrangeHRM()   { return cy.get('.orangehrm-login-logo'); }

  // ── Acciones ─────────────────────────────────

  // Navega a la página de login
  visitar() {
    cy.visit('/web/index.php/auth/login');
    this.logoOrangeHRM.should('be.visible');
  }

  // Escribe el usuario
  escribirUsuario(usuario) {
    this.campoUsuario.clear().type(usuario);
  }

  // Escribe el password
  escribirPassword(password) {
    this.campoPassword.clear().type(password);
  }

  // Hace clic en el botón de ingresar
  clickIngresar() {
    this.botonIngresar.click();
  }

  // Hace login completo
  login(usuario, password) {
    this.escribirUsuario(usuario);
    this.escribirPassword(password);
    this.clickIngresar();
  }

  // ── Verificaciones ───────────────────────────

  // Verifica que el login fue exitoso
  verificarLoginExitoso() {
    cy.url().should('include', '/dashboard');
  }

  // Verifica que el login falló
  verificarLoginFallido() {
    this.mensajeError.should('be.visible');
  }

  // Obtiene el texto del mensaje de error
  obtenerMensajeError() {
    return this.mensajeError.invoke('text');
  }
}

export const loginPage = new LoginPage();
