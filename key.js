let KEYS = [];

exports.handler = async (event) => {
  const { action, key, days } = event.queryStringParameters;

  if (action === "generate") {
    const newKey = "KEY_" + Math.random().toString(36).substring(7);

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + parseInt(days || 1));

    KEYS.push({
      key: newKey,
      expire: expireDate,
      status: "active"
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ key: newKey, expire: expireDate })
    };
  }

  if (action === "block") {
    const k = KEYS.find(k => k.key === key);
    if (k) {
      k.status = "blocked";
      return { statusCode: 200, body: "Key Blocked" };
    }
  }

  return {
    statusCode: 400,
    body: "Invalid Action"
  };
};