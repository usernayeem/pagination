import React, { useState, useEffect } from "react";
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

      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              onClick={() =>
                currentPage !== 1
                  ? setCurrentPage(currentPage - 1)
                  : setCurrentPage(currentPage)
              }
            >
              Prev
            </a>
          </li>

          {pagiNum.map((number) => {
            return (
              <li
                className={`page-item ${currentPage === number ? "active" : ""
                  }`}
                keys={number}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCPage(number)}
                >
                  {number}
                </a>
              </li>
            );
          })}

          <li className="page-item">
            <a
              href="#"
              className="page-link"
              onClick={() =>
                currentPage !== nPage
                  ? setCurrentPage(currentPage + 1)
                  : setCurrentPage(currentPage)
              }
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );

  function changeCPage(id) {
    setCurrentPage(id);
  }
};

export default App;
