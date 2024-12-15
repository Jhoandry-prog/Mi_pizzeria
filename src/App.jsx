import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App
