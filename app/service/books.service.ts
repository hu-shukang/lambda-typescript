import {
  DeleteItemCommand,
  DeleteItemInput,
  PutItemCommand,
  PutItemInput,
  QueryCommand,
  QueryCommandInput,
  UpdateItemCommand,
  UpdateItemInput,
} from '@aws-sdk/client-dynamodb'
import moment from 'moment'
import { BookDto, BookRequestForm } from '../model/dto/book.dto'
import { ddbClient } from '../utils/dynamic-client'

export class BookService {
  private static TABLE_NAME: string = 'book_tbl'
  private static PRIMARY_KEY: string = 'info'
  public async createBook(form: BookRequestForm): Promise<boolean> {
    const params: PutItemInput = {
      TableName: BookService.TABLE_NAME,
      Item: {
        category: { S: BookService.PRIMARY_KEY },
        id: { N: form.id.toString() },
        book_name: { S: form.name },
        description: { S: form.description },
        createdAt: { S: moment().format('yyyy-MM-DD HH:mm:ss') },
      },
    }

    const resp = await ddbClient.send(new PutItemCommand(params))
    return resp.$metadata.httpStatusCode === 200
  }

  public async updateBook(id: number, form: BookRequestForm): Promise<boolean> {
    const params: UpdateItemInput = {
      TableName: BookService.TABLE_NAME,
      Key: {
        category: { S: BookService.PRIMARY_KEY },
        id: { N: id.toString() },
      },
      UpdateExpression: 'set book_name = :x, description = :y',
      ExpressionAttributeValues: {
        ':x': { S: form.name },
        ':y': { S: form.description },
      },
    }
    const resp = await ddbClient.send(new UpdateItemCommand(params))
    return resp.$metadata.httpStatusCode === 200
  }

  public async findBooks(): Promise<BookDto[]> {
    const params: QueryCommandInput = {
      TableName: BookService.TABLE_NAME,
      ProjectionExpression: 'id, book_name, description, createdAt',
      KeyConditionExpression: 'category = :a',
      ExpressionAttributeValues: {
        ':a': { S: BookService.PRIMARY_KEY },
      },
    }
    const resp = await ddbClient.send(new QueryCommand(params))
    return resp.Items.map((item) => {
      return {
        id: Number(item.id.N),
        name: item.book_name.S,
        description: item.description.S,
        createdAt: item.createdAt.S,
      }
    })
  }

  public async findOneBookById(id: number): Promise<BookDto> {
    const params: QueryCommandInput = {
      TableName: BookService.TABLE_NAME,
      ProjectionExpression: 'id, book_name, description, createdAt',
      KeyConditionExpression: 'category = :a and id = :s',
      ExpressionAttributeValues: {
        ':a': { S: BookService.PRIMARY_KEY },
        ':s': { N: id.toString() },
      },
    }
    const resp = await ddbClient.send(new QueryCommand(params))
    return resp.Items.map((item) => {
      return {
        id: Number(item.id.N),
        name: item.book_name.S,
        description: item.description.S,
        createdAt: item.createdAt.S,
      }
    })[0]
  }

  public async deleteOneBookById(id: number): Promise<boolean> {
    const params: DeleteItemInput = {
      TableName: BookService.TABLE_NAME,
      Key: {
        category: { S: BookService.PRIMARY_KEY },
        id: { N: id.toString() },
      },
    }
    const resp = await ddbClient.send(new DeleteItemCommand(params))
    return resp.$metadata.httpStatusCode === 200
  }
}
