window.onload = function() {

  let botaoAdicionar = document.getElementById('criar-tarefa');
  let listaTarefas = document.getElementById('lista-tarefas');
  let botaoLimpar = document.getElementById('apaga-tudo');
  let botaoRemover = document.getElementById('remover-finalizados');
  let botaoSalvar = document.getElementById('salvar-tarefas');
  let botaoRemoverSelecionado = document.getElementById('remover-selecionado');
  let botaoCima = document.getElementById('mover-cima');
  let botaoBaixo = document.getElementById('mover-baixo');
  let input = document.querySelector('input');

  listaTarefas.innerHTML = localStorage.getItem('list');

  function createTask() {
    const newItem = document.createElement('li');
    const valor = input.value.trim();
    if (valor.length > 0) {
      newItem.innerText = valor;
      input.value = '';
      listaTarefas.appendChild(newItem);
    }
  }

  function setBackGround(event) {
    if (event.target.tagName == 'LI') {
      if (event.target.style.backgroundColor == 'rgb(128, 128, 128)') {
        event.target.style.backgroundColor = '';
        return;
      }
      for (let index = 0; index < listaTarefas.children.length; index++) {
        listaTarefas.children[index].style.backgroundColor = '';
      }
      event.target.style.backgroundColor = 'rgb(128, 128, 128)';

    }
  }

  function setCompleted(event) {
    if (event.target.tagName == 'LI') {
      //poderia utilizar toggle
      if ((event.target.className) == '') {
        event.target.classList.add('completed');
      } else event.target.className = ('');
    }
  }

  function clearList() {
    for (let index = 0; index < listaTarefas.children.length; index = 0) {
      listaTarefas.children[index].remove();
    }
  }

  function removeCompleteds() {
    for (let index = 0; index < listaTarefas.children.length; index++) {
      if (listaTarefas.children[index].className == 'completed') {
        listaTarefas.children[index].remove();
      }

      for (let index = 0; index < listaTarefas.children.length; index++) {
        if (listaTarefas.children[index].className == 'completed') {
          listaTarefas.children[index].remove();
        }
      }
    }
  }

  function saveTasks() {
    let savedList = listaTarefas.innerHTML;
    localStorage.setItem('list', savedList);

  }

  function removeSelected() {
    for (let index = 0; index < listaTarefas.children.length; index++) {
      if (listaTarefas.children[index].style.backgroundColor == 'rgb(128, 128, 128)') {
        listaTarefas.children[index].remove();
      }
    }
  }

  function moveUp() {
    let selected;
    let up;
    let classSelected;
    let classUp;

    for (let index = 1; index < listaTarefas.children.length; index++) {
      if (listaTarefas.children[index].style.backgroundColor == 'rgb(128, 128, 128)') {

        selected = listaTarefas.children[index].innerHTML;
        classSelected = listaTarefas.children[index].className;

        up = listaTarefas.children[index - 1].innerHTML;
        classUp = listaTarefas.children[index - 1].className;

        listaTarefas.children[index - 1].style.backgroundColor = 'rgb(128, 128, 128)';

        listaTarefas.children[index].style.backgroundColor = '';

        listaTarefas.children[index - 1].className = classSelected;

        listaTarefas.children[index].className = classUp;

        listaTarefas.children[index - 1].innerHTML = selected;

        listaTarefas.children[index].innerHTML = up;

      }
    }
  }

  function moveDown() {
    let selected;
    let down;
    let classSelected;
    let classDown;

    for (let index = 0; index < listaTarefas.children.length - 1; index++) {
      if (listaTarefas.children[index].style.backgroundColor == 'rgb(128, 128, 128)') {

        selected = listaTarefas.children[index].innerHTML;
        classSelected = listaTarefas.children[index].className;

        down = listaTarefas.children[index + 1].innerHTML;
        classDown = listaTarefas.children[index + 1].className;

        listaTarefas.children[index + 1].style.backgroundColor = 'rgb(128, 128, 128)';

        listaTarefas.children[index].style.backgroundColor = '';

        listaTarefas.children[index + 1].className = classSelected;

        listaTarefas.children[index].className = classDown;

        listaTarefas.children[index + 1].innerHTML = selected;

        listaTarefas.children[index].innerHTML = down;

        break;
      }
    }
  }

  input.addEventListener('keypress', function(event) {
    if (event.key == 'Enter') {
      createTask();
    }
  });

  botaoAdicionar.addEventListener('click', createTask);
  listaTarefas.addEventListener('click', setBackGround);
  listaTarefas.addEventListener('dblclick', setCompleted);
  botaoLimpar.addEventListener('click', clearList);
  botaoRemover.addEventListener('click', removeCompleteds);
  botaoSalvar.addEventListener('click', saveTasks);
  botaoRemoverSelecionado.addEventListener('click', removeSelected);
  botaoCima.addEventListener('click', moveUp);
  botaoBaixo.addEventListener('click', moveDown);

}