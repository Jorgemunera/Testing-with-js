const request = require('supertest');
//requerimos a ongodb y el archivo de config
const {MongoClient} = require('mongodb');
const createApp = require('../src/app');
const { config } = require('../src/config');
//vamos a utilizar las variables para la conexion
const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

describe('test for books', ()=>{
  let app = null;
  let server = null;
  let database = null;

  beforeAll(async ()=>{
    app = createApp();
    server = app.listen(3001);
    //creamos la conexion a mongoclient
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    //creamos la db con nombre
    database = client.db(DB_NAME);
  })
  afterAll(async ()=>{
    //cerramos el servidor y borramos la db
    await server.close();
    await database.dropDatabase();
  })

  describe('test for [GET] /api/v1/books', ()=>{
    test('should return a list books', async ()=> {
      //arrange
      //creamos el seed datos y lo insertamos a la bd y a la coleccion
      const seedData = await database.collection('books').insertMany([
        {
          name: "book 1",
          year: 1998,
          author: 'jorge'
        },
        {
          name: "book 2",
          year: 2000,
          author: 'gerjo'
        },
      ]);
      console.log(seedData);
      //act
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({body}) =>{
          //assert
          expect(body.length).toEqual(seedData.insertedCount);
        })
    })
  })
})
