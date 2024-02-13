import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import { Button } from "react-bootstrap";
import { ScaleLoader } from "react-spinners";
import SearchBox from "./component/SearchBox";
import Homepage from "./page/Homepage";
import Aboutpage from "./page/Aboutpage";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductPage from "./page/ProductPage";
import ProductDetailPage from "./page/ProductDetailPage";
import LoginPage from "./page/LoginPage";
import User from "./page/User";

function App() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("");
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState("");
    const errorTxt = [
        { code: "400", txt: "잘못된 요청입니다." },
        { code: "401", txt: "승인되지 않은 요청입니다." },
        { code: "404", txt: "찾을 수 없습니다." },
        { code: "429", txt: "요청이 너무 많습니다." },
    ];
    const cities = ["jeju", "paris", "new york", "seoul"];
    const cityChanger = (city) => {
        setCity(city);
        setStatus(true);
    };
    const [loading, setLoading] = useState(true);
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
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6dd95cfc5f180ab7bf62671b417e6c68&units=metric`;
            setLoading(true);
            let response = await fetch(url);

            if (!response.ok) {
                // Handle non-successful HTTP responses
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data = await response.json();
            console.log(data);
            setWeather(data);
            setLoading(false);
        } catch (error) {
            // Handle any errors that occurred during the fetch or processing of data
            console.error("Error fetching weather data:", error.message);
            setError(true);
            setLoading(false);
        }
    };
    const getWeatherByCity = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6dd95cfc5f180ab7bf62671b417e6c68&units=metric`;
            setLoading(true);
            let response = await fetch(url);

            if (!response.ok) {
                // Handle non-successful HTTP responses
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data = await response.json();
            console.log(data);
            setWeather(data);
            setLoading(false);
        } catch (error) {
            // Handle any errors that occurred during the fetch or processing of data
            console.error("Error fetching weather data:", error.code);
            const errorCode = error.message.slice(-3);
            console.log(errorCode);
            setError(true);
            setLoading(false);
            setErrorCode(errorCode);
        }
    };

    useEffect(() => {
        {
            city ? getWeatherByCity() : getCurrentLocation();
        }
    }, [city]);
    const reloadPage = () => {
        window.location.reload();
    };

    const [authenticate, setAuthenticate] = useState(false);
    // PrivateRoute -> 보호해야할 페이지가 있을때, 리다이렉트할 페이지를 설정 해 준다.
    const PrivateRoute = () => {
        return authenticate === true ? <User /> : <Navigate to="/login" />;
        // Navigate -> redirect 할 수 있도록 도와주는 컴포넌트(react router dom 에서 제공)
    };
    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/about" element={<Aboutpage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route
                        path="/products/:id"
                        element={<ProductDetailPage />}
                    />
                    {/* <Route
                        path="/products/:id/:num"
                        element={<ProductDetailPage />}
                    /> */}
                    {/* ㄴ> 컴포넌트에서는 usePrams를 통해 {id:'aa',num:'123'}으로 받아 이용할 수 있음  */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/user" element={<PrivateRoute />} />
                </Routes>
            </div>
            <div>
                <div className="container">
                    {loading ? (
                        <ScaleLoader
                            color="#36d7b7"
                            loading={loading}
                            size={150}
                        />
                    ) : !error ? (
                        <>
                            <SearchBox
                                cities={cities}
                                cityChanger={cityChanger}
                            />
                            <WeatherBox weather={weather} />
                            <WeatherButton
                                cities={cities}
                                selectedCity={city}
                                cityChanger={cityChanger}
                            />
                        </>
                    ) : (
                        <>
                            {errorTxt.map(
                                (item, index) =>
                                    item.code === errorCode && <p>{item.txt}</p>
                            )}
                            <Button onClick={reloadPage}>
                                Current Location
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
