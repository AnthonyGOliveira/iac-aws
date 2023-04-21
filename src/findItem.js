"use strict";

const AWS = require("aws-sdk");

const findItem = async (event) => {
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const params = {
      TableName: "FirstTable",
      Key: {
        id,
      },
    };
    const { Item, ConsumedCapacity } = await dynamoDB.get(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ item: Item, consume: ConsumedCapacity }),
    };
  } catch (error) {
    if (error.code === "ResourceNotFoundException") {
      console.log(`O item ${id} não foi encontrado: ${error.message}`);
    } else {
      console.log(`Ocorreu um erro no serviço: ${error.message}`);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Ocorreu um erro no serviço",
        error: error.message,
      }),
    };
  }
};

module.exports = {
  handler: findItem,
};
