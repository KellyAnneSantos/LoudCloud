import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadSong } from "../../store/albums";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchAddSong } from "../../store/songs";

const CreateSongForm = () => {
  const { albumId } = useParams();
  let album = useSelector((state) => state.albums[albumId]);
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  if (!user?.id) return <Redirect to="/albums" />;
  if (album?.userId !== user?.id) return <Redirect to="/albums" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let song = { title, description, url, imageUrl };
    setErrors([]);

    const response = await dispatch(fetchAddSong(song, albumId)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    if (response) history.push(`/albums/${albumId}`);
  };

  return (
    <div id="center-form">
      <span id="hd-btn">HD</span>
      <p id="basic-orange">Add new song</p>
      <hr id="discover-hrs2" />
      <hr className="retrys" />
      <form onSubmit={handleSubmit}>
        <div id="create-play-flex">
          <div id="back-gradient"></div>
          <div>
            <p className="playlist-text">Name</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="emails"
            />
            <p className="playlist-textss">Artist</p>
            <input
              className="emailss"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="playlist-textss">Song URL Address</p>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="emailss"
            />
            <p className="playlist-textsss">Image URL Address</p>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="emailss"
            />
            <ul className="create-play-errors">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="retry" />
        <div id="bottom-playlist">
          <p id="asterisk-means">Required fields</p>
          <button type="submit" id="play-form-btn">
            Save changes
          </button>
        </div>
        <hr className="retry" />
      </form>
      <p id="important-p">
        <b>Important:</b> By sharing, you confirm that your playlist complies
        with our Terms of use and doesn't infringe anyone else's rights. If in
        doubt, refer to the Copyright information pages and FAQs before
        uploading.
      </p>
    </div>
  );
};

export default CreateSongForm;
