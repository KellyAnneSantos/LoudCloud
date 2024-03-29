import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AlbumsPage from "./components/AlbumsPage";
import CreateAlbumForm from "./components/CreateAlbumForm";
import EditAlbumForm from "./components/EditAlbumForm";
import AlbumShow from "./components/AlbumShow";
import PlaylistsPage from "./components/PlaylistsPage";
import CreatePlaylistForm from "./components/CreatePlaylistForm";
import EditPlaylistForm from "./components/EditPlaylistForm";
import PlaylistShow from "./components/PlaylistShow";
import CreateSongForm from "./components/CreateSongForm";
import Home from "./components/Home";
// import Footer from "./components/Footer";
// import Test from "./components/Test";
import SongShow from "./components/SongShow";
import EditSongForm from "./components/EditSongForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route path="/login">
            <LoginFormPage />
          </Route> */}
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/albums">
            <AlbumsPage />
            {/* <Test /> */}
          </Route>
          <Route exact path="/albums/new">
            <CreateAlbumForm />
          </Route>
          <Route exact path="/albums/:albumId">
            <AlbumShow isLoaded={isLoaded} />
          </Route>
          <Route path="/albums/:albumId/edit">
            <EditAlbumForm />
          </Route>
          <Route path="/albums/:albumId/songs/new">
            <CreateSongForm />
          </Route>
          <Route exact path="/songs/:songId">
            <SongShow />
          </Route>
          <Route path="/songs/:songId/edit">
            <EditSongForm />
          </Route>
          <Route exact path="/playlists">
            <PlaylistsPage />
          </Route>
          <Route exact path="/playlists/new">
            <CreatePlaylistForm />
          </Route>
          <Route exact path="/playlists/:playlistId">
            <PlaylistShow />
          </Route>
          <Route exact path="/playlists/:playlistId/edit">
            <EditPlaylistForm />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      )}
      {/* <Footer /> */}
    </>
  );
}

export default App;
