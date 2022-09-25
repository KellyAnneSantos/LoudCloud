import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
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
import SongForm from "./components/SongForm";

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
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/albums">
            <AlbumsPage />
          </Route>
          <Route path="/albums/new">
            <CreateAlbumForm />
          </Route>
          <Route exact path="/albums/:albumId">
            <AlbumShow />
          </Route>
          <Route path="/albums/:albumId/edit">
            <EditAlbumForm />
          </Route>
          <Route path="/albums/:albumId/songs/new">
            <SongForm />
          </Route>
          <Route exact path="/playlists">
            <PlaylistsPage />
          </Route>
          <Route path="/playlists/new">
            <CreatePlaylistForm />
          </Route>
          <Route exact path="/playlists/:playlistId">
            <PlaylistShow />
          </Route>
          <Route path="/playlists/:playlistId/edit">
            <EditPlaylistForm />
          </Route>
          <Route path="/">Page Doesn't Exist</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
