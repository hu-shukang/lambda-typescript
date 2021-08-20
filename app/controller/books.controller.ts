import { Context } from 'aws-lambda'
import { BookRequestForm } from '../model/dto/book.dto'
import { BookService } from '../service/books.service'
import { MessageUtil } from '../utils/message'

export class BooksController {
  private bookService: BookService

  constructor(_bookService: BookService) {
    this.bookService = _bookService
  }
  /**
   * Create book
   * @param {*} event
   */
  async create(event: any, context?: Context) {
    console.log('functionName', context.functionName)
    const form: BookRequestForm = JSON.parse(event.body)
    const createResult = await this.bookService.createBook(form)
    const result = {
      createResult: createResult,
    }

    return MessageUtil.success(result)
  }

  /**
   * Update a book by id
   * @param event
   */
  async update(event: any) {
    const id: number = Number(event.pathParameters.id)
    const form: BookRequestForm = JSON.parse(event.body)
    const updateResult = await this.bookService.updateBook(id, form)
    const result = {
      updateResult: updateResult,
    }

    return MessageUtil.success(result)
  }

  /**
   * Find book list
   */
  async find() {
    const books = await this.bookService.findBooks()
    const result = {
      books: books,
    }

    return MessageUtil.success(result)
  }

  /**
   * Query book by id
   * @param event
   */
  async findOne(event: any, _context: Context) {
    const id: number = Number(event.pathParameters.id)
    const book = await this.bookService.findOneBookById(id)
    const result = {
      book: book,
    }

    return MessageUtil.success(result)
  }

  /**
   * Delete book by id
   * @param event
   */
  async deleteOne(event: any) {
    const id: number = Number(event.pathParameters.id)
    const deleteResult = await this.bookService.deleteOneBookById(id)

    const result = {
      deleteResult: deleteResult,
    }

    return MessageUtil.success(result)
  }
}
