import React, { useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css';

function App() {
  //возвращает масссив из двух объектов(значение и функция)
  const [value, setValue] = useState('текст в инпуте');

  return (
    <div className="App">
      <div className="post">
        <div className="post__content">
          <strong>Типы:</strong>
          <div>1 тип</div>
        </div>
        <div className="post__btns">
          <button>Удалить</button>
        </div>

      </div>
    </div>
  );
}

export default App;
