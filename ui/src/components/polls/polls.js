import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = "http://localhost:4242/polls/";

const Polls = () => {
  let [polls, setPolls] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPolls(data);
      });
    console.log("polls");
  }, []);

  return (
    <ul>
      {polls.map((p) => {
        return (
          <li key={p.id}>
            <Link to={`/polls/${p.id}`}>{p.question}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Polls;
