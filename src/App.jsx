import { Home, Expenses, Header } from './components'
import { Routes, Route } from 'react-router-dom'
import { Incomes } from './components/Incomes'

function App() {

  return (
    <>
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/incomes" element={<Incomes />} />

    </Routes>
    </>
  )
}

export default App
