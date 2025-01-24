import Home from "../../assets/Home.svg?react";
import Graph from "../../assets/Graph.svg?react";
import Bag from "../../assets/Bag.svg?react";
import Setting from "../../assets/Setting.svg?react";
import Logo from "../../assets/Logo.svg?react";

import "./Navigation.css";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <Logo className="logo" />
        <li className="active">
          <Home />
        </li>
        <li>
          <Graph className="locked" />
        </li>
        <li>
          <Bag className="locked" />
        </li>
        <li>
          <Setting className="locked" />
        </li>
      </ul>
    </nav>
  );
};
