import { RouteF } from './RouteF'
import { QueryProvider } from './providers'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <RouteF />
      </BrowserRouter>
    </QueryProvider>
  )
}

export default App
