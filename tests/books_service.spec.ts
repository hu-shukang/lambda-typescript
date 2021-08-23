import { BookService } from '../app/service/books.service'

describe('books_service', () => {
  test('createBook', async () => {
    const bookService = new BookService()
    for (let i = 1; i <= 10; i++) {
      const result = await bookService.createBook({
        id: i,
        name: `book_name_${i}`,
        description: `book_desc_${i}`,
      })
      expect(result).toBeTruthy()
    }
  })

  test('deleteOneBookById', async () => {
    const id = 10
    const bookService = new BookService()
    const result = await bookService.deleteOneBookById(id)
    expect(result).toBeTruthy()
  })

  test('findOneBookById', async () => {
    const id = 1
    const bookService = new BookService()
    const result = await bookService.findOneBookById(id)
    console.log(result)
  })

  test('findBooks', async () => {
    const bookService = new BookService()
    const books = await bookService.findBooks()
    books.forEach((value, _index) => {
      console.log(value)
    })
  })

  test('updateBook', async () => {
    const bookService = new BookService()
    const form = {
      id: 1,
      name: 'book_name_1_updated',
      description: 'book_desc_1_updated',
    }
    const result = await bookService.updateBook(1, form)
    expect(result).toBeTruthy()
  })
})
