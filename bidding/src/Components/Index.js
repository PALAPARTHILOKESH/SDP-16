import React from "react";
import "../App.css";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes } from "react-router-dom";
import Profile from "./Profile";

function Index() {
  return (
    <div>
     <Sidebar/>
     
    </div>
    
  );
}

export default Index;