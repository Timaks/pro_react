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

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'APost', body: 'Description'},
    {id: 2, title: 'SPost2', body: 'ADescription'},
    {id: 3, title: 'BPost3', body: 'SDescription'}
  ]);

//двустороннее связывание
const [selectedSort, setSelectedSort] = useState('')

const [searchQuery, setSearchQuery] = useState('')

//кеширование
const sortedPosts =  useMemo( () => { 
  console.log('отработала ф-ция')
  if (selectedSort) {
    return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
}
    return posts;
}, [selectedSort, posts])


//отсортированный массив, возвращаем только то что вводится в запросе(регистр+)
const sortedAndSearchedPosts = useMemo( () => {
    return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(searchQuery))
}, [searchQuery, sortedPosts])

const createPost = (newPost) => {
  // изменяем состояние, к постам добавляем новый пост
  setPosts([...posts, newPost])
}  
// получаем post из дочернего компонента
const removePost = (post) => {

  setPosts(posts.filter(p => p.id !== post.id))
}

const sortPosts = (sort) => {
    setSelectedSort(sort);
}
  return (
    <div className="App">
      {/* передаем ф-ию обратного вызова */}
      <PostForm create={createPost}/>
    <hr style={{margin: '15px 0'}}/>
      <div>
       <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Поиск..."
       />
          <MySelect
              value={selectedSort}
              // опция что выбрал пользователь
              onChange={sortPosts}
              defaultValue="Сортировка"
              options={[
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
              ]}
          />
      </div>
    {/* условная отрисовка */}
      {sortedAndSearchedPosts.length
        ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1"/>
        : <h1 style={{textAlign: 'center'}}>
            Посты не найдены
          </h1>
      }
      
    </div>
  );
}

export default App;
