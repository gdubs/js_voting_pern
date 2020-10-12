require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const { json } = require("express");

const app = express();

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  max: process.env.DB_POOL_MAX,
});

async function executeQuery(query) {
  try {
    const results = await pool.query(query);
    console.table(results.rows);

    const jsonResult = [],
      index = {};

    results.rows.forEach((row) => {
      if (!(row.poll_id in index)) {
        index[row.poll_id] = {
          id: row.poll_id,
          question: row.question,
          description: row.description,
          voted: row.voted === "1",
          multiSelect: row.multiselect === "1",
          options: [],
        };

        jsonResult.push(index[row.poll_id]);
      }

      if (row.poll_option_id) {
        index[row.poll_id].options.push({
          id: row.poll_option_id,
          name: row.poll_option_name,
          selected: false,
        });
      }
    });

    console.log("end of execute");

    return jsonResult;
  } catch (e) {
    console.error(e);
  }
}

const query =
  "select p.id as poll_id, p.question, p.description, p.voted, p.multiselect, \
po.id as poll_option_id, po.name as poll_option_name \
from voting.poll p \
left join voting.poll_option po on po.poll_id = p.id \
";

app.use(cors());
app.get("/polls", async (req, res) => {
  const data = await executeQuery(query);
  res.json(data);
});

app.get("/polls/:id", async (req, res) => {
  const poll = await executeQuery(query + ` where p.id = ${req.params.id}`);
  res.json(poll);
});

app.post("/polls/:id", async (req, res) => {
  res.json();
});

const port = process.env.PORT || 4242;

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
