import React, { useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Post', body: 'Description'},
    {id: 2, title: 'Post2', body: 'Description'},
    {id: 3, title: 'Post3', body: 'Description'}
  ]);

const [title, setTitle] = useState('ttt')
  //делаем стрелочной функцией
  const addNewPost = (e) => 
  //предотвращаем действие по умолчанию
    e.preventDefault()
    console.log(title)

  return (
    <div className="App">
      <form>
        {/* управляемый компонент */}
          <MyInput 
            value={title}
            // отслеживаем что вводится в инпут, двусторонее связывыние
            onChange={e => setTitle(e.target.value)}
            type="text" 
            placeholder="Название поста"
            />
          <MyInput type="text" placeholder="Описание поста"/>
          <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Список постов 1"/>
    </div>
  );
}

export default App;
