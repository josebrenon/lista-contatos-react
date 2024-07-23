/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

export default function Contato(props) {
  return (
    <div>
      {props.nome} - {props.telefone}
      <button
        onClick={() => {
          props.remover(props.id);
        }}
      >
        Remover
      </button>
    </div>
  );
}
