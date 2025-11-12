import type { SocketIOServer, Room } from '../typings/socket';
declare abstract class BaseGame {
    room: Room;
    socket: SocketIOServer;
    constructor(room: Room, io: SocketIOServer);
    abstract onStart(io?: SocketIOServer): void;
    abstract onResume(io?: SocketIOServer): void;
    abstract onPlayerAction(io: SocketIOServer, playerId: string, action: unknown, callback?: Function): void;
    abstract onEnd(io?: SocketIOServer): void;
    abstract _handleTaskComplete(playerId: string, action: unknown): void;
    /**
     * 同步游戏状态 - 确保 gameState 和 players 数组保持一致
     */
    protected syncGameState(): void;
    /**
     * 更新玩家位置 - 统一的位置更新方法
     */
    protected updatePlayerPosition(playerId: string, position: number): void;
    /**
     * 更新房间并通知所有玩家
     */
    protected updateRoomAndNotify(): Promise<void>;
    /**
     * 获取玩家位置 - 从 players 数组获取（单一数据源）
     */
    get playerPositions(): {
        [playerId: string]: number;
    };
    /**
     * 设置玩家位置 - 统一更新两个数据源
     */
    set playerPositions(positions: {
        [playerId: string]: number;
    });
    /**
     * 获取游戏阶段
     */
    get gamePhase(): string;
    /**
     * 设置游戏阶段
     */
    set gamePhase(phase: string);
    /**
     * 获取回合数
     */
    get turnCount(): number;
    /**
     * 增加回合数
     */
    incrementTurn(): void;
    /**
     * 获取游戏开始时间
     */
    get startTime(): number;
    /**
     * 获取游戏运行时间
     */
    getGameDuration(): number;
    /**
     * 序列化游戏状态（现在直接返回 room.gameState）
     */
    serialize(): unknown;
    /**
     * 反序列化游戏状态（现在直接设置到 room.gameState）
     */
    deserialize(data: unknown): void;
}
export default BaseGame;
//# sourceMappingURL=BaseGame.d.ts.map