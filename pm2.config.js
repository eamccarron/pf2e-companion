module.exports = {
  apps: [
    {
      name: 'dashboard',
      script: 'npx',
      args: 'nx serve apps/dashboard',
      exec_mode: 'fork',
      watch: false,
    },
    {
      name: 'compendium-api',
      script: 'npx',
      args: 'nx serve apps/compendium-api',
      exec_mode: 'fork',
      watch: false,
    },
    {
      name: 'db',
      script: 'docker compose up db',
      exec_mode: 'fork',
      watch: false,
    },
  ],
};
