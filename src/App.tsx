import { useState } from 'react';
import './App.css'
import { TopSongs } from './types';

function App() {
const [topFiveSongs, setTopFiveSongs]: TopSongs = useState({});
const [artist, setArtist] = useState({});
  // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQD4LkuYCO0JI89ivE6K8-SRlSOdgpf3mMiNWJVBs-bX_5QRHrvtoxUZvBUcb7I9bquFNfDcsK015yQVPRudA9r-PkpcidMtz43Q7i4MUrAHGdxlg2cBAZOwcjrLJbsxOIxyX_ShfMsm0Jq4ks4Rfw1u4CxgvVketLAVX6x96tCzLjrGy6wGx_W0wilHj-IYzwEAgr4WOwkid-BKDwxAgNgnPVCcPhbMEpJZf0NYKMLa9NBLKU4mi99vsYxxCQuA0PMWigntzmMJyyFHA4azbE71';
async function fetchWebApi(endpoint, method) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  const songs = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET');
  setTopFiveSongs(songs);
  console.log(songs.items.map((item) => item.album.name));
  return topFiveSongs;
}

async function searchForArtists(event) {
  event.preventDefault();
  const artist = event.target[0].value;
  const params = new URLSearchParams({
    type: "artist", 
    q: artist,
  });
  const artists = await fetchWebApi(`v1/search?${params}`, "GET");
  console.log(artists);
  setArtist(artists.artists.items[0]);
  
}

  return (
  <div>  
    <button onClick={getTopTracks}>pesquisar Top 5</button>
    <ul>
      {topFiveSongs.items?.map((item) => (
      <li>{item.album.name}</li>
      ))}
    </ul>

    
    <form onSubmit={searchForArtists}>
      <label htmlFor="artist">Nome do artista</label>
      <input type="text" name='' id='artist'/>
      <br />
      <button>pesquisar Artistas</button>;
      {artist.external_urls && (
        <a href={artist.external_urls.spotify} target='blank'>
        Acessar detalhes do artista</a> 
      )}
      
    </form>
  </div>
);
}

export default App
