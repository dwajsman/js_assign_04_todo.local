/*
 * your javascript goes here
referencia: https://www.youtube.com/watch?v=DIVfDZZeGxM
about 'this': http://stackoverflow.com/questions/925734/whats-this-in-javascript-onclick
change status onclick: http://stackoverflow.com/questions/15097315/change-onclick-attribute-with-javascript
getTime: https://www.w3schools.com/jsref/jsref_gettime.asp
*/
document.getElementById('form').addEventListener('submit', saveTodo);

function saveTodo(e){
      //alert("yes");
      let todo = document.getElementById('finput').value;
      let flag = 'open';
      let d = new Date();
      let tarefaId = d.getTime();
      console.log(todo);
      console.log(flag);
      console.log(d);
      console.log(tarefaId);

      let tarefa = { 

        name: todo,
        status: flag,
        id: tarefaId
      }



      //console.log(tarefa);

      if(localStorage.getItem('tarefas') === null){

        let tarefas = [];

        tarefas.push(tarefa);

        localStorage.setItem('tarefas', JSON.stringify(tarefas));

      } else {

      let tarefas = JSON.parse(localStorage.getItem('tarefas'));

      tarefas.push(tarefa);

      localStorage.setItem('tarefas', JSON.stringify(tarefas));

      }

    fetchTarefas();
   
    e.preventDefault();
}



function changeStatus(id) {
  let tarefas = JSON.parse(localStorage.getItem('tarefas'));

  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id == id) {
      if(tarefas[i].status === 'open'){
      tarefas[i].status = 'closed';
      } else {
        tarefas[i].status = 'open';
      }

    }
  } 

  localStorage.setItem('tarefas', JSON.stringify(tarefas));

  fetchTarefas();
} // END of 'changeStatus'




  
function deletar(id){

      let tarefas = JSON.parse(localStorage.getItem('tarefas'));

       for( let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id == id){
            tarefas.splice(i, 1);
        }

      }
    
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    fetchTarefas(); 
}

  




function fetchTarefas(){

let tarefas = JSON.parse(localStorage.getItem('tarefas'));

let tarefasShow = document.getElementById('tarefasShow');

tarefasShow.innerHTML = '';
 
for (let i = 0; i < tarefas.length; i++) {
 
  let name = tarefas[i].name;
  let flag = tarefas[i].status;
  let id = tarefas[i].id;

  tarefasShow.innerHTML += 
                            '<li>' + 
                            '<a onclick="changeStatus('+id+')" class="'+flag+'" href="#">'+
                            name + 
                            '</a>' + 
                            '<i style="visibility: hidden;">__</i>'+
                            '<a onclick="deletar('+id+')" class="del" href="#">X</a>'+
                            '</li>'; 

}


}
