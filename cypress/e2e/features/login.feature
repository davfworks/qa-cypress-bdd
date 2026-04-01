# ─────────────────────────────────────────────────────────────
# Feature: Autenticación de usuarios
# App: OrangeHRM Demo
# URL: https://opensource-demo.orangehrmlive.com
# ─────────────────────────────────────────────────────────────

@regression
Feature: Login — Autenticación de usuarios

  Como administrador del sistema de RRHH
  Quiero poder autenticarme en OrangeHRM
  Para acceder a las funcionalidades del sistema

  # ── Login exitoso ───────────────────────────────────────────

  @critical @smoke
  Scenario: Login exitoso con credenciales válidas
    Given que estoy en la página de login
    When ingreso el usuario "Admin" y la contraseña "admin123"
    And hago clic en el botón de ingresar
    Then debo ser redirigido al dashboard
    And debo ver el menú lateral de navegación

  @critical
  Scenario: El dashboard muestra los widgets correctamente
    Given que estoy autenticado como administrador
    When estoy en el dashboard
    Then debo ver los widgets del dashboard

  # ── Login fallido ───────────────────────────────────────────

  @high
  Scenario: Login fallido con contraseña incorrecta
    Given que estoy en la página de login
    When ingreso el usuario "Admin" y la contraseña "password_incorrecto"
    And hago clic en el botón de ingresar
    Then debo ver un mensaje de error de credenciales inválidas
    And debo permanecer en la página de login

  @high
  Scenario: Login fallido con usuario inexistente
    Given que estoy en la página de login
    When ingreso el usuario "usuario_falso" y la contraseña "admin123"
    And hago clic en el botón de ingresar
    Then debo ver un mensaje de error de credenciales inválidas

  @high
  Scenario: Login fallido con campos vacíos
    Given que estoy en la página de login
    When hago clic en el botón de ingresar sin completar datos
    Then debo ver mensajes de validación de campos requeridos

  # ── Data-driven: múltiples credenciales inválidas ──────────

  @high
  Scenario Outline: Login fallido con diferentes credenciales inválidas
    Given que estoy en la página de login
    When ingreso el usuario "<usuario>" y la contraseña "<password>"
    And hago clic en el botón de ingresar
    Then debo ver un mensaje de error de credenciales inválidas

    Examples:
      | usuario       | password         |
      | Admin         | wrongpasswordq    |
      | wronguser     | admin123q        |
      | admin         | Admin123q         |
      | ADMIN         | admin123q         |

  # ── Seguridad ───────────────────────────────────────────────

  @low
  Scenario: El campo de contraseña oculta el texto
    Given que estoy en la página de login
    Then el campo de contraseña debe ser de tipo password

  @low
  Scenario: Logout cierra la sesión correctamente
    Given que estoy autenticado como administrador
    When hago logout
    Then debo ser redirigido a la página de login
    And no debo poder acceder al dashboard sin login
