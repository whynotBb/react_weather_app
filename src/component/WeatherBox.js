import styled from "styled-components";
const WeatherBox = ({ weather }) => {
    const WeatherBox = styled.div`
        padding: 20px;
    `;
    console.log("weather", weather);
    return (
        <WeatherBox>
            <div>{weather?.name}</div>
            <h2>
                {weather?.main.temp}°C/
                {(weather?.main.temp * 1.8 + 32).toFixed(2)}°F
            </h2>
            <h3>{weather?.weather[0].description}</h3>
        </WeatherBox>
    );
};
export default WeatherBox;
