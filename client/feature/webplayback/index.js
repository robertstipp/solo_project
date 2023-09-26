import React, { useState, useEffect } from 'react';

import styled from 'styled-components'
import axios from 'axios'

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback(props) {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);
    const [isDeviceActive, setDeviceActive] = useState(true);


    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log('hello')
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
                setDeviceActive(false);
            });

            player.addListener('player_state_changed', (state => {
                if (!state) {
                    setDeviceActive(false);
                    setTrack(track); // set to default track object
                } else {
                    setDeviceActive(true);
                    setTrack(state?.track_window?.current_track ?? track);
                }
                setPaused(state?.paused ?? false);
            
                player.getCurrentState().then(state => { 
                    (!state) ? setActive(false) : setActive(true);
                });
            }));
            

            player.connect();

        };
    }, []);

    if (!is_active) { 
        return (
            <>
                {/* <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div> */}
                <Container className="container">
                    <div className="main-wrapper">

                    <img src={current_track?.album?.images?.[0]?.url ?? ""} className="now-playing__cover" alt="" />

                        <div className="now-playing__side">
                            <div className="now-playing__name">{current_track.name}</div>
                            <div className="now-playing__artist">{current_track.artists[0].name}</div>
                            <Controls>
                                <BackButton onClick={() => { player.previousTrack() }} >
                                </BackButton>
    
                                <Pause onClick={() => { player.togglePlay() }} >
                                    {/* { is_paused ? "PLAY" : "PAUSE" } */}
                                </Pause>
    
                                <ForwardButton onClick={() => { player.nextTrack() }} >
                                </ForwardButton>
                            </Controls>
                            
                        </div>
                    </div>
                </Container>
            </>)
            
    } else {
        

        return (
            <>
                {/* <Container className="container">
                    <div className="main-wrapper">

                    <img src={current_track?.album?.images?.[0]?.url ?? ""} className="now-playing__cover" alt="" />

                        <div className="now-playing__side">
                            <div className="now-playing__name">{current_track.name}</div>
                            <div className="now-playing__artist">{current_track.artists[0].name}</div>

                            <Button onClick={() => { player.previousTrack() }} >
                                &lt;&lt;
                            </Button>

                            <Button onClick={() => { player.togglePlay() }} >
                                { is_paused ? "PLAY" : "PAUSE" }
                            </Button>

                            <Button onClick={() => { player.nextTrack() }} >
                                &gt;&gt;
                            </Button>
                        </div>
                    </div>
                </Container> */}
                <Container className="container">


                        <TrackInfo>
                        {/* <Controls>
                                <BackButton onClick={() => { player.previousTrack() }} >
                                </BackButton>
    
                                <Pause onClick={() => { player.togglePlay() }} >
                                    { is_paused ? "PLAY" : "PAUSE" }
                                </Pause>
    
                                <ForwardButton onClick={() => { player.nextTrack() }} >
                                </ForwardButton>
                        </Controls> */}
                            <Track>{current_track.name}</Track>
                            <Artist>{current_track.artists[0].name}</Artist>
                            
                            
                        </TrackInfo>

                    <AlbumArt src={current_track?.album?.images?.[0]?.url ?? ""}  alt="" />
                </Container>
            </>
        );
    }
}

const Track = styled.div`
font-family: var(--primary-font);
font-size: 1.5rem;
`

const Artist = styled.div`
font-family: var(--primary-font);
font-size: .75rem;
`
const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`

const Controls = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12.5px;
`
const TrackInfo = styled.div`
    align-self: flex-end;
`

const AlbumArt = styled.img`
    height: 100px;
    width: 100px;

`
const BackButton = styled.button`
    /* background-color: var(--primary-red); */
    height: 25px;
    width: 25px;
    border-radius: 100%;
    border: 0px solid transparent;
    &:hover {
        background-color: var(--primary-red);
    }
`
const ForwardButton = styled.button`
    /* background-color: var(--primary-red); */
    height: 25px;
    width: 25px;
    border-radius: 100%;
    border: 0px solid transparent;

    &:hover {
        background-color: var(--primary-blue);
    }
`

const Pause = styled.button`
    /* background-color: var(--primary-yellow); */
    height: 50px;
    width: 50px;
    border-radius: 100%;
    border: 0px solid transparent ;
    &:hover {
        background-color: var(--primary-yellow);
    }
`

const Button = styled.button`
    background-color: none;
    border: 2px solid black;
    padding: .5rem;
    font-family: var(--primary-font);
`

export default WebPlayback