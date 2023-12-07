import React from 'react'

const BooksList = ({books}) => {
  console.log(books);
  // if (!books.length) return <h1>No books found</h1>
  return books.length?(
    <div>
      {books.map((val) => {
        return <li key={val.key}>{val.title}</li>
      })}
    </div>
  ):null
}

export default BooksList
