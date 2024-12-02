import InputForms from "../components/InputComponent/InputForms";
import { Link, useNavigate } from "react-router-dom";
import Background_login from "../assets/background_login.jpg";
import { useState, useRef } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import api from "../services/api";

function Home() {
  const [inputTypePassword, setInputTypePassword] = useState("password");
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();

  const handleIconPasswordView = (e: React.MouseEvent) => {
    e.preventDefault();
    setInputTypePassword((prev) => (prev === "password" ? "text" : "password"));
  };

  const tryLogin = async (e: React.MouseEvent) => {
      e.preventDefault()
      const email = emailRef.current?.value
      const password = passwordRef.current?.value


      try{
      const response = await api.post('/user/login', {
        email: email,
        password: password
      })

      if(response.status == 200){
        navigate("/listaruser")
      }

      if(emailRef.current) emailRef.current.value = ''
      if(passwordRef.current) passwordRef.current.value = ''
    }
    catch(err){
      alert(err)
    }
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center font-Titillium">
      <div className="w-full h-screen bg-black z-10 bg-opacity-40 absolute"></div>
      <img
        src={Background_login}
        alt="Background tela de login"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <form className="flex flex-col gap-6 bg-white bg-opacity-90 rounded-lg shadow-xl w-full max-w-lg p-8 items-center z-20">
        <h1 className="text-4xl text-center font-bold text-blue-700 mb-4 border-b border-gray-300 pb-2 w-[80%]">
          Bem vindo de volta! <br /> Faça seu Login
        </h1>
        <div className="w-full flex flex-col gap-4 items-center">
          <InputForms label="Email:" type="text" placeholder="Digite seu email" ref={emailRef}/>
          <InputForms label="Senha:" type={inputTypePassword} placeholder="Digite sua senha" ref={passwordRef}>
            <button
              type="button"
              onClick={handleIconPasswordView}
              className="text-gray-500 hover:text-blue-500 focus:outline-none"
            >
              {inputTypePassword === "password" ? (
                <EyeIcon className="w-5 h-5" />
              ) : (
                <EyeSlashIcon className="w-5 h-5" />
              )}
            </button>
          </InputForms>
          <button onClick={tryLogin} className="w-[90%] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:scale-105 hover:shadow-xl">
            Logar
          </button>
        </div>
        <Link to="/cadastro" className="text-gray-500 transition font-medium mt-4">
          Não possui uma conta?{" "}
          <span className="text-blue-500 hover:text-blue-600 hover:underline">
            Cadastre-se
          </span>
        </Link>
      </form>
    </div>
  );
}

export default Home;
