const templateFragment = document.querySelector('#cell-template').content,
  template = templateFragment.querySelector('div'),
  fragment = document.createDocumentFragment(),
  field = document.querySelector('.field');

const COLORFIGURE = ['cell__figure_white', 'cell__figure_black'],
  CELLNUM = [0, 1, 2, 3, 4, 5, 6, 7];


//рисуем доску
let colorFigure;
let count = 0;

for(k=0; k<8; k++) {
  for(i=0; i<8; i++) {
    const element = template.cloneNode(true);
    element.setAttribute('data-x',`${k}`);
    element.setAttribute('data-y',`${i}`);
    if(count%2 == 0){
      element.classList.add('cell_black');
    }
    fragment.appendChild(element);
    count++;
  }
  count++;
}

field.appendChild(fragment);

//стартовые позиции
const figureWhite = field.querySelector('.cell[data-x="0"][data-y="2"]');
figureWhite.classList.add('cell__figure', 'cell__figure_white');
figureWhite.addEventListener('click', getMove);

const figureBlack = field.querySelector('.cell[data-x="7"][data-y="5"]');
figureBlack.classList.add('cell__figure', 'cell__figure_black');
figureBlack.addEventListener('click', getMove);

//все ячейки доски
const allCell = Array.from(document.getElementsByClassName('cell'));

//делаем ход
function moveFigure(e) {
  const x = e.target.dataset.x;
  const y = e.target.dataset.y;

  if(e.target.classList.contains('cell_active')) {
    //удалить все фигуры которые уже стоят
    allCell.map(el => {
      if(el.classList.contains(`${colorFigure}`)) {
        el.classList.remove(`${colorFigure}`, 'cell__figure');
        el.removeEventListener('click', getMove);
      }
    })

    //находим нужную клетку на доске и ставим новую фигуру
    const newCellFigure = field.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    newCellFigure.classList.add('cell__figure', `${colorFigure}`);
    newCellFigure.addEventListener('click', getMove);
  }

    //удаляем все активные клетки
    allCell.map(cell => cell.classList.remove('cell_active'));
}

// просчитываем возможные ходы
function getMove(e) {
  const x = e.target.dataset.x;
  const y = e.target.dataset.y;

  let cellX = allCell.filter(cell => cell.getAttribute('data-x') == x);
  let cellY = allCell.filter(cell => cell.getAttribute('data-y') == y);

  //удаляем все активные клетки
  allCell.map(cell => cell.classList.remove('cell_active'));
  allCell.map(cell => cell.removeEventListener('click', moveFigure));

  const allCellActive = [];

  //если кликнули по ладье
  if(e.target.classList.contains('cell__figure')) {
    //находим цвет ладьи
    let classFigure = e.target.classList.value.split(' ');
    colorFigure = classFigure.find(elem => elem == COLORFIGURE[0] || elem == COLORFIGURE[1]);

    //проверка на препядствие по X
    for(i=+y+1; i<8; i++){
      if(!cellX[i].classList.contains('cell__figure')) {
        cellX[i].classList.add('cell_active');
        allCellActive.push(cellX[i]);
      } else {
        break;
      }
    }

    for(i=+y-1; i>=0; i--){
      if(!cellX[i].classList.contains('cell__figure')) {
        cellX[i].classList.add('cell_active');
        allCellActive.push(cellX[i]);
      } else {
        break;
      }
    }

      //проверка на препядствие по Y
    for(i=+x+1; i<8; i++) {
      if(!cellY[i].classList.contains('cell__figure')) {
        cellY[i].classList.add('cell_active');
        allCellActive.push(cellY[i]);
      } else {
        break;
      }
    }

    for(i=+x-1; i>=0; i--){
      if(!cellY[i].classList.contains('cell__figure')) {
        cellY[i].classList.add('cell_active');
        allCellActive.push(cellY[i]);
      } else {
        break;
      }
    }

    //на активные клетки добавляем возможность сделать ход
    allCell.map(cell => cell.removeEventListener('click', moveFigure));
    allCellActive.forEach(el => el.addEventListener('click', (e) => moveFigure(e)));
  }
}
