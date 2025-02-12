module.exports = {
    apps : [{
      name   : "pintos-nextjs",
      exec_mode: 'cluster',
      instances: 1,
      script : "pnpm",
      args: 'start'
    }]
  }