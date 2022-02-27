const templateFragment = document.querySelector('#cell-template').content;
const template = templateFragment.querySelector('div');
const fragment = document.createDocumentFragment();
const field = document.querySelector('.field');


// просчитываем ходы
const getMove = (event) => {
  const x = event.target.dataset.x;
  const y = event.target.dataset.y;

  allCell = Array.from(document.getElementsByClassName('cell'));

  let cellX = allCell.filter(cell => cell.getAttribute('data-x') == x);
  let cellY = allCell.filter(cell => cell.getAttribute('data-y') == y);

  allCell.map(cell => cell.classList.remove('cell_active'));


  //если кликнули по ладье
if(event.target.classList.contains('cell__figure_white')) {
  //проверка на препядствие в одну сторону по X
  for(i=+y+1; i<8; i++){
    console.log(i)
    console.log(cellX[i])
    if(!cellX[i].classList.contains('cell__figure_white')) {
      cellX[i].classList.add('cell_active');
    } else {
      break;
    }
  }

    //проверка на препядствие в другую сторону по X
  for(i=+y-1; i>=0; i--){
    if(!cellX[i].classList.contains('cell__figure_white')) {
      cellX[i].classList.add('cell_active');
    } else {
      break;
    }
  }

    //проверка на препядствие в одну сторону по Y
  for(i=+x+1; i<8; i++) {
    if(!cellY[i].classList.contains('cell__figure_white')) {
      cellY[i].classList.add('cell_active');
    } else {
      break;
    }
  }

    //проверка на препядствие в другую сторону по Y
  for(i=+x-1; i>=0; i--){
    if(!cellY[i].classList.contains('cell__figure_white')) {
      cellY[i].classList.add('cell_active');
    } else {
      break;
    }
  }
}
}


//рисуем доску
let count = 0;

for(k=0; k<8; k++) {
  for(i=0; i<8; i++) {
    const element = template.cloneNode(true);
    element.setAttribute('data-x',`${k}`);
    element.setAttribute('data-y',`${i}`);
    element.addEventListener('click', getMove);
    if(count%2 == 0){
      element.classList.add('cell_black');
    }
    fragment.appendChild(element);
    count++;
  }
count++;
}
field.appendChild(fragment);


