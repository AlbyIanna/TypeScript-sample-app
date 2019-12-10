type Board = {
  name: string;
}

interface IBoardsRetriever {
  retrieve(): Board[];
}

interface IBoardsManager {
  add(board: Board): IBoardsManager;
  remove(board: Board): IBoardsManager;
}

class BoardsService implements IBoardsManager, IBoardsRetriever {
  constructor(private boards: Board[] = []) {}

  add(board: Board): BoardsService {
    this.boards.push(board);
    return this;
  }

  remove(board: Board): BoardsService {
    const boardIndex = this.boards.findIndex(b => b.name === board.name);
    if ( boardIndex === -1) {
      throw new Error(`Error removing board: cannot find board with name "${board.name}"`);
    } else {
      this.boards.splice(boardIndex, 1);
      return this;
    }
  }
  
  retrieve(): Board[] {
    return this.boards;
  }
}

export { BoardsService };

