# Playlist API
*Difficulty: Beginner*  
*Estimated Time to Complete: 30min - 1hr*  
*Full-Time Schedule Placement - Second Day*

This is a simple server written in vanilla Node.js. The API responds with a list of songs or one song. Optional ninja bonus: support a request for a random song.

Ryan Dahl created Node.js to provide developers with the power to use JavaScript for server-side scripting and unifying web application development around a single programming language. A chapter dedicated to Node.js would be remiss if server functionality was omitted. With this proposed assignment, students will build a simple RESTful API server in vanilla Node.js.

Students can also continue practicing with importing and exporting modules, learn how to write an npm script, and learn why and how to use nodemon.

## Third-Party Packages
- [Nodemon](./https://nodemon.io/) - nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Steps to Complete
1. Create new project directory and cd into it: `mkdir playlist-api && cd playlist-api`
2. Create server.js: `touch server.js`
3. Initialize npm project: `npm init` or `npm init -y`
4. Install Nodemon as a dev dependency: `npm i -D nodemon`
5. Add "type" field to package.json with value of "module": `"type": "module"`
6. Add "dev" script to package.json for nodemon: `"dev": "nodemon server.js"`
7. Create module file for song data: `mkdir data && touch data/playlist.js`
8. In `playlist.js`, create and export an array of song objects with at least an id and a title field. Five songs will suffice.
    ```js
    const songs = [
      {
        id: 1,
        title: 'Respect',
      },
      {
        id: 2,
        title: "Let's Stay Together",
      },
      {
        id: 3,
        title: 'I Heard It Through the Grapevine',
      },
      {
        id: 4,
        title: "Ain't No Sunshine",
      },
      {
        id: 5,
        title: "Sittin' On The Dock Of The Bay",
      },
    ];

    export default songs;
    ```
9.  In `server.js`, import http core node module and songs array.
    ```js
    import http from 'node:http';
    import songs from './data/playlist.js';
    ```
10. Create server, set header for JSON response, and build `/api/songs` endpoint.
    ```js
    const server = http.createServer((req, res) => {
      // set response headers
      res.setHeader('Content-Type', 'application/json');

      if (req.url === '/api/songs' && req.method === 'GET') {
        // get all songs
        res.statusCode = 200;
        res.write(JSON.stringify(songs));
        res.end();
      } else {
        // invalid route
        res.statusCode = 404;
        res.write(JSON.stringify({ message: 'Unsupported route' }));
        res.end();
      }
    });
    ```
11. Start the server.
    ```js
    const port = 8000;
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    ```
12. Spin up dev server with nodemon: `npm run dev`
13. Test endpoint in browser, Postman, or Thunder Client extension.
14. Build `/api/songs/:songId` endpoint.
    ```js
    const server = http.createServer((req, res) => {
      // set response headers
      res.setHeader('Content-Type', 'application/json');

      if (req.url === '/api/songs' && req.method === 'GET') {
        // get all songs
        res.statusCode = 200;
        res.write(JSON.stringify(songs));
        res.end();
      } else if (req.url.startsWith('/api/songs/') && req.method === 'GET') {
        // get a specific song
        const songId = parseInt(req.url.split('/')[3]);
        const song = songs.find((song) => song.id === songId);

        if (song) {
          // song found
          res.statusCode = 200;
          res.write(JSON.stringify(song));
          res.end();
        } else {
          // song not found
          res.statusCode = 404;
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
    ```
15. Test endpoint in browser, Postman, or Thunder Client extension.
16. **Ninja Bonus:** Support a request for a random song at endpoint `/api/songs/random`. Students can add a helper function in `playlist.js` and export the function as a named export. This answer key [takes that approach](./data/playlist.js).