import express from 'express';
import healthRouter from './src/routes/health.route.js';
import gamesRouter from './src/routes/games.route.js';  // Import the games route

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Homepage route first
app.get('/', (req, res) => {
  res.send('GamesLog Server v1.0 🎮');
});

// Health check route
app.use('/health', healthRouter);

// Games route
app.use('/', gamesRouter); // Add this line

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
