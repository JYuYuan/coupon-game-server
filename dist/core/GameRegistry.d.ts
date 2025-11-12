import type { SocketIOServer, Room } from '../typings/socket';
import type BaseGame from './BaseGame.js';
interface GameConstructor {
    new (room: Room, io: SocketIOServer): BaseGame;
}
declare class GameRegistry {
    private registry;
    constructor();
    registerGame(type: string, gameClass: GameConstructor): void;
    createGame(type: string, room: Room, io: SocketIOServer): BaseGame | null;
    getRegisteredGames(): string[];
}
declare const gameRegistry: GameRegistry;
export default gameRegistry;
//# sourceMappingURL=GameRegistry.d.ts.map