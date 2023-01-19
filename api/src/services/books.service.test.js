const BooksService = require('./books.service');
const { generateManyBooks } = require('../fakes/book.fake');

const mockGetAll = jest.fn();
jest.mock('../lib/mongo.lib', ()=> jest.fn().mockImplementation(()=> ({
    getAll: mockGetAll,
    create: ()=>{},
})));

describe('test for BooksService', ()=>{
  let service;
  beforeEach(()=>{
    service = new BooksService();
    jest.clearAllMocks();
  });

  describe('test for getBooks', ()=>{
    test('should return a list books', async ()=>{
      //Arrange
      const fakeBooks = generateManyBooks(20);
      mockGetAll.mockResolvedValue(fakeBooks);
      //Act
      const books = await service.getBooks({});
      console.log(books);
      //Assert
      expect(books.length).toEqual(fakeBooks.length);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith('books', {});
    });

    test('should return a name book', async ()=>{
      //Arrange
      const fakeBooks = generateManyBooks(4);
      mockGetAll.mockResolvedValue(fakeBooks);
      //Act
      const books = await service.getBooks({});
      console.log(books);
      //Assert
      expect(books[0].name).toEqual(fakeBooks[0].name);
    })
  });
});
