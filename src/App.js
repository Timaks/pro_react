import React, { useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";

function App() {
  //возвращает масссив из двух объектов(значение и функция)
  const [value, setValue] = useState('текст в инпуте');

  return (
    <div className="App">
       <ClassCounter/>
    </div>
  );
}

export default App;
