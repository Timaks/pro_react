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
// получаем post из дочернего компонента
const removePost = (post) => {

  setPosts(posts.filter(p => p.id !== post.id))
}


  return (
    <div className="App">
      {/* передаем ф-ию обратного вызова */}
      <PostForm create={createPost}/>
      
    {/* условная отрисовка */}
      {posts.length !==0
        ? <PostList remove={removePost} posts={posts} title="Список постов 1"/>
        : <h1 style={{textAlign: 'center'}}>
            Посты не найдены
          </h1>
      }
      
    </div>
  );
}

export default App;
