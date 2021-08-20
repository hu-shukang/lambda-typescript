import { findOne } from '../app/handler'
import lambdaTester from 'lambda-tester'
import * as booksMock from './books.mock'
import { BookService } from '../app/service/books.service'
import { mocked } from 'ts-jest/utils'

jest.mock('../app/service/books.service', () => {
  return {
    BookService: jest.fn(),
  }
})

const MockedBookService = mocked(BookService, true)

describe('books', () => {
  beforeEach(() => {
    MockedBookService.mockClear()
  })

  it('findOneBookById', () => {
    const findOneBookByIdFunc = jest.fn().mockResolvedValue(booksMock.findOne)
    MockedBookService.prototype.findOneBookById = findOneBookByIdFunc

    lambdaTester(findOne)
      .event({
        pathParameters: {
          id: 12345,
        },
      })
      .expectResult((result: any) => {
        expect(result.statusCode).toBe(200)
        const body = JSON.parse(result.body)
        expect(body.data.book).toEqual(booksMock.findOne)
        expect(findOneBookByIdFunc).toBeCalledWith(12345)
        expect(findOneBookByIdFunc).toBeCalledTimes(1)
      })
  })
})
