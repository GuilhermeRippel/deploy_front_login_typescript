import { Link } from "react-router-dom"

interface prop{
    route: string
}

function buttonBack({route}: prop) {
  return (
    <Link to={route}>
        <div className='bg-blue-500 w-20 h-12 z-20 absolute left-5 bottom-7 rounded-lg text-white flex items-center justify-center font-bold cursor-pointer'>Voltar</div>
    </Link>
  )
}

export default buttonBack