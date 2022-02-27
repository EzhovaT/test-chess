const templateFragment = document.querySelector('#cell-template').content;
const template = templateFragment.querySelector('div');
const fragment = document.createDocumentFragment();
const field = document.querySelector('.field');

const COLORFIGURE = ['cell__figure_white', 'cell__figure_black']

let colorFigure;

const moveFigure = (e) =>{
  const x = e.target.dataset.x;
  const y = e.target.dataset.y;

  if(e.target.classList.contains('cell_active')) {
    //удалить все фигуры которые уже стоят
    allCell.map(el => {
      if(el.classList.contains(`${colorFigure}`)) {
        el.classList.remove(`${colorFigure}`, 'cell__figure');
      }
    })

    //находим нужную клетку на доске и ставим новую фигуру
    const newCellFigure = field.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    newCellFigure.classList.add('cell__figure', `${colorFigure}`);

    //вешаем только на новую ячейку
    newCellFigure.addEventListener('click', getMove);
  }

    //удаляем все активные клетки, если кликнули мимо
    allCell.map(cell => cell.classList.remove('cell_active'));
}

// просчитываем ходы
const getMove = (event) => {
  const x = event.target.dataset.x;
  const y = event.target.dataset.y;

  let cellX = allCell.filter(cell => cell.getAttribute('data-x') == x);
  let cellY = allCell.filter(cell => cell.getAttribute('data-y') == y);

  //удаляем все активные клетки, если кликнули мимо
  allCell.map(cell => cell.classList.remove('cell_active'));
  allCell.map(cell => cell.removeEventListener('click', moveFigure));

  const allCellActive = [];

  //если кликнули по ладье
if(event.target.classList.contains('cell__figure')) {
  //находим цвет ладьи
  let classFigure = event.target.classList.value.split(' ');
  colorFigure = classFigure.find(elem => elem == COLORFIGURE[0] || elem == COLORFIGURE[1]);

  //проверка на препядствие в одну сторону по X
  for(i=+y+1; i<8; i++){
    if(!cellX[i].classList.contains('cell__figure')) {
      cellX[i].classList.add('cell_active');
      allCellActive.push(cellX[i]);
    } else {
      break;
    }
  }

    //проверка на препядствие в другую сторону по X
  for(i=+y-1; i>=0; i--){
    if(!cellX[i].classList.contains('cell__figure')) {
      cellX[i].classList.add('cell_active');
      allCellActive.push(cellX[i]);
    } else {
      break;
    }
  }

    //проверка на препядствие в одну сторону по Y
  for(i=+x+1; i<8; i++) {
    if(!cellY[i].classList.contains('cell__figure')) {
      cellY[i].classList.add('cell_active');
      allCellActive.push(cellY[i]);
    } else {
      break;
    }
  }

    //проверка на препядствие в другую сторону по Y
  for(i=+x-1; i>=0; i--){
    if(!cellY[i].classList.contains('cell__figure')) {
      cellY[i].classList.add('cell_active');
      allCellActive.push(cellY[i]);
    } else {
      break;
    }
  }

  //удаляум со всех ячеек и вешаем только на активные обработчик клика
  allCell.map(cell => cell.removeEventListener('click', moveFigure));
  allCellActive.forEach(el => el.addEventListener('click', (e) => moveFigure(e)));
}
}


//рисуем доску
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
