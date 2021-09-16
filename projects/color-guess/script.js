let balls = document.querySelector('.balls');
let rgb = document.getElementById('rgb-color')
let feedback = document.getElementById('answer');
let botaoReset = document.getElementById('reset-game');
let score = document.getElementById('score');

function generateColor() {
  let r = parseInt(Math.random() * 255);
  let g = parseInt(Math.random() * 255);
  let b = parseInt(Math.random() * 255);
  return (`(${r}, ${g}, ${b})`);
}

rgb.innerText = generateColor();

function generateBalls() {

  for (let index = 0; index < 6; index++) {
    let ball = document.createElement('div');
    ball.className = 'ball';
    balls.appendChild(ball);
  }
}

function putColors() {
  let selected = parseInt(Math.random() * 6);
  console.log(selected);

  for (let index = 0; index < 6; index++) {
    if (index == selected) {
      balls.children[index].style.backgroundColor = 'rgb' + rgb.innerText;
      balls.children[index].id = 'correct';

    } else balls.children[index].style.backgroundColor = 'rgb' + generateColor();
  }
}

let circles = document.querySelector('.balls');

circles.addEventListener('click', function(event) {
  if (event.target.id == 'correct') {
    feedback.innerText = 'Acertou!';
    score.innerText = (parseInt(score.innerText) + 3);
    rgb.innerText = generateColor();
    for (let index = 0; index < 6; index++) {
      balls.children[index].id = '';
    }
    putColors();
  } else {
    feedback.innerText = 'Errou! Tente novamente!';
    rgb.innerText = generateColor();
    for (let index = 0; index < 6; index++) {
      balls.children[index].id = '';
    }
    putColors();
  }
})


function reset() {
  rgb.innerText = generateColor();
  for (let index = 0; index < 6; index++) {
    balls.children[index].id = '';
  }
  putColors();
  feedback.innerText = 'Escolha uma cor';
}



botaoReset.addEventListener('click', function() {
  reset();
})

window.onload = function() {
  generateColor();
  generateBalls();
  putColors();
}