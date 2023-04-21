module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "My first servless. Uhuuul!!!",
        input: event,
      },
      null,
      2
    ),
  };
};
