import { timer } from 'rxjs';
import { BoardsService } from './boards-service';

const boardsService = new BoardsService();

window.onload = function() {
  const boardNameInput = <HTMLInputElement>document.getElementById("board-name");
  const addBoardForm = document.getElementById("add-board-form");
  addBoardForm.addEventListener('submit', e => handleAddBoardSubmit(e, boardNameInput));
}

function handleAddBoardSubmit(event: Event, boardNameInput: HTMLInputElement) {
  event.preventDefault();
  if (boardNameInput.value === '') {
    return;
  }
  let board = { name: boardNameInput.value };
  boardsService.add(board);
  boardNameInput.value = '';
  timer(2000).subscribe(() => retrieveBoards());

}

function retrieveBoards() {
  let boardsListDivElement = <HTMLDivElement>document.getElementById("boards-list");
  let list="<ul>";

  boardsService.retrieve().forEach(board => {
    list += `<li>${board.name}</li>\n`;
  });

  list += "</ul>"
  boardsListDivElement.innerHTML = list;
}