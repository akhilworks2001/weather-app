import './App.css';
import { Route, Routes } from 'react-router';
import Home from "./pages/Home";
import Pagenotfound from './pages/Pagenotfound';
import Footer from './layout/Footer';
import Main from './layout/Main';
import Header from './layout/Header';


function App() {
  return (
    <>
    <Header />
    <Main />
    <Footer />
    </>
  );
}

export default App;
