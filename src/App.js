import SearchAutocomplete from "./components/SearchAutocomplete/SearchAutocomplete";
import Map from "./components/Map/Map";
import { CssBaseline } from "@mui/material";

function App() {

  const handlePlaceSelected = (location) => {

    const lat = location.lat();
    const lng = location.lng();
    console.log("Selected Location:", lat, lng);

  };

  return (
    <>
      <CssBaseline />
      <SearchAutocomplete onPlaceSelected={handlePlaceSelected} />
      <Map />
    </>
  );
}

export default App;
