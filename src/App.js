import { useEffect, useState } from "react";
import "./App.css";
import BooksList from "./BooksList";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setPage(page + 1);
    setLoading(true);
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    setLoading(true);
    async function getBooks() {
      const data = await fetch(
        "https://openlibrary.org/search.json?q=" + search + "&page=" + page
      );
      const { docs } = await data.json();
      setBooks([...books, ...docs]);
      setLoading(false);
    }
    const timer = setTimeout(() => {
      getBooks();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [search, page]);
  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
          setBooks([]);
        }}
      ></input>

      {loading ? (<>
        <BooksList books={books} />
        <h6>Loading...</h6>
      </>
      ) : books.length == 0 ? (
        <h6>No books found!</h6>
      ) : (
        <BooksList books={books} />
      )}
    </div>
  );
}

export default App;
