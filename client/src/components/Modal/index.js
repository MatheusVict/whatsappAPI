import React, { useState, useEffect } from "react";
import { Container, ModalBox, FinishButton, Background } from "./styles";
import { io } from "socket.io-client";
import { useModalContext } from "../../modal.context";

function Modal() {
  const {
    modalState: { message, visible },
    openModal,
    closeModal,
  } = useModalContext();

  const [username, setUsername] = useState();
  const [qrGenerated, setQrStatus] = useState(false);
  const [userkey, setKey] = useState();
  const [html, setHTML] = useState("");
  const socket = io("http://localhost:3001");

  const initIns = (e) => {
    fetch(
      // faz uma requisição para a API "cadastrando" o usuário
      `${process.env.REACT_APP_URL}/instance/initUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          key: username,
          token: process.env.REACT_APP_SECRET_TOKEN,
          userToken: localStorage.getItem("userToken"),
        }),
      }
    ).then(async (res) => {
      let data = await res.json();
      let parser = new DOMParser(); // a requisição retorna um código HTML no formato de uma string

      var doc = parser.parseFromString(data.qrdata, "text/html"); // converte a string em formato HTML
      let qrcode = doc.getElementById("qrcode_box").src; // busca somente o link do qrcode gerado pela API 

      setKey(data.key); // define a instância do usuário
      setQrStatus(true); // diz que o qrcode já foi gerado
      setHTML(qrcode); // link do qrcode
    });

    e.preventDefault();
  };

  useEffect(() => {
    // Função para escutar o websocket enviado do backend, se o socket contendo a key for recebido, significa que o usuário escaneou o QRCODE
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 3001);
    });

    socket.on("key", (data) => {
      if (data == userkey) {
        // se a key recebida pelo socket for igual a key já registrada pelo usuário na função initIns, => (é possivel do usuário receber multiplos sockets de multiplos usuáruios fazendo login ao mesmo tempo)
        closeModal(); // fecha o modal do QRCODE e dá reload na página
        window.location.reload(false);
      }
    });
  }, [userkey]); // esse hook é disparado toda vez que o valor do estado userKey é alterado

  return (
    <Container>
      <Background onClick={() => closeModal()} />
      <ModalBox>
        <form onSubmit={initIns}>
          <input
            type="text"
            name="username"
            placeholder="Seu nome.."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input type="submit" className="submitButton" />
        </form>
        {qrGenerated && (
          <>
            <img src={html} />
            {/** renderiza o qr code, a partir do momento em que o qrcode for escaneado, os dados do usuário serão salvos no banco de dados */}
          </>
        )}
      </ModalBox>
    </Container>
  );
}

export default Modal;
