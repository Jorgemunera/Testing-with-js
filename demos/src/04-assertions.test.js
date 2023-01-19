test('test obj', () => {
  const data = { name: 'jorge' };
  data.lastname = 'munera';
  expect(data).toEqual({ name: 'jorge', lastname: 'munera' });
});

test('null', () => {
  const data = null;
  expect(data).toBeNull();
  expect(data).toBeDefined();
  expect(data).not.toBeUndefined();
});

test('booleans', () => {
  expect(true).toEqual(true);
  expect(false).toEqual(false);

  expect(0).toBeFalsy();
  expect('').toBeFalsy();
  expect(false).toBeFalsy();
});

test('strings', () => {
  expect('jorge').toMatch(/org/);
});

test('list / arrays', () => {
  const numbers = [1, 2, 3, 4];
  expect(numbers).toContain(3);
});
