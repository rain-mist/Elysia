import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import './index.css'
import { Home, Login, Logout, Register } from './components'

const App = () => {
  // const [count, setCount] = useState(0)

  return (
    <>
    <div className='min-h-screen'>
      <div className='gradient-bg-welcome'>
        <Home />
      </div>

      {/* <h1 className='text-3xl font-bold underline'>
        hello world
      </h1> */}
    </div>
    </>
  )
}

export default App
