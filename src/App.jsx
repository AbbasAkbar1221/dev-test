import { useState } from "react";
import "./App.css";
import Posts from "./components/Posts";

function App() {
  return (
    <>
      <div>
        <h1 className="text-4xl text-center mt-2">Instagram</h1>
      </div>
      <div className="m-4">
        <Posts />
      </div>
    </>
  );
}

export default App;
