# 飞行棋游戏模拟器

这是一个用于测试在线飞行棋游戏的机器人模拟器。它可以创建多个虚拟玩家，自动进行游戏测试。

## 功能特性

🤖 **智能机器人**: 自动加入房间、投掷骰子、移动棋子、完成任务
🎮 **多种游戏模式**: 支持飞行棋、转盘、扫雷对战
👥 **多玩家支持**: 支持2-4个玩家同时游戏
🏠 **灵活房间管理**: 支持创建新房间或加入现有房间
🎯 **自动化测试**: 无需人工干预，全自动游戏流程
📊 **实时监控**: 实时显示游戏状态和玩家信息
⚙️ **灵活配置**: 可配置游戏参数和机器人行为

## 安装依赖

```bash
cd server
npm install socket.io-client
```

## 🐳 Docker 部署

### 前置要求
- 安装 [Docker](https://www.docker.com/get-started)
- 安装 [Docker Compose](https://docs.docker.com/compose/install/) (可选，用于一键部署)

### 方式 1: 使用 Docker Compose（推荐）

#### 快速启动
```bash
# 构建并启动服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

#### 重新构建镜像
```bash
# 重新构建并启动
docker-compose up -d --build

# 或者先停止，再重新构建并启动
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### 方式 2: 使用 Docker 命令

#### 构建镜像
```bash
# 构建生产镜像
docker build -t coupon-game-server:latest .

# 构建并指定标签
docker build -t coupon-game-server:1.0.0 .
```

#### 运行容器
```bash
# 基本运行
docker run -d \
  --name coupon-game-server \
  -p 8871:8871 \
  coupon-game-server:latest

# 使用环境变量运行
docker run -d \
  --name coupon-game-server \
  -p 8871:8871 \
  -e NODE_ENV=production \
  -e PORT=8871 \
  coupon-game-server:latest

# 使用 .env 文件运行
docker run -d \
  --name coupon-game-server \
  -p 8871:8871 \
  --env-file .env \
  coupon-game-server:latest
```

#### 容器管理
```bash
# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 查看容器日志
docker logs -f coupon-game-server

# 进入容器
docker exec -it coupon-game-server sh

# 停止容器
docker stop coupon-game-server

# 启动容器
docker start coupon-game-server

# 重启容器
docker restart coupon-game-server

# 删除容器
docker rm coupon-game-server

# 删除镜像
docker rmi coupon-game-server:latest
```

### 镜像特性

✨ **多阶段构建**: 分离构建和运行环境，减小镜像体积
🔒 **安全性**: 使用非 root 用户运行应用
💚 **健康检查**: 内置健康检查机制，自动监控服务状态
📦 **轻量级**: 基于 Alpine Linux，镜像体积小
🚀 **生产就绪**: 包含资源限制、日志管理等生产环境最佳实践
🔄 **PM2 集成**: 使用 PM2 runtime 进行进程管理，提供自动重启和日志管理

### PM2 特性（生产环境）

🔄 **自动重启**: 应用崩溃时自动重启
📊 **负载均衡**: 支持 cluster 模式，充分利用多核 CPU
📝 **日志管理**: 自动管理日志文件，防止磁盘空间耗尽
💾 **内存监控**: 超过内存限制自动重启，防止内存泄漏
⚡ **零停机重启**: 使用 `pm2 reload` 实现零停机更新
🎯 **进程监控**: 实时监控 CPU、内存使用情况
📈 **性能指标**: 提供详细的性能统计和监控

### 日志文件位置

PM2 会自动将日志写入 `logs/` 目录：
- `logs/out.log` - 标准输出日志
- `logs/error.log` - 错误日志
- `logs/combined.log` - 合并日志

在 Docker 环境中，日志会通过卷挂载持久化到主机的 `./logs` 目录。

### 环境变量配置

可以通过以下方式配置环境变量：

1. **docker-compose.yml** 中的 `environment` 部分
2. 创建 `.env` 文件并在 `docker-compose.yml` 中使用 `env_file`
3. Docker 运行时使用 `-e` 参数

常用环境变量：
- `NODE_ENV`: 运行环境（默认: production）
- `PORT`: 服务端口（默认: 8871）

### 监控和调试

```bash
# 查看容器资源使用情况
docker stats coupon-game-server

# 查看容器详细信息
docker inspect coupon-game-server

# 查看容器健康检查状态
docker inspect --format='{{json .State.Health}}' coupon-game-server | jq

# 实时查看日志
docker-compose logs -f --tail=100
```

### 故障排除

#### 端口已被占用
```bash
# 查看端口占用情况
lsof -i :8871

# 或使用不同的端口
docker run -d -p 3002:8871 coupon-game-server:latest
```

#### 容器无法启动
```bash
# 查看详细错误日志
docker logs coupon-game-server

# 检查容器状态
docker inspect coupon-game-server
```

#### 重新构建镜像
```bash
# 清理缓存并重新构建
docker-compose build --no-cache
docker-compose up -d
```

## 使用方法

### 方式 1: 直接运行（开发环境）

#### 启动游戏服务器

首先需要启动游戏服务器：

```bash
# 开发模式（支持热重载）
npm run dev

# 或者先构建再运行
npm run build
npm start
```

服务器将在 http://localhost:8871 上运行。

### 方式 2: 使用 PM2（生产环境推荐）

PM2 是一个强大的进程管理器，提供自动重启、负载均衡、日志管理等功能。

#### 安装依赖
```bash
npm install
```

#### 构建项目
```bash
npm run build
```

#### 使用 PM2 启动
```bash
# 开发环境启动
npm run pm2:start

# 生产环境启动
npm run pm2:start:prod

# 查看运行状态
npm run pm2:status

# 查看日志
npm run pm2:logs

# 实时监控
npm run pm2:monit
```

#### PM2 管理命令
```bash
# 重启服务
npm run pm2:restart

# 重载服务（零停机重启）
npm run pm2:reload

# 停止服务
npm run pm2:stop

# 删除服务
npm run pm2:delete
```

#### 高级 PM2 命令
```bash
# 查看详细信息
pm2 show coupon-game-server

# 查看实时日志
pm2 logs coupon-game-server --lines 100

# 清空日志
pm2 flush

# 保存当前进程列表
pm2 save

# 设置开机自启动
pm2 startup
pm2 save

# 更新 PM2
pm2 update
```

### 方式 3: 使用 Docker（推荐部署方式）

Docker 方式详见上面的 [🐳 Docker 部署](#-docker-部署) 章节。

## 机器人模拟器使用

### 交互式命令行模式（推荐）

```bash
node simulator-cli.js
```

启动后，输入 `help` 查看所有可用命令：

```
> help
```

#### 快速启动模式

```bash
# 快速启动2人飞行棋游戏
node simulator-cli.js --quick

# 启动3人游戏
node simulator-cli.js --players 3

# 启动转盘游戏
node simulator-cli.js --type wheel

# 启动4人扫雷对战
node simulator-cli.js --players 4 --type minesweeper

# 加入现有房间（1个机器人）
node simulator-cli.js --join ABC123

# 加入现有房间（2个机器人）
node simulator-cli.js --join ABC123 --bots 2
```

## 命令参考

### 基本操作
- `start [players] [type]` - 创建房间并开始游戏模拟
- `join <roomId> [players]` - 加入指定房间（默认1个机器人）
- `stop` - 停止游戏模拟
- `status` - 显示当前状态
- `config` - 显示配置信息

### 机器人管理
- `add-bot [name]` - 添加机器人到当前游戏
- `remove-bot <name>` - 移除指定机器人
- `auto-on` - 启用所有机器人自动游戏
- `auto-off` - 禁用所有机器人自动游戏

### 退出
- `quit` 或 `exit` - 退出程序

## 使用示例

### 示例1: 创建房间测试

```bash
> start 2 fly
🚀 开始游戏模拟: 2个玩家, 游戏类型: fly
✅ 游戏模拟启动成功!
🏠 房间ID: ABC123
```

### 示例2: 加入现有房间

```bash
> join ABC123 1
🚪 加入房间: ABC123, 机器人数量: 1
✅ 成功加入房间!
🏠 房间ID: ABC123
🤖 机器人数量: 1
```

### 示例3: 查看游戏状态

```bash
> status
📊 当前状态:
🎯 模式: 加入房间
🏠 房间ID: ABC123
🤖 机器人数量: 3
🎮 游戏类型: fly

机器人列表:
  1. 🟢 Bot_Player_1 🎯 (socket_id_1)
  2. 🟢 Bot_Player_2 ⏳ (socket_id_2)
  3. 🟢 NewBot ⏳ (socket_id_3)
```

### 示例4: 动态添加机器人

```bash
> start 2
> add-bot SuperBot
✅ 机器人 SuperBot 已添加到游戏

> status
🤖 机器人数量: 3
```

### 示例3: 控制自动游戏

```bash
> auto-off
✅ 所有机器人自动游戏已禁用

> auto-on
✅ 所有机器人自动游戏已启用
```

## 机器人行为

机器人玩家具有以下智能行为：

1. **自动连接**: 自动连接到游戏服务器
2. **自动加入**: 自动创建或加入游戏房间
3. **智能投掷**: 在轮到自己时自动投掷骰子
4. **自动移动**: 根据骰子结果自动移动棋子
5. **任务处理**: 自动完成触发的任务（70%成功率）
6. **错误恢复**: 自动处理网络错误和重连

## 配置选项

### 游戏配置
- `playersCount`: 玩家数量 (2-4)
- `gameType`: 游戏类型 ('fly', 'wheel', 'minesweeper')
- `taskSetId`: 任务集ID (默认: 'default')
- `autoStart`: 是否自动开始游戏
- `roomName`: 房间名称

### 机器人配置
- `diceDelay`: 投掷骰子延迟 (1.5-2.5秒)
- `taskDelay`: 任务完成延迟 (1-1.5秒)
- `autoPlay`: 是否自动游戏

## 故障排除

### 连接失败
```bash
❌ Bot_Player_1 连接失败: connect ECONNREFUSED
```
**解决方案**: 确保游戏服务器已启动并运行在正确端口。

### 房间创建失败
```bash
❌ 房间创建失败: Server error
```
**解决方案**: 检查服务器日志，确保服务器正常运行。

### 机器人无响应
```bash
⏳ Bot_Player_1 不是自己的回合或游戏未开始
```
**解决方案**: 这是正常现象，机器人会等待轮到自己的回合。

## 开发和调试

### 启用详细日志

机器人会自动输出详细的操作日志，包括：
- 连接状态
- 房间事件
- 游戏动作
- 错误信息

### 自定义机器人行为

可以修改 `bot-player.js` 中的参数来调整机器人行为：

```javascript
// 修改投掷延迟
diceDelay: 3000, // 3秒延迟

// 修改任务成功率
completeTask(taskId, Math.random() > 0.5); // 50% 成功率
```

## API 参考

### BotPlayer 类

主要方法：
- `connect()` - 连接到服务器
- `createRoom(roomName, maxPlayers, taskSetId, gameType)` - 创建房间
- `joinRoom(roomId)` - 加入房间
- `startGame()` - 开始游戏
- `rollDice()` - 投掷骰子
- `completeTask(taskId, completed)` - 完成任务
- `disconnect()` - 断开连接

### GameSimulator 类

主要方法：
- `createBots(count)` - 创建机器人
- `startSimulation()` - 开始模拟
- `stopSimulation()` - 停止模拟
- `addBot(botName)` - 添加机器人
- `removeBot(botName)` - 移除机器人
- `setAutoPlay(enabled)` - 设置自动游戏

## 注意事项

1. **服务器依赖**: 确保游戏服务器在运行模拟器之前已启动
2. **网络连接**: 机器人需要稳定的网络连接到服务器
3. **资源使用**: 每个机器人会占用一个Socket连接
4. **游戏规则**: 机器人遵循与真实玩家相同的游戏规则

## 技术支持

如果遇到问题，请检查：
1. 服务器是否正常运行
2. 网络连接是否稳定
3. Node.js版本是否兼容
4. 依赖包是否正确安装

---

Happy Gaming! 🎮