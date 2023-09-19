import React, { useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css';
import PostItem from "./components/PostItem";

function App() {
  //возвращает масссив из двух объектов(значение и функция)
  const [value, setValue] = useState('текст в инпуте');

  return (
    <div className="App">
      <PostItem post={{id: 1, title: 'Post', body: 'Description'}}/>
      <PostItem post={{id: 2, title: 'Post2', body: 'Description'}}/>
      <PostItem post={{id: 3, title: 'Post3', body: 'Description'}}/>
    </div>
  );
}

export default App;
