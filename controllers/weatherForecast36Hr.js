const express = require("express");
const router = express.Router();
const axios = require("axios");
module.exports = router.post("/", async (req, res) => {
  const { selectedCounty } = req.body;
  // selectedCounty是所選縣市
  // 根據所選縣市，將相關的資料回傳前端
  try {
    // 發送 GET 請求到外部 API
    const response = await axios.get(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-7BF18B7E-F0E5-45E9-828D-0FB84504F83B&format=JSON&locationName=&sort=time"
    ); // 替換為外部 API 的 URL
    const location = response.data.records.location; // 取得回傳的資料
    const maxTemp = [];
    const minTemp = [];
    const pop = [];
    const timeArray = [];
    for (let i = 0, length = location.length; i < length; i = i + 1) {
      const locationName = location[i].locationName;
      if (selectedCounty === locationName) {
        // 獲得最高溫度
        const MaxTempTime = location[i].weatherElement[4].time;
        for (let j = 0, length = MaxTempTime.length; j < length; j = j + 1) {
          maxTemp.push(+MaxTempTime[j].parameter.parameterName);
        }
        // 獲得最低溫度
        const MinTempTime = location[i].weatherElement[2].time;
        for (let j = 0, length = MinTempTime.length; j < length; j = j + 1) {
          minTemp.push(+MinTempTime[j].parameter.parameterName);
        }
        // 獲得降雨機率
        const popArray = location[i].weatherElement[1].time;
        for (let j = 0, length = popArray.length; j < length; j = j + 1) {
          pop.push(+popArray[j].parameter.parameterName);
        }
        const time = location[i].weatherElement[1].time;
        for (let j = 0, length = time.length; j < length; j = j + 1) {
          timeArray.push(time[j].startTime);
        }
      }
    }
    // 回傳成功的回應
    console.log("=======timeArray");
    console.log(timeArray);
    const weatherForecast36Hr = {
      maxTemp: maxTemp,
      minTemp: minTemp,
      pop: pop,
      timeArray: timeArray,
    };
    res.json(weatherForecast36Hr);
  } catch (error) {
    // 處理錯誤，回傳錯誤的回應
    res.status(error.response?.status || 500).json({
      message: error.message,
      error: error.response?.data,
    });
  }
});
