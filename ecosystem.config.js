module.exports = {
  apps: [
    {
      name: 'heatingology',
      script: 'yarn',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'heatingology-db',
      script: 'yarn',
      args: 'verify:db',
      env: {
        NODE_ENV: 'production',
        PORT: 5555,
      },
    }
  ],
};
