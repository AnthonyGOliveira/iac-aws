"use strict";

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const insertItem = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { content } = JSON.parse(event.body);
  const id = v4();
  const createdAt = new Date().toISOString();

  const newItem = {
    id,
    createdAt,
    content,
    itemStatus: false,
  };

  await dynamoDB.put({
    TableName: "FirstTable",
    Item: newItem,
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newItem),
  };
};

module.exports = {
    handler:insertItem
}