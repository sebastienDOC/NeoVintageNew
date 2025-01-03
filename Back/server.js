const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { port } = require('./config/environment');

const photoRoutes = require('./routes/photo.routes');
const creatorRoutes = require('./routes/creator.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/photos', photoRoutes);
app.use('/creators', creatorRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/auth', authRoutes);

connectDB();

app.listen(port, () => console.log(`Server: ${port}`));