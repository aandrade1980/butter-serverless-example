import React, { useState } from "react";
import fetch from "isomorphic-fetch";

const indexToMonth = index => {
  const months = {
    0: () => "Jan",
    8: () => "Sep",
    11: () => "Dec",
    default: () => ""
  };

  return months[index] || months["default"];
};

function App() {
  const [postsByMonth, setPostsByMonth] = useState(null);

  const onClick = async () => {
    try {
      const response = await fetch("/.netlify/functions/posts-by-month");
      const json = await response.json();
      setPostsByMonth(json);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <button onClick={onClick}>Fetch API</button>
      {postsByMonth && (
        <table>
          <thead>
            <th>Month</th>
            <th>Posts</th>
          </thead>
          <tbody>
            {Array(12)
              .fill(0)
              .map((el, i) => (
                <tr key={i}>
                  <td>{indexToMonth(i)()}</td>
                  <td>{postsByMonth[i] || 0}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
