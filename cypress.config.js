const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    // URL base de OrangeHRM demo
    baseUrl: 'https://opensource-demo.orangehrmlive.com',

    // Dónde están los feature files
    specPattern: 'cypress/e2e/features/**/*.feature',

    // Tiempo máximo de espera para elementos (ms)
    defaultCommandTimeout: 10000,

    // Tiempo máximo por test completo (ms)
    taskTimeout: 60000,

    // Resolución del navegador
    viewportWidth: 1280,
    viewportHeight: 720,

    // Screenshots y videos
    screenshotsFolder: 'cypress/reports/screenshots',
    videosFolder: 'cypress/reports/videos',
    video: true,
    screenshotOnRunFailure: true,

    // Reintentos en CI
    retries: {
      runMode: 2,    // reintentar 2 veces en npm test
      openMode: 0,   // no reintentar en cypress open
    },

    async setupNodeEvents(on, config) {
      // Registra el plugin de Cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // Configura el bundler para procesar los .feature
      on('file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Hook: captura screenshot con nombre descriptivo al fallar
      on('after:screenshot', (details) => {
        console.log(`📸 Screenshot capturado: ${details.path}`);
        return details;
      });

      return config;
    },
  },


  // Variables de entorno del proyecto
  env: {
    // Credenciales de OrangeHRM demo (públicas)
    ADMIN_USER: 'Admin',
    ADMIN_PASSWORD: 'admin123',

    // Configuración del preprocessor de Cucumber
    filterSpecs: true,
    omitFiltered: true,
  },
});
