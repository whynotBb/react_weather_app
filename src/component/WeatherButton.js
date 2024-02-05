import { Button } from "react-bootstrap";
import styled from "styled-components";

const WeatherButton = ({ cities, cityChanger }) => {
    console.log(cities);
    const WeatherButton = styled.div`
        display: flex;
        gap: 10px;
    `;
    return (
        <WeatherButton>
            <Button variant="outline-success" onClick={() => cityChanger("")}>
                Current Location
            </Button>
            {cities.map((item, index) => (
                <Button
                    variant={item.status ? "success" : "outline-success"}
                    onClick={() => cityChanger(`${item.city}`)}
                    key={index}
                >
                    {item.city}
                </Button>
            ))}
        </WeatherButton>
    );
};
export default WeatherButton;
