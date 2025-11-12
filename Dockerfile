# ===================================
# 第一阶段：构建阶段
# ===================================
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 lock 文件
COPY package*.json ./

# 安装所有依赖（包括 devDependencies，用于构建）
RUN npm ci

# 复制源代码和配置文件
COPY . .

# 构建 TypeScript 项目
RUN npm run build

# ===================================
# 第二阶段：生产运行阶段（使用 PM2）
# ===================================
FROM node:20-alpine AS production

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 lock 文件
COPY package*.json ./

# 安装生产环境依赖（包含 PM2）
RUN npm ci --only=production && \
    npm cache clean --force

# 从构建阶段复制编译后的代码
COPY --from=builder /app/dist ./dist

# 复制 PM2 配置文件
COPY ecosystem.config.cjs ./

# 创建日志目录
RUN mkdir -p logs

# 创建非 root 用户运行应用（安全最佳实践）
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# 切换到非 root 用户
USER nodejs

# 暴露端口
EXPOSE 8871

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=8871

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8871/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# 使用 PM2 runtime 启动应用（适合容器环境）
CMD ["npx", "pm2-runtime", "start", "ecosystem.config.cjs", "--env", "production"]
