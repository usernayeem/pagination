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

  return (
    <>
      <div className="cards">
        {items.map((post, i) => (
          <div key={i} className="card">
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
          <li className="page-item">
            <a href="#" className="page-link" onClick={() => setCurrentPage(1)}>
              {1}
            </a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link">
              ...
            </a>
          </li>
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
              {currentPage - 1}
            </a>
          </li>
          <li className="page-item active">
            <a href="#" className="page-link">
              {currentPage}
            </a>
          </li>
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
              {currentPage + 1}
            </a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link">...</a>

          </li>
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              onClick={() => setCurrentPage(nPage)}
            >
              {nPage}
            </a>
          </li>
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
};

export default App;
