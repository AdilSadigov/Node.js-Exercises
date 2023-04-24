import express from 'express';
import morgan from 'morgan';
import "express-async-errors";
import "dotenv/config";
import { getAll, getOneById, create, updateById, deleteByID } from "./controllers/planets.js";
const app = express();
const port = process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
app.get('/api/planets', getAll);
app.get('/api/planets/:id', getOneById);
app.post('/api/planets', create);
app.put('/api/planets/:id', updateById);
app.delete('/api/planets/:id', deleteByID);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
