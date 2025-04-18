import axios from 'axios';

// Fetch all games
export const getGames = async (req, res) => {
  try {
    const RAWG_API_KEY = process.env.RAWG_API_KEY;
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: { key: RAWG_API_KEY },
    });

    if (response.data.results && response.data.results.length > 0) {
      // Map the required data fields
      const games = response.data.results.map((game) => ({
        title: game.name,
        description: game.description_raw || "No description available",
        release_date: game.released,
        image: game.background_image,
        trailer: game.clip?.clip || "No trailer available", // check if trailer exists
        screenshots: game.short_screenshots?.map((screenshot) => screenshot.image),
        metacritic_rating: game.metacritic || "No metacritic score",
        genres: game.genres?.map((genre) => genre.name),
        tags: game.tags?.map((tag) => tag.name),
        publishers: game.publishers?.map((publisher) => publisher.name),
        developers: game.developers?.map((developer) => developer.name),
        platforms: game.platforms?.map((platform) => platform.platform.name),
        average_playtime: game.playtime,
      }));

      res.json(games);  // Return the list of games with the desired fields
    } else {
      res.status(404).json({ error: 'No games found.' });  // Handle empty results
    }
  } catch (error) {
    console.error('RAWG API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch games from RAWG.', details: error.message });
  }
};

// Search games by name
export const searchGames = async (req, res) => {
  const { query } = req.query;  // Get the query parameter for the search

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  try {
    const RAWG_API_KEY = process.env.RAWG_API_KEY;
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: RAWG_API_KEY,
        search: query,  // Pass the search query to the RAWG API
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      // Map the required data fields
      const games = response.data.results.map((game) => ({
        title: game.name,
        description: game.description_raw || "No description available",
        release_date: game.released,
        image: game.background_image,
        trailer: game.clip?.clip || "No trailer available", // check if trailer exists
        screenshots: game.short_screenshots?.map((screenshot) => screenshot.image),
        metacritic_rating: game.metacritic || "No metacritic score",
        genres: game.genres?.map((genre) => genre.name),
        tags: game.tags?.map((tag) => tag.name),
        publishers: game.publishers?.map((publisher) => publisher.name),
        developers: game.developers?.map((developer) => developer.name),
        platforms: game.platforms?.map((platform) => platform.platform.name),
        average_playtime: game.playtime,
      }));

      res.json(games);  // Return the search results with the desired fields
    } else {
      res.status(404).json({ error: `No games found for query: ${query}` });  // Handle no search results
    }
  } catch (error) {
    console.error('RAWG API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch games from RAWG.', details: error.message });
  }
};
