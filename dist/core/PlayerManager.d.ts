import type { Player } from '../typings/socket';
interface AddPlayerParams {
    playerId: string;
    roomId?: string | null;
    name: string;
    isHost?: boolean;
    [key: string]: unknown;
}
declare class PlayerManager {
    hashKey: string;
    addPlayer(socketId: string, { playerId, roomId, name, isHost, ...rest }: AddPlayerParams): Promise<Player>;
    updatePlayer(player: Player): Promise<Player>;
    getPlayer(playerId: string): Promise<Player | null>;
    getAllPlayers(): Promise<Player[]>;
    removePlayer(playerId: string): Promise<void>;
    clearAll(): Promise<void>;
    cleanupInactivePlayers(timeoutMs?: number): Promise<void>;
}
declare const _default: PlayerManager;
export default _default;
//# sourceMappingURL=PlayerManager.d.ts.map