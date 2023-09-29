import React, { useEffect, useState } from "react";
// параметр получение поста по id
import { useParams } from "react-router-dom";
import useFetching from "../hooks/useFetching";
import PostService from "../API/PostService";
import { async } from "q";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    //состояние поста
    const [post, setPost] = useState({});
    //отправка запроса(функция, загрузка, ошибки)
    const [fetchPostById, isLoading, error] = useFetching( async(id) => {
        const response = await PostService.getById(params.id)
        setPost(response.data);
    })
    // С первой отрисовкой документа получаем данные с сервера
    useEffect(() => {
        fetchPostById(params.id)
    }, [])
    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
                :<div>{post.id}.{post.title}</div>
            }
            
        </div>
    )
}

export default PostIdPage;