import './App.css'
import { RouterProvider } from 'react-router-dom'
import RouterLinks from './router/Routes'

function App() {
  return (
    <RouterProvider router={RouterLinks} />
  )
}

export default App
