import { BoardsService } from '../src/boards-service';

let boardsService;
const initialBoardsArray = [
  { name: 'MKR WIFI 1010' },
  { name: 'MKR WAN 1300' },
  { name: 'MKR WAN 1310' },
  { name: 'Nano 33 IoT' },
  { name: 'Nano 33 BLE' }
]

beforeEach(() => {
  boardsService = new BoardsService([...initialBoardsArray]);
});

describe('Boards Service', () => {
  const newBoard = { name: 'MKR 1000' };

  it('adds a board to the list', () => {
    boardsService.add(newBoard);
    expect(boardsService.boards).toStrictEqual([...initialBoardsArray, newBoard]);
  });


  it('adds a board to the list', () => {
    boardsService.add(newBoard);

    expect(boardsService.boards).toStrictEqual([...initialBoardsArray, newBoard]);   
  });

  it('removes a board from the list', () => {
    const boardToBeDeleted = {name: 'MKR WIFI 1010'}; 
    boardsService.remove(boardToBeDeleted);
    let expected = [...initialBoardsArray];
    expected.splice(0, 1);
    expect(boardsService.boards).toStrictEqual(expected);
  });

  test('raises an error saying board cannot be found', () => {
    const boardToBeDeleted = {name: 'MKR DOG WOOF WOOF'}; 
    const removeBoard = () => boardsService.remove(boardToBeDeleted);
    expect(removeBoard).toThrowError('cannot find board');
  })
});
