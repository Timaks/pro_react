import { useMemo } from "react";

export const UseSortedPosts = (posts, sort) => {
    //кеширование
const sortedPosts =  useMemo( () => { 
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
  }
    return posts;
  }, [sort, posts])

    return sortedPosts;
}

export const usePosts = (post, sort, query) => {

    const sortedPosts = UseSortedPosts(post, sort);
    //отсортированный массив, возвращаем только то что вводится в запросе(регистр+)
    const sortedAndSearchedPosts = useMemo( () => {
        return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(query))
    }, [query, sortedPosts])

    return sortedAndSearchedPosts;
}