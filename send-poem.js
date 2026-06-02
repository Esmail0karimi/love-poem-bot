const fs = require("fs");

const poems = JSON.parse(
  fs.readFileSync("poems.json", "utf8")
);

const poem =
  poems[Math.floor(Math.random() * poems.length)];

fetch(
  `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID,
      text: poem
    })
  }
)
.then(res => res.json())
.then(console.log)
.catch(console.error);
