# COMP 4513 – Assignment #1: Spotify Songs Web API

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=white)

## Overview

This project is a RESTful Web API built with **Node.js** and **Express** that serves data from a Spotify dataset containing hit songs from 2016–2019. The dataset includes information about songs, artists, genres, and playlists. All responses are returned in **JSON format** either as an array of results or a structured error message if no data is found.

## Built With

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express](https://expressjs.com/) | HTTP routing |
| [SQLite](https://www.sqlite.org/) | File-based relational database (`songs-2026.db`) |
| [sqlite3](https://www.npmjs.com/package/sqlite3) | Node.js SQLite bindings |
| [Render](https://render.com/) | Cloud hosting for the Node server |

## Project Structure

```
├── server.js                  # Entry point — initializes Express and starts the server
├── scripts/
│   ├── data-provider.js       # Promisified wrappers around sqlite3 DB calls
│   ├── artists-router.js      # All /api/artists routes
│   ├── songs-router.js        # All /api/songs routes
│   ├── genre-router.js        # /api/genres route
│   ├── playlists-router.js    # /api/playlists routes
│   └── mood-router.js         # All /api/mood routes
├── data/
│   ├── songs-2026.db          # SQLite database file
│   ├── artists.csv
│   ├── genres.csv
│   ├── playlists.csv
│   ├── songs.csv
│   └── types.csv
├── .env                       # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md
```

## Database Schema

| Table | Description |
|---|---|
| `songs` | Song data with foreign keys to `artists` and `genres` |
| `artists` | Artist information, linked to `types` |
| `genres` | Music genre data |
| `types` | Artist type classifications |
| `playlists` | User-created playlists containing song references |

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/artists` | All artists sorted by `artist_name` (includes `type_name`, excludes FK) |
| `GET /api/artists/:ref` | Single artist by `artist_id` |
| `GET /api/artists/averages/:ref` | Average song stats for a given artist (bpm, energy, danceability, etc.) |
| `GET /api/genres` | All genres |
| `GET /api/songs` | All songs sorted by title (includes artist and genre info, excludes FKs) |
| `GET /api/songs/sort/:order` | All songs sorted by `id`, `title`, `artist`, `genre`, `year`, or `duration` |
| `GET /api/songs/:ref` | Single song by `song_id` |
| `GET /api/songs/search/begin/:substring` | Songs whose title starts with the given substring (case-insensitive) |
| `GET /api/songs/search/any/:substring` | Songs whose title contains the given substring (case-insensitive) |
| `GET /api/songs/search/year/:year` | Songs from the given year |
| `GET /api/songs/artist/:ref` | All songs by a given artist |
| `GET /api/songs/genre/:ref` | All songs in a given genre |
| `GET /api/playlists/:ref` | All songs in a playlist (returns playlist, song_id, title, artist name, genre name, year) |
| `GET /api/mood/dancing/:ref` | Top N songs sorted by `danceability` descending (N defaults to 20 if invalid) |
| `GET /api/mood/happy/:ref` | Top N songs sorted by `valence` descending |
| `GET /api/mood/coffee/:ref` | Top N songs sorted by `liveness / acousticness` descending |
| `GET /api/mood/studying/:ref` | Top N songs sorted by `energy × speechiness` ascending |

**Note:** For all mood endpoints, `ref` must be between 1 and 20. If missing, less than 1, or greater than 20, it defaults to 20.

## Error Handling

If a request returns no results, the API responds with a JSON error message, for example:

```json
{ "error": "artist of id '99999' was not found" }
```

## Live API – Test Links

Base URL: **`https://comp4513-assignment-1.onrender.com`**

This project is hosted on Render's free tier. The server may take **30–60 seconds** to wake up after a period of inactivity.

### Artists
- [/api/artists](https://comp4513-assignment-1.onrender.com/api/artists)
- [/api/artists/129](https://comp4513-assignment-1.onrender.com/api/artists/129)
- [/api/artists/sdfjkhsdf](https://comp4513-assignment-1.onrender.com/api/artists/sdfjkhsdf)
- [/api/artists/averages/129](https://comp4513-assignment-1.onrender.com/api/artists/averages/129)

### Genres
- [/api/genres](https://comp4513-assignment-1.onrender.com/api/genres)

### Songs
- [/api/songs](https://comp4513-assignment-1.onrender.com/api/songs)
- [/api/songs/sort/artist](https://comp4513-assignment-1.onrender.com/api/songs/sort/artist)
- [/api/songs/sort/year](https://comp4513-assignment-1.onrender.com/api/songs/sort/year)
- [/api/songs/sort/duration](https://comp4513-assignment-1.onrender.com/api/songs/sort/duration)
- [/api/songs/1010](https://comp4513-assignment-1.onrender.com/api/songs/1010)
- [/api/songs/sjdkfhsdkjf](https://comp4513-assignment-1.onrender.com/api/songs/sjdkfhsdkjf)
- [/api/songs/search/begin/love](https://comp4513-assignment-1.onrender.com/api/songs/search/begin/love)
- [/api/songs/search/begin/sdjfhs](https://comp4513-assignment-1.onrender.com/api/songs/search/begin/sdjfhs)
- [/api/songs/search/any/love](https://comp4513-assignment-1.onrender.com/api/songs/search/any/love)
- [/api/songs/search/year/2017](https://comp4513-assignment-1.onrender.com/api/songs/search/year/2017)
- [/api/songs/search/year/2027](https://comp4513-assignment-1.onrender.com/api/songs/search/year/2027)
- [/api/songs/artist/149](https://comp4513-assignment-1.onrender.com/api/songs/artist/149)
- [/api/songs/artist/7834562](https://comp4513-assignment-1.onrender.com/api/songs/artist/7834562)
- [/api/songs/genre/115](https://comp4513-assignment-1.onrender.com/api/songs/genre/115)

### Playlists
- [/api/playlists](https://comp4513-assignment-1.onrender.com/api/playlists)
- [/api/playlists/3](https://comp4513-assignment-1.onrender.com/api/playlists/3)
- [/api/playlists/35362](https://comp4513-assignment-1.onrender.com/api/playlists/35362)

### Mood
- [/api/mood/dancing/5](https://comp4513-assignment-1.onrender.com/api/mood/dancing/5)
- [/api/mood/dancing/500](https://comp4513-assignment-1.onrender.com/api/mood/dancing/500)
- [/api/mood/dancing/ksdjf](https://comp4513-assignment-1.onrender.com/api/mood/dancing/ksdjf)
- [/api/mood/happy/8](https://comp4513-assignment-1.onrender.com/api/mood/happy/8)
- [/api/mood/happy](https://comp4513-assignment-1.onrender.com/api/mood/happy)
- [/api/mood/coffee/10](https://comp4513-assignment-1.onrender.com/api/mood/coffee/10)
- [/api/mood/studying/15](https://comp4513-assignment-1.onrender.com/api/mood/studying/15)