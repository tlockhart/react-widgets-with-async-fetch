import React, {useEffect, useState} from "react";
import axios from "axios";

const Search = () => {
    const [term, setTerm] = useState("programming");
    const [results, setResults] = useState([]);

    console.log(results);

    // method 1: Async Await
    //   useEffect(() => {
    //     const url = "http://localhost:3001";
    //     const url = "https://en.wikipedia.org/w/api.php";

    //     const search = async () => {
    //     const {data} = await axios.get(url, {
    //           params: {
    //               action: 'query',
    //               list: 'search',
    //               origin: '*',
    //               format:'json',
    //               srsearch: term,
    //           }
    //       });

    //       setResults(data.query.search);
    //     };
    //     if(term){
    //         search();
    //     }

    // }, [term]);

    //method 2: fetch:
    useEffect(() => {
        // const url = "http://localhost:3001?";
        const url = "https://en.wikipedia.org/w/api.php?";
        const params = {
            action: "query",
            list: "search",
            origin: "*",
            format: "json",
            srsearch: term,
        };
        const search = async () => {
            const response = await fetch(url + new URLSearchParams(params), {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            setResults(data.query.search);
            // on component initial render, the effect is called and the cleanup function is returned.  On change to term variable, react runs the cleanup function from last render, then calls the overall effect again.
            return () => {
                console.log("CLEANUP");
            };
        };
        /*********************BEGIN_DEBOUNCE**************************/
        // Set results for initial load without a delay
        if (term && !results.length) {
            search();
        }
        // Debouce search term: Set results for typed term
        else {
            //Throttle Requests
            const timeoutId = setTimeout(() => {
                if (term) {
                    search();
                }
            }, 500);

            //cleanup function: Cancel previous timer
            return () => {
                clearTimeout(timeoutId);
            };
        }
        /*********************END_DEBOUNCE**************************/
    }, [term]);

    // method 2: Promises
    //axios.get("https://en.wikipedia.org/w/api.php?action=query&list=search&format=json*&srsearch=programming").then((response) => console.log(response.data));
    //   }, [term]);

    // console.log('Scenerio: I run with Every Render');

    // useEffect(() => {
    //     console.log('Scenerio 1: I only run Once');
    // },[]);

    // useEffect(() => {
    //     console.log('Scenerio 2: I run after Every render and at Initial render');
    // });

    // useEffect(() => {
    //     console.log('Scenerio 3: I run at inital render, and when Term variable changes between renders');
    // }, [term]);

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
                    <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
                    {/* </div> */}
                    {/* {result.snippet} */}
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

export default Search;
