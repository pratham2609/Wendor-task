import './App.css'
import useScrollToTop from './hooks/scrollToTop';
import Router from './router/Router'
function App() {
  useScrollToTop();
  return (
    <Router />
  )
}

export default App
