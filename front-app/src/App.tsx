import Cards from './components/cards'
function App() {

  return (
    <>
      <div className='flex flex-col items-center justify-center mt-8'>
        <div className='text-center mt-[75px] mb-[50px]'>
            <h1 className='text-2xl font-bold'>Fundal</h1>
            <p className='text-gray-600'>Seleccione la aplicación</p>
        </div>
        <Cards />
      </div>
    </>
  )
}

export default App
