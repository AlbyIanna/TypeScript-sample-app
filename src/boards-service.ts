export type Board = {
  name: string;
}

interface IBoardsRetriever {
  retrieve(): Board[];
}

interface IBoardsRegistry {
  add(board: Board): IBoardsRegistry;
  remove(board: Board): IBoardsRegistry;
}

class BoardsService implements IBoardsRegistry, IBoardsRetriever {
  constructor(private boards: Board[] = []) {}

  add(board: Board): BoardsService {
    if (!board) {
      throw new Error(`Error adding board: 'board' is not defined.`);
    } else if (!board.name || board.name === '') {
      throw new Error(`Error adding board: cannot add board with no name.`);
    } else {
      this.boards.push(board);
      return this;
    }
  }

  remove(board: Board): BoardsService {
    if (!board) {
      throw new Error(`Error removing board: 'board' is not defined.`);
    } else if (!board.name || board.name === '') {
      throw new Error(`Error removing board: cannot remove board with no name.`);
    } else {
      const boardIndex = this.boards.findIndex(b => b.name === board.name);
      if ( boardIndex === -1) {
        throw new Error(`Error removing board: cannot find board with name "${board.name}".`);
      } else {
        this.boards.splice(boardIndex, 1);
        return this;
      }
    }
  }
  
  retrieve(): Board[] {
    return this.boards;
  }
}

export { BoardsService };

