import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import ListarUser from './pages/ListarUser'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/cadastro" element={<Cadastro/>}/>
          <Route path="/listaruser" element={<ListarUser/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
