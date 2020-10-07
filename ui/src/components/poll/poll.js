import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const url = "http://localhost:4242/polls";

const Poll = () => {
  const [poll, setPoll] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    fetch(url + "/" + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPoll(data[0]);
      });
  }, [id]);

  const options = poll.options
    ? poll.options.map((opt) => {
        return <li key={`${poll.id}-${opt.id}`}>{opt.name}</li>;
      })
    : null;
  return (
    <div>
      <div>
        Aye poll {poll.id} : {poll.question}
      </div>
      <div>
        <ul>{options}</ul>
      </div>
    </div>
  );
};

export default Poll;
