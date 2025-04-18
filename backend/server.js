import express from 'express';
import healthRouter from './src/routes/health.route.js';
import gamesRouter from './src/routes/games.route.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('GamesLog Server v1.0 🎮');
});

// Routes
app.use('/', healthRouter);
app.use('/', gamesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
