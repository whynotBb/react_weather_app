import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import { Button } from "react-bootstrap";

// 1. 앱이 실행되자마자 현위치 기반의 날씨 보인다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태
// 3. 5개의 버튼 = 1. 현위치, 4개는 다른도시
// 4. 도시 버튼 클릭 시 도시별 날씨
// 5. 현재위치 버튼을 누르면, 다시 현위치 기반의 날씨가 제공
// 6. 데이터를 가져오는 동안 로딩 스피너
function App() {
    const [weather, setWeather] = useState(null);
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                getWeatherByCurrentLocation(lat, lon);
            },
            (error) => {
                console.error("Error getting geolocation:", error);
            }
        );
    };

    const getWeatherByCurrentLocation = async (lat, lon) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6dd95cfc5f180ab7bf62671b417e6c68&units=metric`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        setWeather(data);
    };
    const getWeatherByCity = async (city) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6dd95cfc5f180ab7bf62671b417e6c68&units=metric`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        setWeather(data);
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const handleLocation = (city) => {
        if (city) {
            getWeatherByCity(city);
        } else {
            getCurrentLocation();
        }
    };

    return (
        <div>
            <div className="container">
                <WeatherBox weather={weather} />
                <WeatherButton handleLocation={handleLocation} />
            </div>
        </div>
    );
}

export default App;
