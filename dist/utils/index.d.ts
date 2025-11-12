export declare function getRandomColor(): string | undefined;
export declare function generateRoomId(): string;
export declare function shuffleArray<T>(array: T[]): T[];
interface PathCell {
    id: number;
    x: number;
    y: number;
    type: 'start' | 'end' | 'path' | 'star' | 'trap';
    direction: 'right' | 'down' | 'left' | 'up' | null;
}
export declare const createBoardPath: () => PathCell[];
export {};
//# sourceMappingURL=index.d.ts.map