"use strict";

const AWS = require("aws-sdk");

const updateItem = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { content, itemStatus } = JSON.parse(event.body);
  try {
    let updateExpression = "set itemStatus = :itemStatus";
    let expressionAttributesValues = {
      ":itemStatus": itemStatus,
    };
    if (content.itemValue ?? false) {
      updateExpression += ", content.itemValue = :itemValue";
      expressionAttributesValues[":itemValue"] = content.itemValue;
    }

    const params = {
      TableName: "FirstTable",
      Key: {id: id},
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributesValues,
      ReturnValues: "ALL_NEW",
    };

    const result = await dynamoDB.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.log(
      `Ocorreu algum erro ao tentar atualizar o item ${id}: ${error.message}`
    );
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
  handler: updateItem,
};
