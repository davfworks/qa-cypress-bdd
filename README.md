# 🌲 QA Cypress BDD — Cypress + Cucumber

[![Cypress Tests](https://github.com/davfworks/qa-cypress-bdd-portfolio/actions/workflows/cypress.yml/badge.svg)](https://github.com/davfworks/qa-cypress-bdd-portfolio/actions/workflows/cypress.yml)
[![Cypress](https://img.shields.io/badge/Cypress-13.x-04C38E?logo=cypress&logoColor=white)](https://cypress.io/)

Framework BDD con **Cypress + Cucumber** sobre [OrangeHRM](https://opensource-demo.orangehrmlive.com) — sistema de RRHH.

---

## Estructura

```
qa-cypress-bdd-portfolio/
├── .github/workflows/cypress.yml        # CI/CD pipeline
├── cypress/
│   ├── e2e/features/                    # Feature files + Steps
│   │   ├── login.feature
│   │   ├── login/login.steps.js
│   │   ├── empleados.feature
│   │   └── empleados/empleados.steps.js
│   └── support/
│       ├── pages/                       # Page Object Models
│       │   ├── LoginPage.js
│       │   ├── DashboardPage.js
│       │   └── EmpleadoPage.js
│       ├── commands.js                  # Comandos personalizados
│       └── e2e.js                       # Hooks globales + screenshots
└── cypress.config.js                    # Configuración principal
```

---

## Setup

```bash
# 1. Instalar dependencias
npm install

# 2. Instalar Cypress
npx cypress install

# 3. Correr tests
npm run test:critical     # solo tests críticos
npm run test:smoke        # tests de humo
npm run test:regression   # suite completa
npm run test:open         # abrir Cypress UI
```

## Tags disponibles

| Tag | Descripción |
|-----|-------------|
| `@critical` | Flujos que no pueden fallar nunca |
| `@high` | Alta prioridad |
| `@low` | Baja prioridad |
| `@smoke` | Verificación rápida |
| `@regression` | Suite completa |
```
## License

Libre como @AlexDavid

---

<div align="center">
  <sub>Vamos a conquistar el mundo ❤️ AAD</sub>
</div>