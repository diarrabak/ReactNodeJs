import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import res_routes from './routes/researcherRoutes.js';
import art_routes from './routes/articleRoutes.js';
import gro_routes from './routes/groupRoutes.js';
import job_routes from './routes/jobRoutes.js';
import news_routes from './routes/newsRoutes.js';
import event_routes from './routes/eventRoutes.js';


const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
res_routes(app);
art_routes(app);
gro_routes(app);
job_routes(app);
news_routes(app);
event_routes(app);

const CONNECTION_LINK = 'mongodb+srv://placement_lossa:Lossa2021@cluster0.ecnyo.mongodb.net/lossa_database?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on Port ${PORT}`)))
    .catch((error) => console.log((error.message)));

mongoose.set('useFindAndModify', false);