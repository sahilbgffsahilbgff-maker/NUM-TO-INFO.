const fetch = require("node-fetch");

let KEYS = [
  {
    key: "SAHIL123",
    expire: "2026-12-31",
    status: "active"
  }
];

exports.handler = async (event) => {
  const { api_key, number } = event.queryStringParameters;

  if (!api_key || !number) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "api_key aur number required hai" })
    };
  }

  // Check Key
  const keyData = KEYS.find(k => k.key === api_key);

  if (!keyData) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Invalid API Key" })
    };
  }

  if (keyData.status !== "active") {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Key Blocked" })
    };
  }

  if (new Date() > new Date(keyData.expire)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Key Expired" })
    };
  }

  // Original API call
  const url = `https://database-sigma-nine.vercel.app/number/${number}?api_key=YOUR-PASSWORD`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...data,

        credit: "Sahil Codex",
        developer: "Sahil Codex",

        message: "Developer @SAHIL_YT\nTG @SAHIL_YT Dm For Key"
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API Error" })
    };
  }
};