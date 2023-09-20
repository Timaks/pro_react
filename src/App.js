import React, { useRef, useState } from "react";
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


const [post, setPost] = useState({title: '', body: ''})


  const addNewPost = (e) => {
    e.preventDefault()
 
    //разворачиваем старый массив и добавляем к нему новые посты с id
    setPosts([...posts, {...post, id: Date.now()}])
    setPost({title: '', body: ''})
  }

  return (
    <div className="App">
      <form>
        {/* управляемый компонент */}
          <MyInput 
            value={post.title}
            // отслеживаем что вводится в инпут, двусторонее связывыние/ передаем объект
            onChange={e => setPost({...post, title: e.target.value})}
            type="text" 
            placeholder="Название поста"
            />
            {/* Неуправляемый\ Неконтролируемый компонент */}
          <MyInput 
            value={post.body}
            onChange={e => setPost({...post, body: e.target.value})}
            type="text" 
            placeholder="Описание поста"
            />
          <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Список постов 1"/>
    </div>
  );
}

export default App;
