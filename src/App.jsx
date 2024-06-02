import { useState } from 'react'
import { Main } from './components/main'
import AppContext from './context/AppContext'
import useInitialState from './hooks/useInitialState'

function App() {
  const initialState = useInitialState()
  
  return (
    <AppContext.Provider value={initialState}>
      <div className='main-container'>
        <Main />
      </div>
    </AppContext.Provider>
  )
}

export default App
