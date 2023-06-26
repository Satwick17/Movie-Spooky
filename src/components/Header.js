import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";
import { useContext } from "react";

const Header = () => {
  const useAppstate = useContext(Appstate);
  
  return (
    <div className="sticky z-10 header top-0 text-3xl flex justify-between items-center text-white font-bold p-3 border-b-2 border-blue-300">
      <Link to={"/"}>
        <span>
          Movie<span className="text-blue-700">Spooky</span>
        </span>
      </Link>
      { useAppstate.login ? 
        <Link to={"/addmovie"}>
        <h1 className="text-lg text-white cursor-pointer flex items-center">
          <Button>
            <AddIcon className="mr-1" color="inherit" />
            <span className="text-white">Add New</span>
          </Button>
        </h1>
      </Link>
      :
      <Link to={"/login"}>
        <h1 className="text-lg text-white cursor-pointer bg-blue-900 flex items-center hover:bg-blue-950 rounded-sm">
          <Button>
            
            <span className="text-white font-medium capitalize">Login</span>
          </Button>
        </h1>
      </Link>
      }
    </div>
  );
};

export default Header;
