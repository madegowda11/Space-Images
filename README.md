# Space Images (NASA APOD)

A small Express + static-frontend app that proxies requests to NASA's Astronomy Picture of the Day (APOD) API so the API key is kept server-side.

This repository is already on GitHub — use it as the canonical source of truth. The instructions below cover how to run locally, safely configure your API key, and optional deployment notes.

## Features
- Serve today's APOD or a specific date
- Fetch random APOD items
- Backend proxy keeps the NASA API key out of client-side code
- Simple responsive frontend

## Quick links
- API endpoint: `GET /api/apod` (see usage below)

## Requirements
- Node.js 18+ (for built-in fetch)
- npm 
- A NASA API key: https://api.nasa.gov/

## Local setup

1. Clone the repo
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the project root and add your API key:
```env
NASA_API_KEY=YOUR_NASA_API_KEY_HERE
```
> Do NOT commit `.env` to the repository. This repo includes `.gitignore` with `.env` excluded.

4. Run the app
```bash
npm start
```

5. Open in your browser:
```
http://localhost:3000
```

## Environment variables
- `NASA_API_KEY` — (required) your NASA API key.
- `PORT` — (optional) port to run the server (defaults to `3000`).

## API / Usage

Backend proxy endpoint:
- `GET /api/apod`
  - Query params:
    - `date=YYYY-MM-DD` (optional) — fetch APOD for a specific date
    - `count=N` (optional) — fetch N random APOD items (returns an array)
    - `thumbs=true|false` (optional) — request video thumbnails

Examples:
- Today's APOD:
  ```
  curl http://localhost:3000/api/apod
  ```
- Specific date:
  ```
  curl "http://localhost:3000/api/apod?date=2021-12-01"
  ```
- Random item:
  ```
  curl "http://localhost:3000/api/apod?count=1"
  ```

The endpoint returns exactly what the NASA APOD API returns (an object or an array when `count` is used).


## Deployment notes

Because this project contains a small Node/Express server, common deployment targets are:
- Render / Heroku / Fly / Railway — set `NASA_API_KEY` as an environment variable in the service's dashboard.
- Docker — build and run a container (example Dockerfile can be added).
- Vercel — suitable for frontends or serverless functions; if you use Vercel add a serverless function that proxies the APOD API and reads the secret from Vercel's Environment Variables.

When deploying from GitHub, do NOT store the API key in the repo. Instead:
- Use the host's secret/env var configuration.
- Or if you use GitHub Actions to deploy, store `NASA_API_KEY` in repository secrets and pass it to the deployment job.

## Contributing
Contributions welcome. 

Before submitting a PR:
- Open an issue to discuss significant changes.

## Issues & Support
If you find bugs or want features, open an issue on this repository.

## API KEY
```
o6ixYloELK4VQaxEDIUtkzWlKzGaNqgab8ZfoeXm
```

## Live Project Link
```
https://6pmz9nvk-3000.inc1.devtunnels.ms/
```
*Note*:
This link doesn't work all the time
