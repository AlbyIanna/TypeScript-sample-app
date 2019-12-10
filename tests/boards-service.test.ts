import { BoardsService, Board } from "../src/boards-service";

/*
  BoardsService 
  - when add new board 
    - and it has a name, 
      - it should add the new board to the registry
      - it should return the registry
    - and it has no name
      - it should throw an error
    - and it is not defined
      - it should throw an error
  - when remove a board 
    - and it has a name, 
      - and it is present in the registry
        - it should remove the board from the registry
        - it should return the registry
      - and it is not present in the registry
        - it should throw an error
    - and it has no name
      - it should throw an error
    - and it is not defined
      - it should throw an error
  - when retrieving the list of the boards
    - it should return the list of the boards
*/



describe('The BoardsService', () => {
  let subject: BoardsService;
  let boardsArray: Board[];

  beforeEach(() => {
    boardsArray = [
      { name: 'MKR 1000' },
      { name: 'MKR WIFI 1010' },
      { name: 'MKR WAN 1310' },
      { name: 'NANO 33 IoT' }
    ]
    subject = new BoardsService([...boardsArray]);
  });

  describe('adds a new board', () => {
    describe('it has a name', () => {
      const newBoard = { name: 'MKR GSM 1400' };

      it('adds the new board to the registry', () => {
        expect(subject.add(newBoard).retrieve()).toStrictEqual([...boardsArray, newBoard]);
      });

      it('returns the registry', () => {
        expect(subject.add(newBoard)).toBe(subject);
      });
    });

    describe('it has no name', () => {
      let newBoard = { name: '' };
      const addNewBoard = () => subject.add(newBoard);
      it('throws an error', () => {
        expect(addNewBoard).toThrow('board with no name');
      });
    });

    describe('it is not defined', () => {
      let newBoard: Board;
      const addNewBoard = () => subject.add(newBoard);
      it('throws an error', () => {
        expect(addNewBoard).toThrow(`board' is not defined`);
      });
    });
  });

  describe('removes a board', () => {
    describe('it has a name', () => {
      describe('it is present in the registry', () => {
        let boardToBeRemoved = { name: 'MKR 1000' };
        it('removes the board from the registry', () => {
          boardsArray.splice(0, 1);
          expect(subject.remove(boardToBeRemoved).retrieve()).toStrictEqual(boardsArray);
        });
  
        it('returns the registry', () => {
          expect(subject.remove(boardToBeRemoved)).toBe(subject);
        });
      });

      describe('it is not present in the registry', () => {
        let boardToBeRemoved = { name: 'MKR DOG WOOF WOOF' };
        const removeBoard = () => subject.remove(boardToBeRemoved);
        it('throws an error', () => {
          expect(removeBoard).toThrow('cannot find board');
        });
      });
    });

    describe('it has no name', () => {
      let boardToBeRemoved = { name: '' };
      const removeBoard = () => subject.remove(boardToBeRemoved);
      it('throws an error', () => {
        expect(removeBoard).toThrow('board with no name');
      });
    });

    describe('it is not defined', () => {
      let boardToBeRemoved: Board;
      const removeBoard = () => subject.remove(boardToBeRemoved);
      it('throws an error', () => {
        expect(removeBoard).toThrow(`board' is not defined`);
      });
    });
  });
})