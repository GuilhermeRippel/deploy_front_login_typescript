import Background_login from '../assets/background_login.jpg'
import ButtonBack from '../components/buttonBack/buttonBack';
import { useState, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
}


function ListarUser() {
  const [userList, setUserList] = useState<User[]>([])

    const deleteUser = async (id: number) => {
        try{
          const userDelete = await api.delete(`/user/deletarUsuario/${id}`)
          console.log(userDelete)
          setUserList((prevList) => prevList.filter((user) => user.id !== id));
        }
        catch(err){
          console.log("Erro ao deletar usuário", err)
        }
    }

  const getUsers = async () => {
    try{
      const response = await api.get("/user/listarUsuarios")
      if (response.data && Array.isArray(response.data)) {
        setUserList(response.data);
      } else {
        console.error("Resposta da API não contém usuários válidos:", response.data);
        setUserList([])
      }
    }
    catch(err){
      console.log("Erro ao buscar usuários!", err)
    }
  }

  useEffect(() => {   
    getUsers()
  }, [])
  
  
  return (
    <div className='relative w-full min-h-screen bg-orange-200 flex items-center justify-center'>
      <ButtonBack route="/cadastro"/>
      <div className="w-full h-screen bg-black z-10 bg-opacity-40 absolute"></div>
      <img 
      src={Background_login} 
      alt="Fundo do site" 
      className='absolute inset-0 w-full h-full object-cover z-0'/>
      <div className='absolute w-3/4 h-[90%] bg-white z-20 rounded-lg bg-opacity-80 overflow-y-scroll p-5 text-center'>
      <h1 className="text-3xl font-bold mb-4 text-center">Lista de Usuários</h1>
        {userList.length > 0 ? (
          <ul className="w-full h-[90%] flex flex-col items-center justify-start p-5">
            {userList.map((user) => (
              <div  key={user.id} className='w-[85%] flex flex-col items-center justify-start px-5 py-2 font-Titillium'>
                <li className="w-full h-14 bg-white rounded-xl shadow-lg flex justify-between items-center py-4 px-10">
                    <p className='text-lg text-gray-800'><span className='font-bold text-xl mr-2 text-black'>Nome:</span>{user.name}</p>
                    <p className='text-lg text-gray-600'><span className='font-bold text-xl mr-2 text-black'>Email:</span>{user.email}</p>
                    <p onClick={() => deleteUser(user.id)} className='font-bold text-xl cursor-pointer'>X</p>
                </li>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-center">Nenhum usuário encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default ListarUser;
