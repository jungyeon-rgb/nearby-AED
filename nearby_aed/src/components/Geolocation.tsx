import axios from "axios";

const onGeoOk = (position: GeolocationPosition) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Kakao REST API에 get 요청을 보냅니다.
  // 파라미터 x, y에 lon, lat을 넣어주고 API_KEY를 Authorization 헤더에 넣어줍니다.
  axios
    .get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,
      {
        headers: { Authorization: `KakaoAK ${process.env.REACT_APP_REST_API}` },
      }
    )
    .then((res) => {
      console.log(res.data.documents);
      dispatch(changeRegion(res.data.documents[0].address.region_1depth_name));
      dispatch(changeCity(res.data.documents[0].address.region_2depth_name));
    })
    .catch((e) => console.log(e));
};

const onGeoError = () => {
  alert("위치권한을 확인해주세요");
};

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

export const Geolocation = () => {
  return "현재위치컴포넌트입니다";
};

export default Geolocation;
