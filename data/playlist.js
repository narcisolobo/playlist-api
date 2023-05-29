/**
 * A song object.
 * @typedef {object} Song
 * @property {number} id The unique id of the song.
 * @property {string} title The title of the song.
 * @property {string} artist The artist of the song.
 * @property {string} album The album the song is in.
 * @property {number} year The release year of the song.
 */

const songs = [
  {
    id: 1,
    title: 'Respect',
    artist: 'Aretha Franklin',
    album: 'I Never Loved a Man the Way I Love You',
    year: 1967,
  },
  {
    id: 2,
    title: "Let's Stay Together",
    artist: 'Al Green',
    album: "Let's Stay Together",
    year: 1972,
  },
  {
    id: 3,
    title: 'I Heard It Through the Grapevine',
    artist: 'Marvin Gaye',
    album: 'In the Groove',
    year: 1968,
  },
  {
    id: 4,
    title: "Ain't No Sunshine",
    artist: 'Bill Withers',
    album: 'Just As I Am',
    year: 1971,
  },
  {
    id: 5,
    title: "Sittin' On The Dock Of The Bay",
    artist: 'Otis Redding',
    album: 'The Dock of the Bay',
    year: 1968,
  },
];

/**
 * Ninja bonus - This function returns a random song from the songs array.
 * @returns {Song} The random song.
 */
function randomSong() {
  const randIdx = Math.floor(Math.random() * songs.length);
  return songs[randIdx];
}

// named vs default exports
export { randomSong };
export default songs;
