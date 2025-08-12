import { Routes, Route } from "react-router-dom";
import Cards from './components/cards'
import Form from './components/forms/Form'
import AcoplamientoApp from "./components/appsComponents/AcoplamientoApp";
import ErrorBoundary from "./components/ErrorBoundary";
import logo from '../public/logo.png'
function App() {

  return (
      <ErrorBoundary>
        <div className='flex flex-col items-center justify-center mt-3'>
          <div className='text-center mt-[55px] mb-[50px]'>
            <img src={logo} alt="fundal-logo" className="w-xs" />
          </div>
          <Routes>
            <Route path="/" element={<Cards />} />
            <Route path="/app/:id" element={<Form />} />
            <Route path="/acoplamiento" element={<AcoplamientoApp />} />
          </Routes>
        </div>
      </ErrorBoundary>
  )
}

export default App
