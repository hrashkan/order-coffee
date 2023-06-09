import { useState, useEffect } from "react"
import route from "../routes"
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import { useRoutes } from 'react-router-dom'
import './App.css'

function App() {
  const routes = useRoutes(route)

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header
        scrollPosition={scrollPosition}
      />
      {routes}
      <Footer />
    </>
  )
}

export default App
