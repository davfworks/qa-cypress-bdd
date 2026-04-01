# ─────────────────────────────────────────────────────────────
# Feature: Gestión de empleados (módulo PIM)
# App: OrangeHRM Demo
# ─────────────────────────────────────────────────────────────

@regression
Feature: Empleados — Gestión en módulo PIM

  Como administrador de RRHH
  Quiero gestionar los empleados en el sistema
  Para mantener actualizado el registro de personal

  Background:
    Given que estoy autenticado como administrador
    And navego al módulo de empleados

  # ── Listado ─────────────────────────────────────────────────

  @critical @smoke
  Scenario: Ver lista de empleados
    Then debo ver la tabla de empleados
    And la tabla debe tener al menos 1 empleado

  @high
  Scenario: Buscar empleado existente
    When busco al empleado "John"
    Then debo ver resultados en la tabla
    And los resultados deben contener "John"

  @high
  Scenario: Buscar empleado inexistente
            When busco al empleado "xkqzwjvbnm99999"
            Then no hay resultados

  # ── Crear empleado ───────────────────────────────────────────

  @critical
  Scenario: Agregar nuevo empleado exitosamente
    When hago clic en agregar empleado
    And completo el nombre "TestNombre" y apellido "TestApellido"
    And guardo el formulario
    Then debo ver el mensaje de guardado exitoso

  # ── Data-driven: agregar múltiples empleados ─────────────────

  @high
  Scenario Outline: Agregar empleados con diferentes nombres
    When hago clic en agregar empleado
    And completo el nombre "<nombre>" y apellido "<apellido>"
    And guardo el formulario
    Then debo ver el mensaje de guardado exitoso

    Examples:
      | nombre   | apellido   |
      | Carlos   | Ramirez    |
      | Maria    | Lopez      |
      | Juan     | Perez      |

  # ── Navegación ───────────────────────────────────────────────

  @low
  Scenario: Navegar al formulario de nuevo empleado
    When hago clic en agregar empleado
    Then la URL debe contener "/pim/addEmployee"
    And debo ver el formulario de nuevo empleado
