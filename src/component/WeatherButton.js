import { Button } from "react-bootstrap";
import styled from "styled-components";

const WeatherButton = ({ cities, selectedCity, cityChanger }) => {
    console.log(cities, selectedCity);
    const WeatherButtonWrap = styled.div`
        display: flex;
        gap: 10px;
    `;
    return (
        <WeatherButtonWrap>
            <Button
                variant={`${
                    selectedCity === "" ? "success" : "outline-success"
                }`}
                onClick={() => cityChanger("")}
            >
                Current Location
            </Button>
            {cities.map((city, index) => (
                <Button
                    variant={`${
                        selectedCity === city ? "success" : "outline-success"
                    }`}
                    onClick={() => cityChanger(`${city}`)}
                    key={index}
                >
                    {city}
                </Button>
            ))}
        </WeatherButtonWrap>
    );
};
export default WeatherButton;
