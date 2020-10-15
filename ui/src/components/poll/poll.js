import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const url = "http://localhost:4242/polls";

const Poll = () => {
  const [poll, setPoll] = useState({});
  const [selectedOption, setSelectedOption] = useState(-1);
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

  const selectionChanged = (e) => {
    console.log("selected something", e);
  };
  const options = poll.options
    ? poll.options.map((opt) => {
        return (
          <li key={`${poll.id}-${opt.id}`}>
            <input
              type="radio"
              name={poll.id}
              checked={poll.selected}
              onClick={selectionChanged}
            ></input>
            {opt.name}
          </li>
        );
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
      <div>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default Poll;
