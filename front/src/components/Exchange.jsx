import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Exchange = () => {
  
  const [exchangeList, setExchangeList] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = filteredList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredList.length / 10);

  const BASE_URL = process.env.API_URL || "http://localhost:3104";

  useEffect(() => {
    fetch(BASE_URL + "/exchangesList")
      .then((res) => res.json())
      .then((result) => {
        setExchangeList(result);
        setFilteredList(result);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.value === "") {
      setFilteredList(exchangeList);
    }
    setSearchedText(e.target.value);
  };
  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % filteredList.length;
    setItemOffset(newOffset);
  };
  const handleSearch = () => {
    if (searchedText) {
      const filteredList = exchangeList.filter((item) =>
        item?.name?.toUpperCase()?.includes(searchedText.toUpperCase())
      );
      setFilteredList(filteredList);
    }
  };

  return (
    <div>
      <h1 className="txt-center">Top crypto exchanges</h1>
      <p className="txt-center">
        compare all 190 top crypto exchanges. The List is ranked by trading
        volume
      </p>
      <div>
        <p className="txt-center mt-20">Exchanges</p>
        <hr />
        <div className="center">
          <input
            className="input-field"
            type="text"
            value={searchedText}
            onChange={handleChange}
            placeholder="Find an exchange"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div
          style={{
            marginTop: "30px",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            border: "1px solid grey",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>EXCHANGES</strong>
            <strong>24Th TRADE VOLUME</strong>
          </div>
          <hr />
          {currentItems.map((item, index) => (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                  }}
                >
                  <span>{index + 1 + itemOffset}</span>
                  <img src={item.url} alt="icon" />
                  <span>{item.exchange_id}</span>
                </div>
                <div style={{ display: "flex", justifyItems: "flex-start" }}>
                  <span>{item.volume_1day_usd}</span>
                </div>
              </div>
              <hr />
            </>
          ))}
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
};

export default Exchange;
