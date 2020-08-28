import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path: path.resolve(__dirname, '.env')})
import express from 'express'
import routes from './routes'

const app = express()

app.use(routes)

app.listen(3333, () => {
  console.log(' 🚀 Server started on port  3333!');
});