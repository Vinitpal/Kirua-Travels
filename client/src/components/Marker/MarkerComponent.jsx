import React from "react";
import { Marker } from "react-map-gl";
import { Room } from "@material-ui/icons";

const MarkerComponent = ({ viewport, pin, currentUser, handleMarkerClick }) => {
  return (
    <Marker
      latitude={+pin.lat.$numberDecimal}
      longitude={+pin.long.$numberDecimal}
      offsetLeft={-viewport.zoom * 7}
      offsetTop={-viewport.zoom * 7}
    >
      <Room
        style={{
          fontSize: viewport.zoom * 7,
          color: pin.username === currentUser ? "tomato" : "slateblue",
          cursor: "pointer",
        }}
        onClick={() =>
          handleMarkerClick(
            pin._id,
            +pin.lat.$numberDecimal,
            +pin.long.$numberDecimal
          )
        }
      />
    </Marker>
  );
};

export default MarkerComponent;
