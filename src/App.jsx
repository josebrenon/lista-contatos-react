// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import Contato from "./components/Contato";
import { v4 as uuid } from "uuid";
// import ListaContatos from "./components/ListaContatos";

export default function App() {
  const listaStorage = localStorage.getItem("Lista");
  //* States
  const [contato, setContato] = useState({ id: "", nome: "", telefone: "" });
  const [listaContatos, setListaContatos] = useState(
    listaStorage ? JSON.parse(listaStorage) : []
  );

  //* Guardando do local storage
  useEffect(() => {
    localStorage.setItem("Lista", JSON.stringify(listaContatos));
  }, [listaContatos]);

  //* Ref
  const inputNome = useRef();
  const inputTelefone = useRef();

  //* Funções

  function definirNome(event) {
    setContato({ ...contato, nome: event.target.value });
  }

  function definirTelefone(event) {
    setContato({ ...contato, telefone: event.target.value });
  }

  function addContato() {
    // form.preventDefault();
    if (contato.nome === "" || contato.telefone === "") return;

    let duplicado = listaContatos.find(
      (ct) => ct.nome === contato.nome && ct.telefone === contato.telefone
    );
    if (typeof duplicado !== "undefined") {
      alert("Esse contato já existe");
      inputTelefone.current.focus();
      return;
    }

    setListaContatos([...listaContatos, { ...contato, id: uuid() }]);
    setContato({ nome: "", telefone: "" });
    inputNome.current.focus();
  }
  // function enter(event) {
  //   if (event.code === "Enter" || event.code === "NumpadEnter") {
  //     addContato();
  //   }
  // }

  // useEffect(() => {
  //   if (localStorage.getItem("meus_contatos") !== null) {
  //     setListaContatos(JSON.parse(localStorage.getItem("meus_contatos")));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("meus_contatos", JSON.stringify(listaContatos));
  // }, [listaContatos]);

  function limparLista() {
    setListaContatos([]);
  }

  function removerContato(id) {
    let tmp = listaContatos.filter((ct) => ct.id !== id);
    setListaContatos(tmp);
  }

  return (
    <>
      <h1>Lista de Contatos - React</h1>
      <hr />
      {/* Input text */}
      {/* <form onSubmit={addContato}> */}
      <div>
        <label>Nome:</label> <br />
        <input
          type="text"
          ref={inputNome}
          onChange={definirNome}
          value={contato.nome}
        />
      </div>
      <div>
        <label>Telefone:</label> <br />
        <input
          type="number"
          ref={inputTelefone}
          onChange={definirTelefone}
          onKeyUp={(event) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
              addContato();
            }
          }}
          value={contato.telefone}
        />
      </div>
      <button onClick={addContato}>Adicionar contato</button>
      <button onClick={limparLista}>Limpar lista</button>
      {/* </form> */}
      <hr />
      {/*//? Formas de renderizar a lista de contatos
       <ListaContatos listaContatos={listaContatos} /> 
       <ul>
        {listaContatos.map((ct) => {
          return <li key={ct.telefone}>{`${ct.nome} | ${ct.telefone}`}</li>;
        })}
        </ul> */}
      {/* //? Apresentação da lista de contatos */}
      {listaContatos.map((ct) => {
        return (
          <Contato
            key={ct.id}
            id={ct.id}
            nome={ct.nome}
            telefone={ct.telefone}
            remover={removerContato}
          />
        );
      })}
    </>
  );
}
