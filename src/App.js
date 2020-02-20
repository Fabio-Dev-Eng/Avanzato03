import React from "react";
import "./styles.css";

//Come primo passo creao i componenti STATICI e li renderizzo
export default function App() {
  /*terzo punto text non va bene scritto cosi perchè è statico
  le costanti non si possono modificare */

  //const text = "Scrivere qualcosa ";

  const [text, setText] = React.useState(""); //Parametro Iniziale
  const [list, setList] = React.useState([
    /*    
    { id: "001", text: "Fare la spesa", isDone: true },
    { id: "002", text: "Fare pulizie", isDone: false }//datifinti vanno via quando implemento la parte dinamicxa */
  ]);

  const handleClickRem = id => {
    setList(list.filter(todo => todo.id !== id.id));
    console.log("list: ", list);
    console.log("todo.id: ", id.id);
  };
  const addTodo = () => {
    // Aggiungere un elemento alla lista o alla copia della lista
    //la lista è dentro uno USESTATE quindi devo fare la copia della
    //lista con aggiunta di un elemento
    //devo poi settare lo stato
    /* const listCopy = list.slice(); //Copia di una lista*/
    const newTodo = {
      id: Math.random().toString(),
      text: text,
      isDone: false
    };
    /*
    const newList = listCopy.concat([newTodo]);
    listCopy.push(newTodo);
    setList(listCopy);
    setText("");*/
    setList([...list, newTodo]);

    setText("");
  };
  // const checkTodo = () => {};
  return (
    <div>
      <div>
        <input value={text} onChange={event => setText(event.target.value)} />
        <button onClick={addTodo}>aggiungi</button>
      </div>
      <div>
        {/*DINAMICO*/}
        {/*  ho eliminato la parte statica
       <div>
          <input type="checkbox" /> completare feature #3421
        </div>
        <div>
          <input type="checkbox" /> fix issue #666
        </div> */}
        {list.map(todo => {
          return (
            <TodoMemo
              key={todo.id}
              todo={todo}
              onToggle={() => {
                console.log("onToggle");
                //Cambiare lo stato di isDone del todo e copiare la lista
                // copia del todo
                // lista[id] = todo
                setList(
                  list.map(oldTodo =>
                    oldTodo.id === todo.id
                      ? { ...todo, isDone: !todo.isDone }
                      : oldTodo
                  )
                );
              }}
              handleClick={() => {
                console.log("REMOVE : ", todo.id);
                handleClickRem(todo);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
/* function Todo(props){
  const {todo} = props; */
function Todo({ todo, onToggle, handleClick }) {
  wait(100);
  return (
    <div key={todo.id}>
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={() => {
          //devo cambiare lo stato di check che è dentro il todo ma non lo posso modificare
          //per poterlo modificare devo farmi arrivare una callBack tramite le props
          onToggle(todo);
        }}
      />{" "}
      {todo.text}
      <button
        onClick={() => {
          handleClick(todo);
        }}
      >
        {" "}
        X{" "}
      </button>
    </div>
  );
}

const TodoMemo = React.memo(Todo);

function wait(ms) {
  const was = performance.now();
  while (true) if (performance.now() - was > ms) break;
}
//Workflow
//- Stesura JSX
//- Identifichiamo elementi dinamici (sopratutto liste/Tabelle)
//  costruzione dati mock
//- Rendere dinamico dinamico il renderign con Array.MAP (tip: non cancellare la versione statica finchè non è completa quella dinamica)
//- estrazione dei componenti/motivazioni valide
//  - ripetizione del JSX (più di 3 volte)
//  - JSX corposo all'interno di un array.map(solo per motivi di performance)
//- indagine tramite profiler per indifivuare colli di bottiglia
//- infividuare i motivi del rendere ( render del padre , quali prop cambiano, sono staili referenzialmente ?)
//- memoizzazione intermedia ( React.useMemo, React.useCallback)
//portare "su"  una computazione sui dati
// es: invece di passare l'id della riga selezionata a tutte le righe,
//    passiamo al componente  riga solo un booleano che dice se e selezionata o meno
//    (esempio di "least responsability principle")
//- portare "giu"  i callback
// es: invece di passare una callback "onSelect()" al componente riga ( ovvero ogni riga avrà un'istanza diversa della funzione onSelect)

//const makeOnSelect= (idRiga) =>() =>selezionaRiga(idRiga)
//<Riga onSelect={makeOnSelect(1)}/>

//const onSelect =(idRiga) => selezionaRiga(idRiga)
//<Riga onSelect={onSelect} idRiga={1}/>

//    //L'esempio è come dire ti passo un faglio con le istruzioni di scavare e dove O ti passo 2 fogli con scritto su uno di scavare e su un altro
//    // di dove scavare.

//    // Nel primo caso degli esempi viene creata una istanza ogni volta che si esegue. Nel secondo caso si crea una solo istanza di onSelect e
//    //si passano poi i parametri idRiga
