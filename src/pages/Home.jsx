import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseApiUrl } from "../constants/apiUrl.js";

const CardsContainer = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 인덱스
  const itemsPerPage = 4; // 한 페이지에 표시할 아이템 수
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseApiUrl}/api/v1/bookCategory/bring/${id}`,
        );
        setBooks(response.data);
        setCurrentPage(0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0)); // 이전 페이지로 이동
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(books.length / itemsPerPage) - 1),
    ); // 다음 페이지로 이동
  };
  const handleCardClick = (bookId) => {
    window.location.href = `/book/${bookId}`;
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {books
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((book, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(book.bookId)}
              style={{
                flex: "0 0 auto",
                width: "305px",
                height: "700px",
                margin: "10px",
                border: "2px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={`/img/images/${book.isbn}.jpg`}
                alt="책 사진"
                className="book-image"
                style={{ width: "300px", height: "50%", marginRight: "50px" }}
              />
              <div className="card-content" style={{ padding: "10px" }}>
                <p className="title">{book.itemName}</p>
                <p>작가 : {book.author}</p>
                <p>출판사 : {book.publisher}</p>
                <p>가격 : {book.price} 원</p>
                <p>
                  {book.category.map((category, index) => (
                    <React.Fragment key={index}>
                      {category}
                      {index < book.category.length - 1 && " > "}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(books.length / itemsPerPage) - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardsContainer;
