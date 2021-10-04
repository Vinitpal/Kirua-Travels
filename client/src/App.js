import { useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import "./App.css";

import axios from "axios";
import MarkerComponent from "./components/Marker/MarkerComponent";
import PopupComponent from "./components/Popup/PopupComponent";
import AddNewMarker from "./components/AddNewMarker/AddNewMarker";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

function App() {
  const myStorage = window.localStorage;
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [showRegister, setShowRegister] = useState(null);
  const [showLogin, setShowLogin] = useState(null);
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));

  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const addNewMarker = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/kirua12/cku6ewlob3hzi18mnpp6bft4s"
        onDblClick={addNewMarker}
        transitionDuration="200"
      >
        {/* If there are any pins then show pins with popup */}
        {pins.length > 0 &&
          pins.map((pin, i) => (
            <div key={i}>
              <MarkerComponent
                viewport={viewport}
                currentUser={currentUser}
                pin={pin}
                handleMarkerClick={handleMarkerClick}
              />
              {pin._id === currentPlaceId && (
                <PopupComponent
                  pin={pin}
                  setCurrentPlaceId={setCurrentPlaceId}
                />
              )}
            </div>
          ))}

        {/* add new marker if newPlace  */}
        {newPlace && (
          <AddNewMarker
            newPlace={newPlace}
            setNewPlace={setNewPlace}
            pins={pins}
            setPins={setPins}
            currentUser={currentUser}
          />
        )}

        {/* logout and Login/register */}
        {currentUser ? (
          <button
            className="button logout"
            onClick={() => {
              setCurrentUser(null);
              myStorage.removeItem("user");
            }}
          >
            Log out
          </button>
        ) : (
          <div className="buttons-wrapper">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}

        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUser={setCurrentUser}
            myStorage={myStorage}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
