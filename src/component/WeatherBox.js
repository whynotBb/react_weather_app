import styled from "styled-components";
import weatherDescKo from "../data/WeatherDescKo";
const WeatherBox = ({ weather }) => {
    const WeatherBox = styled.div`
        padding: 20px;
    `;
    console.log("weather", weather);
    const matchedItem = weatherDescKo.find((item) => {
        const key = Object.keys(item)[0];
        return parseInt(key) === weather.weather[0].id;
    });
    const matchedDescription = matchedItem
        ? Object.values(matchedItem)[0]
        : weather.weather[0].description;
    return (
        <WeatherBox>
            <div>{weather?.name}</div>
            <h2>
                {weather?.main.temp}°C/
                {(weather?.main.temp * 1.8 + 32).toFixed(2)}°F
            </h2>
            <p>{weather && matchedDescription}</p>
        </WeatherBox>
    );
};
export default WeatherBox;
