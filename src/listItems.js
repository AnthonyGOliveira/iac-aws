"use strict";

const AWS = require("aws-sdk");

const listItems = async (event) => {
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const { Items: items } = await dynamoDB
      .scan({
        TableName: "FirstTable",
      })
      .promise();
    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    if (error.code === "ResourceNotFoundException") {
      console.log(
        `A tabela 'FirstTable' não foi encontrada: ${error.message}`
      );
    } else {
      console.log(`Ocorreu um erro no serviço: ${error.message}`);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Ocorreu um erro no serviço" }),
    };
  }
};

module.exports = {
  handler: listItems,
};
