import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Artist from '../Artist/ArtistItem';
import Banner2 from '../../../src/images/banner2.jpeg';

export default function Event() {
  const params = useParams();

  const [events, setEvents] = useState([]);

  const [artist, setArtist] = useState('');

  const [tracks, setTracks] = useState([]);

  const [artistInfo, setArtistInfo] = useState({});

  useEffect(() => {
    axios.get(`/events/${params.id}`)
      .then(result => setEvents(result.data))
  }, [params.id]);

  const artistList = events.map(event => {
    return event.artist_name;
  });

  const showTopTracks = (e) => {
    setArtist(e.target.innerHTML)
    axios.post('/tracks', { data: e.target.innerHTML })
      .then((result) => {
        setTracks(result.data.tracks)
      })
      .then(
        axios.post('/artistInfo', { data: e.target.innerHTML })
          .then((result) => {
            // console.log('result.data', result.data)
            setArtistInfo(result.data)
          })
      )
  }

  const artists = artistList.map((artist, i) => {
    return <button onClick={showTopTracks} className='list-name' key={i}>{artist}</button>
  })

  return (
    <div>
      <div className='header-box'>
        <img src={Banner2} className="header-photo" alt="header" />
        <div className="event-header">
          <>{events[0] && <h1 className="event_header_name">{events[0].event_name}</h1>}
          </>
          {events[0] && <h2 className="event_header_date">{events[0].event_date}</h2>}
        </div>
      </div>
      <div className='event-info'>
        <div className='artist-list-content'>
          <h2 id="artists-header">ARTISTS</h2>
          <Card className='artist-card' style={{ width: '18rem' }}>
            <Card.Body className='artist-list'>
              {artists}
            </Card.Body>
          </Card>
        </div>
        <div >
          <h2 className="click">Event playlist<a id="here" style={{ textDecoration: 'none'}} href="https://open.spotify.com/playlist/4OJzv9KUCxcQzjuiR7Klgl"> here</a></h2>
          <Artist tracks={tracks} artist={artist} artistInfo={artistInfo} />
        </div>
      </div>
    </div>
  )
}


