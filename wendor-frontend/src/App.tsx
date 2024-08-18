import { RouterProvider } from 'react-router-dom'
import './App.css'
import RouterLinks from './router/Routes'
function App() {

  return (
    <>
      <RouterProvider router={RouterLinks} />
    </>
  )
}

export default App
