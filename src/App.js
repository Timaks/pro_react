import React, { useMemo, useRef, useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'APost', body: 'Description'},
    {id: 2, title: 'SPost2', body: 'ADescription'},
    {id: 3, title: 'BPost3', body: 'SDescription'}
  ]);

const [filter, setFilter] = useState({sort: '', query: ''})
const [modal, setModal] = useState(false);


//кеширование
const sortedPosts =  useMemo( () => { 
  console.log('отработала ф-ция')
  if (filter.sort) {
    return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
}
    return posts;
}, [filter.sort, posts])


//отсортированный массив, возвращаем только то что вводится в запросе(регистр+)
const sortedAndSearchedPosts = useMemo( () => {
    return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(filter.query))
}, [filter.query, sortedPosts])

const createPost = (newPost) => {
  // изменяем состояние, к постам добавляем новый пост
  setPosts([...posts, newPost])
  setModal(false)
}  
// получаем post из дочернего компонента
const removePost = (post) => {

  setPosts(posts.filter(p => p.id !== post.id))
}


  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>

      {/* передаем ф-ию обратного вызова */}
      
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1"/>
    </div>
  );
}

export default App;
