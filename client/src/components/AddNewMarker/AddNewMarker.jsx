import React, { useState } from "react";
import { Popup } from "react-map-gl";
import axios from "axios";
import "./newMarker.styles.css";

const AddNewMarker = ({
  newPlace,
  setNewPlace,
  pins,
  setPins,
  currentUser,
}) => {
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popup
      latitude={newPlace.lat}
      longitude={newPlace.long}
      closeButton={true}
      closeOnClick={false}
      onClose={() => setNewPlace(null)}
      anchor="top"
    >
      <div>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            placeholder="Enter a title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Review</label>
          <textarea
            placeholder="Share something about this place"
            onChange={(e) => setDesc(e.target.value)}
          />
          <label>Rating</label>
          <select onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button className="submitButton" type="submit">
            {" "}
            Add Pin
          </button>
        </form>
      </div>
    </Popup>
  );
};

export default AddNewMarker;
