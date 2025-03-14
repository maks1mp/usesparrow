const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

const cases = Array.from({ length: 100 }, () => ({
  uid: faker.string.uuid(),
  name: faker.lorem.words(3),
  close_date: faker.date.future().toISOString().split('T')[0],
  description: faker.lorem.sentence(50),
  proof_needed: faker.datatype.boolean(),
  price: parseInt(faker.finance.amount(10, 10000)),
}));

fs.writeFileSync(
  path.join(__dirname, '..', 'data/cases.json'),
  JSON.stringify(cases, null, 2),
);

console.log('cases.json file has been generated!');
