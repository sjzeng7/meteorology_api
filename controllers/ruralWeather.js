// chiayi.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
module.exports = router.post("/", async (req, res) => {
  // selecteData內容包含selecteTownships跟selectedCounty
  const { selecteData } = req.body;
  if (selecteData.selectedCounty === "嘉義縣") {
    try {
      // 發送 GET 請求到外部 API
      const response = await axios.get(
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-031?Authorization=CWB-7BF18B7E-F0E5-45E9-828D-0FB84504F83B&sort=time"
      ); // 替換為外部 API 的 URL
      const locations = response.data.records.locations; // 取得回傳的資料
      const location = locations[0].location;
      const MinTempArray = [];
      for (let i = 0, length = location.length; i < length; i = i + 1) {
        if (selecteData.selecteTownships === location[i].locationName) {
          const locationName = [];
          locationName.push(location[i]);
          const weatherElement = locationName[0].weatherElement;
          for (
            let j = 0, length = weatherElement.length;
            j < length;
            j = j + 1
          ) {
            if (weatherElement[j].elementName === "MinT") {
              MinTempArray.push(weatherElement[j].time);
            }
          }
        }
      }
      const oldtime = [];
      const oldMinT = [];
      const newMinTempArray = MinTempArray[0];
      for (let i = 0, length = newMinTempArray.length; i < length; i = i + 1) {
        oldtime.push(newMinTempArray[i].startTime);
        oldMinT.push(newMinTempArray[i].elementValue[0].value);
      }
      const MinT = {
        time: oldtime,
        Mint: oldMinT,
      };
      console.log("==MinT");
      console.log(MinT);
      // 回傳成功的回應
      res.json(MinT);
    } catch (error) {
      // 處理錯誤，回傳錯誤的回應
      res.status(error.response?.status || 500).json({
        message: error.message,
        error: error.response?.data,
      });
    }
  }
});
