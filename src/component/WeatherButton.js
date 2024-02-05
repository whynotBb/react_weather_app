import { Button } from "react-bootstrap";

const WeatherButton = ({ handleLocation }) => {
    return (
        <div>
            <Button variant="outline-success" onClick={() => handleLocation()}>
                Current Location
            </Button>
            <Button
                variant="outline-success"
                onClick={() => handleLocation("jeju")}
            >
                jeju
            </Button>
            <Button
                variant="outline-success"
                onClick={() => handleLocation("new york")}
            >
                new york
            </Button>
        </div>
    );
};
export default WeatherButton;
