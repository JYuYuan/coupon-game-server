import type { TaskSet } from './tasks';
import type { Player } from './socket';
export interface CreateRoomData {
    roomName: string;
    playerName: string;
    maxPlayers: number;
    gameType: 'fly' | 'wheel' | 'minesweeper';
    taskSet?: TaskSet | null;
}
export interface TaskModalData {
    id: string;
    title: string;
    description: string;
    type: 'trap' | 'star' | 'collision';
    executors: Player[];
    category: string;
    difficulty: string;
    triggerPlayerIds: number[];
}
//# sourceMappingURL=room.d.ts.map