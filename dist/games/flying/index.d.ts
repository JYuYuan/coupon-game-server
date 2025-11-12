import BaseGame from '../../core/BaseGame.js';
import type { SocketIOServer, Room } from '../../typings/socket';
declare class FlyingGame extends BaseGame {
    constructor(room: Room, io: SocketIOServer);
    onStart(): Promise<void>;
    onResume(): Promise<void>;
    onPlayerAction(_io: SocketIOServer, playerId: string, action: unknown, callback?: Function): Promise<void>;
    _handleDiceRoll(playerId: string, callback?: Function): Promise<void>;
    _checkCollision(playerId: string, position: number): boolean;
    _getCellType(position: number): string;
    _triggerTask(playerId: string, taskType?: string): Promise<void>;
    _handleMoveComplete(playerId: string): Promise<void>;
    _checkWinCondition(): Promise<void>;
    _nextPlayer(): Promise<void>;
    _endGame(winnerId: string): Promise<void>;
    _handleTaskComplete(playerId: string, action: unknown): Promise<void>;
    onEnd(_io?: SocketIOServer): Promise<void>;
}
export default FlyingGame;
//# sourceMappingURL=index.d.ts.map