import { Routes, Route } from "react-router-dom";
import Cards from './components/cards'
import Form from './components/forms/Form'
function App() {

  return (
      <div className='flex flex-col items-center justify-center mt-8'>
        <div className='text-center mt-[55px] mb-[50px]'>
          <h1 className='text-2xl font-bold'>Fundal</h1>
          <p className='text-gray-600'>Seleccione la aplicación</p>
        </div>
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/app/:id" element={<Form />} />
        </Routes>
      </div>
  )
}

export default App
