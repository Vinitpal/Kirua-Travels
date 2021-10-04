import React from "react";
import { Popup } from "react-map-gl";
import { format } from "timeago.js";
import { Star } from "@material-ui/icons";
import "./popup.styles.css";

const PopupComponent = ({ pin, setCurrentPlaceId }) => {
  let key = 1; // key for the stars

  return (
    <Popup
      latitude={+pin.lat.$numberDecimal}
      longitude={+pin.long.$numberDecimal}
      closeButton={true}
      closeOnClick={false}
      onClose={() => setCurrentPlaceId(null)}
      anchor="top"
    >
      <div className="card">
        <label>Place</label>
        <h4>{pin.title}</h4>

        <label>Review</label>
        <p className="desc">{pin.desc}</p>

        <label>Rating</label>
        <div className="stars">
          {Array(pin.rating).fill(<Star className="star" key={(key += 1)} />)}
        </div>

        <label>Information</label>
        <span className="username">
          Created by <b>{pin.username}</b>
        </span>

        <span className="time">{format(pin.createdAt)}</span>
      </div>
    </Popup>
  );
};

export default PopupComponent;
