import { BookDto, BookRequestForm } from '../model/dto/book.dto'

export class BookService {
  public async createBook(form: BookRequestForm): Promise<boolean> {
    console.log('books.service:createBook is called')
    console.log(form)
    return true
  }

  public async updateBook(id: number, form: BookRequestForm): Promise<boolean> {
    console.log('books.service:updateBook is called')
    console.log(id)
    console.log(form)
    return true
  }

  public async findBooks(): Promise<BookDto[]> {
    console.log('books.service:findBooks is called')
    return []
  }

  public async findOneBookById(id: number): Promise<BookDto> {
    console.log('books.service:findOneBookById is called')
    console.log(id)
    return {
      id: 123,
      name: 'name123',
      description: 'description123',
      createdAt: '2019-12-22T11:51:54.857Z',
    }
  }

  public async deleteOneBookById(id: number): Promise<boolean> {
    console.log('books.service:deleteOneBookById is called')
    console.log(id)
    return true
  }
}
