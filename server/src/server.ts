import express from 'express';

const app = express();

app.get('/users', (request, response) => {

  const users = [
    { name: 'joao', age: 21 },
    { name: 'maria', age: 23 },
  ]

    return response.json(users);
});

app.listen(3333,()=> {
  console.log('server start');
});
