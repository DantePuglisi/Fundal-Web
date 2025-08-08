import { Routes, Route } from "react-router-dom";
import Cards from './components/cards'
import Form from './components/forms/Form'
function App() {

  return (
      <div className='flex flex-col items-center justify-center mt-3'>
        <div className='text-center mt-[55px] mb-[50px]'>
          <h1 className='font-poppins text-3xl font-bold' style={{ fontFamily: 'Poppins' }}>Fundal</h1>
          <p className='text-gray-600 font-poppins font-bold text-2xl' style={{ fontFamily: 'Poppins' }}>Seleccione la aplicación</p>
        </div>
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/app/:id" element={<Form />} />
        </Routes>
      </div>
  )
}

export default App
