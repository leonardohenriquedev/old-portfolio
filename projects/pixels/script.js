var tamanho;
window.onload = function() {

  function createFirstBoard() {

    let board = document.getElementById('pixel-board');
    if (board.children.length == 0) {
      for (let line = 0; line < 5; line++) {
        let lineCreated = document.createElement('div');
        lineCreated.className = 'line';
        board.appendChild(lineCreated);
        for (let pixel = 0; pixel < 5; pixel++) {
          let pixelCreated = document.createElement('div');
          pixelCreated.className = 'pixel';
          board.children[line].appendChild(pixelCreated);
        }
      }
    }
  }

  createFirstBoard()

  document.getElementById('firstColor').classList.add('selected');

  for (let index = 1; index <= 3; index++) {

    // função para gerar cores aleatorias retirada do site https://wallacemaxters.com.br/blog/2021/02/20/como-gerar-cores-aleatorias-no-javascript

    function gerar_cor(opacidade = 1) {
      let r = Math.random() * 255;
      let g = Math.random() * 255;
      let b = Math.random() * 255;

      return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
    }
    document.getElementById('firstColor').style.backgroundColor = 'black';
    let color = document.getElementsByClassName('color');
    color[index].style.backgroundColor = gerar_cor();
  }

  let color = document.getElementById('color-palette')

  color.addEventListener('click', function(event) {
    if (event.target.className == 'color') {

      for (let index = 0; index < color.children.length; index++) {
        color.children[index].className = 'color';
      }
      event.target.classList.add('selected');
    }
  })


  function paintPixels() {
    let pixel = document.querySelectorAll('.pixel');

    for (let index = 0; index < pixel.length; index++) {
      pixel[index].addEventListener('click', function(event) {
        let selected = document.querySelector('.selected');
        event.target.style.backgroundColor = selected.style.backgroundColor;
      })
    }
  }

  paintPixels();


  function erasePixels() {
    let botao = document.getElementsByTagName('button')[0];
    let pixel = document.querySelectorAll('.pixel');

    botao.addEventListener('click', function() {
      for (let index = 0; index < pixel.length; index++) {
        pixel[index].style.backgroundColor = 'white';
      }
    })
  }
  erasePixels();


  let input = document.getElementsByTagName('input')[0];

  input.addEventListener('change', function(event) {
    tamanho = event.target.value;
  })

  function createBoard() {
    let board = document.getElementById('pixel-board');
    let botao = document.getElementById('generate-board');
    botao.addEventListener('click', function() {
      if (tamanho == 0) {
        alert('Board inválido!');

      } else if (tamanho == null) {
        alert('Board inválido!');

      } else if (tamanho < 5) {
        if (board.firstElementChild != null) {
          for (let index = 0; index < board.children.length; index = 0) {
            board.firstElementChild.remove();
          }
        }
        for (let line = 0; line < 5; line++) {
          let lineCreated = document.createElement('div');
          lineCreated.className = 'line';
          board.appendChild(lineCreated);
          for (let pixel = 0; pixel < 5; pixel++) {
            let pixelCreated = document.createElement('div');
            pixelCreated.className = 'pixel';
            board.children[line].appendChild(pixelCreated);
          }
        }

      } else if (tamanho > 30) {
        if (board.firstElementChild != null) {
          for (let index = 0; index < board.children.length; index = 0) {
            board.firstElementChild.remove();
          }
        }
        for (let line = 0; line < 30; line++) {
          let lineCreated = document.createElement('div');
          lineCreated.className = 'line';
          board.appendChild(lineCreated);
          for (let pixel = 0; pixel < 30; pixel++) {
            let pixelCreated = document.createElement('div');
            pixelCreated.className = 'pixel';
            board.children[line].appendChild(pixelCreated);
          }
        }

      } else if (board.firstElementChild != null) {
        for (let index = 0; index < board.children.length; index = 0) {
          board.firstElementChild.remove();
        }
        for (let line = 0; line < tamanho; line++) {
          let lineCreated = document.createElement('div');
          lineCreated.className = 'line';
          board.appendChild(lineCreated);
          for (let pixel = 0; pixel < tamanho; pixel++) {
            let pixelCreated = document.createElement('div');
            pixelCreated.className = 'pixel';
            board.children[line].appendChild(pixelCreated);
          }
        }
      }

      paintPixels();
      erasePixels();
    })
  }

  createBoard();
}