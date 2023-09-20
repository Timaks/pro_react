import React, { useRef, useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Post', body: 'Description'},
    {id: 2, title: 'Post2', body: 'Description'},
    {id: 3, title: 'Post3', body: 'Description'}
  ]);


const createPost = (newPost) => {
  // изменяем состояние, к постам добавляем новый пост
  setPosts([...posts, newPost])
}


  return (
    <div className="App">
      {/* передаем ф-ию обратного вызова */}
      <PostForm create={createPost}/>
      <PostList posts={posts} title="Список постов 1"/>
    </div>
  );
}

export default App;
