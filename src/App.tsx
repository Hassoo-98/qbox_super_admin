import { RouteF } from './RouteF'
import { QueryProvider } from './providers'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
     <QueryProvider>
     <AuthProvider>
   
   
      <BrowserRouter>
        <RouteF />
      </BrowserRouter>
 

       </AuthProvider>
           </QueryProvider>
  )
}

export default App
