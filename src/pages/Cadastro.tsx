import InputForms from "../components/InputComponent/InputForms";
import { Link } from "react-router-dom";
import Background_login from "../assets/background_login.jpg";
import { useState, useRef } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";

function Cadastro() {
  const [inputTypePassword, setInputTypePassword] = useState("password");
  const [inputTypePasswordConfirm, setInputTypePasswordConfirm] =
    useState("password");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  const handleIconPasswordView = (e: React.MouseEvent) => {
    e.preventDefault();
    setInputTypePassword((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleIconPasswordViewConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    setInputTypePasswordConfirm((prev) =>
      prev === "password" ? "text" : "password"
    );
  };

  const tryCadastro = async (e: React.MouseEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const password2 = password2Ref.current?.value;

    
    if (!name || !email || !password || !password2) {
      toast.error("Preencha todos os campos!", {
        position: "top-center", // Posição da notificação
        autoClose: 3000, // Tempo para desaparecer (em ms)
        hideProgressBar: false, // Exibir barra de progresso
        closeOnClick: true, // Fecha ao clicar
        pauseOnHover: true, // Pausa a contagem ao passar o mouse
        draggable: true, // Permite arrastar
        progress: undefined, // Barra de progresso automática
        theme: "colored", // Tema colorido
      });
      return;
    }
    if (password != password2) {
      toast.error("As senhas devem coincidir",{
        position: "top-center", // Posição da notificação
        autoClose: 3000, // Tempo para desaparecer (em ms)
        hideProgressBar: false, // Exibir barra de progresso
        closeOnClick: true, // Fecha ao clicar
        pauseOnHover: true, // Pausa a contagem ao passar o mouse
        draggable: true, // Permite arrastar
        progress: undefined, // Barra de progresso automática
        theme: "colored", // Tema colorido
      })
      return 
    }
    
    try {
      const response = await api.post("/user/cadastro", {
        name: name,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        toast.success("Usuário Cadastrado! Faça login", {
          position: "top-center", // Posição da notificação
          autoClose: 3000, // Tempo para desaparecer (em ms)
          hideProgressBar: false, // Exibir barra de progresso
          closeOnClick: true, // Fecha ao clicar
          pauseOnHover: true, // Pausa a contagem ao passar o mouse
          draggable: true, // Permite arrastar
          progress: undefined, // Barra de progresso automática
          theme: "colored", // Tema colorido
        });
      }

      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
      if (password2Ref.current) password2Ref.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center font-Titillium">
      <ToastContainer />
      <div className="w-full h-screen bg-black z-10 bg-opacity-40 absolute"></div>
      <img
        src={Background_login}
        alt="Background tela de login"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <form className="flex flex-col gap-6 bg-white bg-opacity-90 rounded-lg shadow-xl w-full max-w-lg p-8 items-center z-20">
        <h1 className="text-4xl text-center font-bold text-blue-700 mb-4 border-b border-gray-300 pb-2 w-[80%]">
          Bem vindo! <br /> Faça seu Cadastro
        </h1>
        <div className="w-full flex flex-col gap-4 items-center">
          <InputForms
            label="Usuário:"
            type="text"
            placeholder="Digite seu usuário"
            ref={nameRef}
          />
          <InputForms
            label="Email"
            type="email"
            placeholder="Digite seu email"
            ref={emailRef}
          />
          <InputForms
            label="Senha:"
            type={inputTypePassword}
            placeholder="Digite sua senha"
            ref={passwordRef}
          >
            <button
              type="button"
              onClick={handleIconPasswordView}
              className="text-gray-500 hover:text-blue-500 focus:outline-none"
            >
              {inputTypePassword === "password" ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </InputForms>
          <InputForms
            label="Confirme sua senha:"
            type={inputTypePasswordConfirm}
            placeholder="Confirme sua senha"
            ref={password2Ref}
          >
            <button
              type="button"
              onClick={handleIconPasswordViewConfirm}
              className="text-gray-500 hover:text-blue-500 focus:outline-none"
            >
              {inputTypePasswordConfirm === "password" ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </InputForms>
          <button
            onClick={tryCadastro}
            className="w-[90%] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            Cadastrar
          </button>
        </div>
        <Link to="/" className="text-gray-500 transition font-medium mt-4">
          Já possui uma conta?{" "}
          <span className="text-blue-500 hover:text-blue-600 hover:underline">
            Faça Login!
          </span>
        </Link>
      </form>
    </div>
  );
}

export default Cadastro;
