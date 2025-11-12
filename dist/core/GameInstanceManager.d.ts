import type { Room, SocketIOServer } from '../typings/socket';
import type BaseGame from './BaseGame.js';
interface GameData {
    roomId: string;
    gameType: string;
    createdAt: number;
    lastActivity: number;
}
declare class GameInstanceManager {
    private hashKey;
    private localCache;
    private readonly GAME_TTL;
    /**
     * 创建游戏实例
     */
    createGameInstance(room: Room, io: SocketIOServer): Promise<BaseGame>;
    /**
     * 获取游戏实例
     */
    getGameInstance(roomId: string, io?: SocketIOServer): Promise<BaseGame | null>;
    /**
     * 更新游戏实例状态
     */
    updateGameInstance(roomId: string, _game: BaseGame): Promise<void>;
    /**
     * 删除游戏实例
     */
    removeGameInstance(roomId: string): Promise<void>;
    /**
     * 获取所有活跃游戏
     */
    getAllActiveGames(): Promise<{
        [roomId: string]: GameData;
    }>;
    /**
     * 清理过期游戏
     */
    cleanupExpiredGames(): Promise<void>;
    /**
     * 从 room 数据重建游戏实例
     */
    private recreateGameInstance;
    /**
     * 清空本地缓存
     */
    clearLocalCache(): void;
    /**
     * 获取缓存统计信息
     */
    getCacheStats(): {
        localCacheSize: number;
        redisKey: string;
    };
}
declare const _default: GameInstanceManager;
export default _default;
//# sourceMappingURL=GameInstanceManager.d.ts.map