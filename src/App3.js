import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
      console.log(posts);
    };
    fetchData();
  }, []);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const lastItemInPage = currentPage * itemsPerPage;
  const firstItemInPage = lastItemInPage - itemsPerPage;
  const items = posts.slice(firstItemInPage, lastItemInPage);
  const nPage = Math.ceil(posts.length / itemsPerPage);
  const pagiNum = [...Array(nPage + 1).keys()].slice(1);

  return (
    <>
      <div className="cards">
        {items.map((post) => (
          <div id={post.id} className="card">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      <Pagination
        count={nPage}
        color="secondary"
        variant="outlined"
        onChange={(e, value) => setCurrentPage(value)}
      />
    </>
  );

  function changeCPage(id) {
    setCurrentPage(id);
  }
};

export default App;
