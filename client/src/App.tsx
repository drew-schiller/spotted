import { useState } from 'react'
import "./styles/App.sass"
import LandingPage from './pages/LandingPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     <div className="app">
      <LandingPage ></LandingPage>
     </div>
    </>
  )
}

export default App
