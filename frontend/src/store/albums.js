import { csrfFetch } from "./csrf";

const LOAD_ALBUMS = "albums/load";
const ADD_SONG = "songs/add";
const ADD_ALBUM = "albums/add";
const DELETE_ALBUM = "albums/delete";
const EDIT_ALBUM = "albums/edit";
const LOAD_ALBUM = "album/load";

const loadAlbums = (albums) => {
  return {
    type: LOAD_ALBUMS,
    payload: albums,
  };
};

const addSong = (song) => {
  return {
    type: ADD_SONG,
    payload: song,
  };
};

export const addAlbum = (album) => {
  return {
    type: ADD_ALBUM,
    payload: album,
  };
};

export const deleteAlbum = (id) => {
  return {
    type: DELETE_ALBUM,
    payload: id,
  };
};

export const editAlbum = (id) => {
  return {
    type: EDIT_ALBUM,
    payload: id,
  };
};

const loadAlbum = (payload) => {
  return {
    type: LOAD_ALBUM,
    payload,
  };
};

export const fetchAlbums = () => async (dispatch) => {
  const res = await csrfFetch("/api/albums");
  const albums = await res.json();

  dispatch(loadAlbums(albums));
};

export const fetchLoadAlbum = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${id}`);

  if (res.ok) {
    const album = await res.json();
    dispatch(loadAlbum(album));
    return album;
  }
  return res;
};

export const fetchAlbum = (album) => async (dispatch) => {
  const { title, description, imageUrl } = album;
  const response = await csrfFetch("/api/albums", {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      imageUrl,
    }),
  });
  const data = await response.json();
  dispatch(addAlbum(data));
  return data;
};

export const fetchDeleteAlbum = (payload) => async (dispatch) => {
  await csrfFetch(`/api/albums/${payload}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload }),
  });
  dispatch(deleteAlbum(payload));
};

export const fetchEditAlbum = (album) => async (dispatch) => {
  const { title, description, previewImage } = album;
  const res = await csrfFetch(`/api/albums/${album.id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      description,
      imageUrl: previewImage,
    }),
  });
  const data = await res.json();
  dispatch(editAlbum(data));
  return data;
};

export const uploadSong = (object) => async (dispatch) => {
  const { nested, albumId } = object;
  const response = await csrfFetch(`/api/albums/${albumId}/songs`, {
    method: "POST",
    body: JSON.stringify(nested),
  });
  const data = await response.json();
  dispatch(addSong(data));
  return data;
};
// return data instead of response bc response is encoded
// want to return data bc you're going to history.push the user to a new page that has the data as a song on the album list of songs

const albumReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ALBUMS:
      newState = { ...state };
      const albums = action.payload.Albums;
      albums.forEach((album) => {
        newState[album.id] = album;
      });
      return newState;
    case ADD_ALBUM:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_ALBUM:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    case EDIT_ALBUM:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_SONG:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case LOAD_ALBUM:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default albumReducer;
