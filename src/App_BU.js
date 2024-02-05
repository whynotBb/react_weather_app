import { useEffect, useState } from "react";
import "./App.css";

// 1. 앱이 실행되자마자 현위치 기반의 날씨 보인다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태
// 3. 5개의 버튼 = 1. 현위치, 4개는 다른도시
// 4. 도시 버튼 클릭 시 도시별 날씨
// 5. 현재위치 버튼을 누르면, 다시 현위치 기반의 날씨가 제공
// 6. 데이터를 가져오는 동안 로딩 스피너
function App() {
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const getCurrentLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLon(position.coords.longitude);
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                }
            );
        };

        getCurrentLocation();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (lat !== null && lon !== null) {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6dd95cfc5f180ab7bf62671b417e6c68`
                    );
                    if (response.ok) {
                        const result = await response.json();
                        setData(result);
                        console.log(data);
                    } else {
                        console.error(`HTTP error! Status: ${response.status}`);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [lat, lon]);

    // Rest of your component logic

    return (
        <div>
            {data ? (
                // 데이터를 사용하여 원하는 렌더링 작업 수행
                <p>{data.weather[0].description}</p>
            ) : (
                // 데이터가 로드되지 않았을 때의 로딩 상태를 표시
                <p>로딩 중...</p>
            )}
        </div>
    );
}

export default App;
