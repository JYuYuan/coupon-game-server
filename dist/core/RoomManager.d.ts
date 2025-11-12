import type { Room, Player } from '../typings/socket';
interface CreateRoomParams {
    name: string;
    hostId: string;
    maxPlayers?: number;
    gameType: 'fly' | 'wheel' | 'minesweeper';
    [key: string]: unknown;
}
declare class RoomManager {
    hashKey: string;
    /**
     * 创建房间
     */
    createRoom({ name, hostId, maxPlayers, gameType, ...rest }: CreateRoomParams): Promise<Room>;
    /**
     * 删除房间
     */
    deleteRoom(roomId: string): Promise<void>;
    updateRoom(room: Room): Promise<void>;
    /**
     * 获取房间
     */
    getRoom(roomId: string): Promise<Room | null>;
    /**
     * 添加玩家
     */
    addPlayer(roomId: string, player: Player): Promise<Room | null>;
    /**
     * 移除玩家
     */
    removePlayer(roomId: string, playerId: string): Promise<Room | null>;
    /**
     * 添加玩家到房间
     */
    addPlayerToRoom(roomId: string, player: Player): Promise<Room | null>;
    /**
     * 从房间移除玩家
     */
    removePlayerFromRoom(roomId: string, playerId: string): Promise<Room | null>;
    /**
     * 从所有房间移除玩家
     */
    removePlayerFromRooms(playerId: string): Promise<Room | null>;
    /**
     * 获取所有房间
     */
    getAllRooms(): Promise<{
        [key: string]: Room;
    }>;
    /**
     * 更新房间活跃时间
     */
    touchRoom(roomId: string): Promise<void>;
    /**
     * 清理超时房间
     */
    cleanupInactiveRooms(timeoutMs?: number): Promise<void>;
}
declare const _default: RoomManager;
export default _default;
//# sourceMappingURL=RoomManager.d.ts.map