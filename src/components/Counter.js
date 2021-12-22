import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>{count}</div>
      <button onClick={
          () => setCount(prevCount => prevCount + 1)
          }>
              Button
          </button>
    </div>
  );
};

export default Counter;
