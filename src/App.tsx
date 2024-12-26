import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './routes/AppRoutes'; 

const queryClient = new QueryClient();

function App() {
  return (
     <>
         <QueryClientProvider client={queryClient}>
            <AppRoutes />
        </QueryClientProvider>
     </>
  )
}

export default App
