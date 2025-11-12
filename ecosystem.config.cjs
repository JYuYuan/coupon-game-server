/**
 * PM2 配置文件
 * 使用 .cjs 扩展名是因为项目使用 ES Module
 *
 * 使用方法:
 *   pm2 start ecosystem.config.cjs
 *   pm2 start ecosystem.config.cjs --env production
 */

module.exports = {
  apps: [
    {
      // 应用名称
      name: 'coupon-game-server',

      // 启动脚本
      script: './dist/index.js',

      // 启动模式: fork 或 cluster
      // cluster 模式会启动多个实例，利用多核 CPU
      exec_mode: 'cluster',

      // 实例数量
      // 0 或 'max' 表示使用所有 CPU 核心
      instances: 1,

      // 自动重启配置
      autorestart: true,

      // 监听文件变化并自动重启（仅用于开发环境）
      watch: false,

      // 内存限制，超过后自动重启
      max_memory_restart: '500M',

      // 环境变量
      env: {
        NODE_ENV: 'development',
        PORT: 8871,
      },

      // 生产环境变量
      env_production: {
        NODE_ENV: 'production',
        PORT: 8871,
      },

      // 日志配置
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',

      // 合并日志
      merge_logs: true,

      // 日志文件最大大小（字节）
      // max_size: '10M',

      // 保留的日志文件数量
      // retain: 5,

      // 时间配置
      time: true,

      // 优雅关闭超时时间（毫秒）
      kill_timeout: 5000,

      // 等待应用就绪的超时时间（毫秒）
      listen_timeout: 10000,

      // 自动重启之间的延迟（毫秒）
      restart_delay: 4000,

      // 异常重启配置
      min_uptime: '10s',
      max_restarts: 10,

      // 启动参数
      node_args: '--max-old-space-size=512',

      // 高级配置
      // 在启动前执行的脚本
      // pre_start: 'npm run build',

      // 在停止后执行的脚本
      // post_stop: 'echo "App stopped"',

      // cron 重启（每天凌晨 3 点重启，可选）
      // cron_restart: '0 3 * * *',

      // 是否自动重启 cron
      // autorestart_cron: true,
    },
  ],

  // 部署配置（可选）
  deploy: {
    production: {
      user: 'node',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:your/repo.git',
      path: '/var/www/coupon-game-server',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.cjs --env production',
    },
  },
};
