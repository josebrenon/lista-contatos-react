/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { v4 as uuid } from "uuid";
export default function ListaContatos({ listaContatos }) {
  return (
    <>
      <ul>
        {listaContatos.map((contato) => {
          return <li key={uuid()}>{contato.nome + " " + contato.telefone}</li>;
        })}
      </ul>
    </>
  );
}
