import { RouteF } from './RouteF'
import { QueryProvider } from './providers'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { GlobalProvider } from './context/globalContext'

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <GlobalProvider>
          <BrowserRouter>
            <RouteF />
          </BrowserRouter>
        </GlobalProvider>
      </AuthProvider>
    </QueryProvider>
  )
}

export default App
