import redis from './redisClient.js';
import { getRandomColor } from '../utils/index.js';
class PlayerManager {
    hashKey = 'players';
    async addPlayer(socketId, { playerId, roomId, name, isHost, ...rest }) {
        const player = {
            id: playerId, // 一律用 id
            socketId,
            roomId: roomId || null,
            name,
            color: getRandomColor(),
            isHost: !!isHost,
            isConnected: true,
            joinedAt: Date.now(), // 存时间戳
            lastSeen: Date.now(),
            position: 0, // 统一初始化位置
            score: 0, // 统一初始化分数
            playerId, // 为了兼容性
            ...rest,
        };
        await redis.hset(this.hashKey, player.id, JSON.stringify(player));
        return player;
    }
    async updatePlayer(player) {
        if (!player.id)
            throw new Error('player.id 缺失');
        player.lastSeen = Date.now();
        await redis.hset(this.hashKey, player.id, JSON.stringify(player));
        return player;
    }
    async getPlayer(playerId) {
        const data = await redis.hget(this.hashKey, playerId);
        return data ? JSON.parse(data) : null;
    }
    async getAllPlayers() {
        const players = await redis.hgetall(this.hashKey);
        return Object.values(players).map((v) => JSON.parse(v));
    }
    async removePlayer(playerId) {
        await redis.hdel(this.hashKey, playerId);
    }
    async clearAll() {
        await redis.del(this.hashKey);
    }
    async cleanupInactivePlayers(timeoutMs = 10 * 60 * 1000) {
        const now = Date.now();
        const players = await this.getAllPlayers();
        for (const player of players) {
            if (!player.isConnected && now - player.lastSeen > timeoutMs) {
                this.removePlayer(player.id);
            }
        }
    }
}
export default new PlayerManager();
//# sourceMappingURL=PlayerManager.js.map