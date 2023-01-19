const Person = require('./06-person');

describe('test for person',()=>{
  let person;
  // Arrange / Given :
  beforeEach(()=>{
    person = new Person('jorge', 0, 1.68);
  })

  test('should return down', ()=>{
    // AAA
    // Arrange / Given :
    person.weight = 45;
    // Act / When :
    const imc = person.calcIMC();
    // Assert / Then:
    expect(imc).toBe('down');
  })

  test('should return normal', ()=>{
    // Arrange / Given :
    person.weight = 68;
    // Act / When :
    const imc = person.calcIMC();
    // Assert / Then:
    expect(imc).toBe('normal');
  })

  test('should return overweight level 1', ()=>{
    // Arrange / Given :
    person.weight = 80;
    // Act / When :
    const imc = person.calcIMC();
    // Assert / Then:
    expect(imc).toBe('overweight level 1');
  })
});
