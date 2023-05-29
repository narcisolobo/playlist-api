// node: prefix clarifies the module is a core node module
// and eliminates potential name clashes
// https://nodejs.org/docs/latest-v18.x/api/esm.html#node-imports
import http from 'node:http';

// default import vs. named imports from custom modules
import songs, { randomSong } from './data/playlist.js';

// create HTTP server
const server = http.createServer((req, res) => {
  // set response headers
  res.setHeader('Content-Type', 'application/json');

  // process request based on method and URL
  if (req.url === '/api/songs' && req.method === 'GET') {
    // get all songs
    res.statusCode = 200;
    res.write(JSON.stringify(songs));
    console.log('All songs returned.');
    res.end();
  } else if (req.url.startsWith('/api/songs/random') && req.method === 'GET') {
    // get a random song - ninja bonus
    res.statusCode = 200;
    const song = randomSong();
    res.write(JSON.stringify(song));
    console.log(`Random song id ${song.id} returned.`);
    res.end();
  } else if (req.url.startsWith('/api/songs/') && req.method === 'GET') {
    // get a specific song
    const songId = parseInt(req.url.split('/')[3]);
    const song = songs.find((song) => song.id === songId);

    if (song) {
      // song found
      res.statusCode = 200;
      res.write(JSON.stringify(song));
      console.log(`Song id ${song.id} returned.`);
      res.end();
    } else {
      // song not found
      res.statusCode = 404;
      console.log(`Song id: ${songId} not found.`);
      res.end(JSON.stringify({ message: 'Song not found' }));
    }
  } else {
    // invalid route
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route not found' }));
    console.log(`Request url ${req.url} not found.`);
    res.end();
  }
});

// start the server
const port = 8000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
