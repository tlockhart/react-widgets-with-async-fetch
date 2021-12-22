import React, { useEffect, useState } from "react";
// import axios from "axios";

const DebounceSearch = () => {
  const [term, setTerm] = useState("programming");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  // Debounce UseEffect:  Runs anytime term changes
  useEffect(() => {
    // check if debounce should be changed
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    // If user changes term before timout, then the clear function
    // sent in previous render will run an clear timer
    return ()=> {
      clearTimeout(timerId);
    };
  }, [term]);

  // Fetch UseEffect: perform fetch and update results on first componment render, and whenever a change to debounceTerm goes through. 
  useEffect(() => {
    const url = "https://en.wikipedia.org/w/api.php?";
    const params = {
      action: "query",
      list: "search",
      origin: "*",
      format: "json",
      srsearch: debouncedTerm,
    };

    const search = async () => {
      const response = await fetch(url + new URLSearchParams(params), {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // transform results from object to json
      const data = await response.json();

      // call search function
      setResults(data.query.search);
    };
      //call search immediatly
      search();

  }, [debouncedTerm]);

  const renderedResults = results.map((result) => {
    return (
      <div className="item" key="result.pageid">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default DebounceSearch;
