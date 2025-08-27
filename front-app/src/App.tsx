import { Routes, Route } from "react-router-dom";
import Cards from './components/cards'
import Form from './components/forms/Form'
import AcoplamientoApp from "./components/appsComponents/AcoplamientoApp";
import ErrorBoundary from "./components/ErrorBoundary";
import logo from '../public/logo.png'
function App() {

  return (
      <ErrorBoundary>
        <div className='min-h-screen bg-gray-50'>
          <div className='flex flex-col items-center pt-16'>
            <div className='text-center mb-6'>
              <img src={logo} alt="fundal-logo" className="w-xs mx-auto" />
            </div>
            <Routes>
              <Route path="/" element={<Cards />} />
              <Route path="/app/:id" element={<Form />} />
              <Route path="/acoplamiento" element={<AcoplamientoApp />} />
            </Routes>
          </div>
        </div>
      </ErrorBoundary>
  )
}

export default App
