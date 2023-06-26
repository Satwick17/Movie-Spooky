import Header from "./components/Header";
import Cards from "./components/Cards";
import { Route, Routes } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Details from "./components/Details";
import { createContext, useState } from "react";
import Login from './components/Login';
import Signup from './components/Signup';

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUsername] = useState("");

  return (
    <Appstate.Provider value = {{login, userName, setLogin, setUsername}}>
    <div className="App relative">
     <Header/>
     <Routes>
      <Route path="/" element ={<Cards/>} />
      <Route path="/addmovie" element ={<AddMovie/>} />
      <Route path="/details/:id" element ={<Details/>} />
      <Route path="/login" element ={<Login/>} />
      <Route path="/signup" element ={<Signup/>} />
     </Routes>
   
    </div>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate };
