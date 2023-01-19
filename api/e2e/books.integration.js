const mockGetAll = jest.fn();
const request = require('supertest');
//vamos a generar books de manera fake
const { generateManyBooks } = require('../src/fakes/book.fake');
const createApp = require('../src/app');
//vamos a utilizar mocking
jest.mock('../src/lib/mongo.lib', ()=> jest.fn().mockImplementation(()=> ({
    getAll: mockGetAll,
    create: ()=>{},
})));

describe('test for books', ()=>{
  let app = null;
  let server = null;
  beforeAll(()=>{
    app = createApp();
    server = app.listen(3001)
  })
  afterAll(async ()=>{
    await server.close();
  })

  describe('test for [GET] /api/v1/books', ()=>{
    test('should return a list books', async ()=> {
      //arrange
      //aqui generamos ese mocking para simular 3 libros
      const fakeBooks = generateManyBooks(3);
      mockGetAll.mockResolvedValue(fakeBooks);
      //act
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({body}) =>{
          console.log(body)
          //assert
          expect(body.length).toEqual(fakeBooks.length);
        })
    })
  })
})
