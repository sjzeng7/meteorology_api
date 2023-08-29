// PoP12h=12小時降雨機率 
// T=平均溫度
// RH=平均相對濕度
// MinCI=最小舒適度指數
// WS=最大風速
// MaxAT=最高體感溫度
// Wx=天氣現象
// MaxCI=最大舒適度指數
// MinT=最低溫度 OK
// UVI=紫外線指數
// MinAT=最低體感溫度
// MaxT=最高溫度
// WD=風向
// Td=平均露點溫度
const express = require("express");
const router = express.Router();
const axios = require("axios");
let url = ""
module.exports = router.post("/", async (req, res) => {
  // selecteData內容包含selecteTownships跟selectedCounty
  const { selecteData } = req.body;
  const map = {
    "臺北市": '063',
    "嘉義縣": '031',
    "新北市": '071',
    "嘉義市": '059',
    "新竹縣": '011',
    "新竹市": '055',
    "臺南市": '079',
    "宜蘭縣": '003',
    "苗栗縣": '015',
    "雲林縣": '027',
    "花蓮縣": '043',
    "臺中市": '075',
    "臺東縣": '039',
    "桃園市": '007',
    "南投縣": '023',
    "高雄市": '067',
    "金門縣": '087',
    "屏東縣": '035',
    "基隆市": '051',
    "澎湖縣": '047',
    "連江縣": '083'
  }
  url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${map[selecteData.selectedCounty]}?Authorization=CWB-7BF18B7E-F0E5-45E9-828D-0FB84504F83B`

  try {
    // 發送 GET 請求到外部 API
    const response = await axios.get(
      url
    );
    const locations = response.data.records.locations; // 取得回傳的資料
    const location = locations[0].location;
    const PoP12hArray = [];
    const TArray = [];
    const RHArray = [];
    const MinCIArray = [];
    const WSArray = [];
    const MaxATArray = [];
    const WxArray = [];
    const MaxCIArray = [];
    const MinTempArray = [];
    const UVIArray = [];
    const MinATArray = [];
    const MaxTArray = [];
    const WDArray = [];
    const TdArray = [];
    for (let i = 0, length = location.length; i < length; i = i + 1) {
      if (selecteData.selecteTownships === location[i].locationName) {
        const locationName = [];
        locationName.push(location[i]);
        // Data為weatherElement
        const weatherElement = locationName[0].weatherElement;
        for (
          let j = 0, length = weatherElement.length;
          j < length;
          j = j + 1
        ) {
          if (weatherElement[j].elementName === "PoP12h") {
            PoP12hArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "T") {
            TArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "RH") {
            RHArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "MinCI") {
            MinCIArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "WS") {
            WSArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "MaxAT") {
            MaxATArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "Wx") {
            WxArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "MaxCI") {
            MaxCIArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "MinT") {
            MinTempArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "UVI") {
            UVIArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "MinAT") {
            MinATArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "MaxT") {
            MaxTArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "WD") {
            WDArray.push(weatherElement[j].time);
          }
          if (weatherElement[j].elementName === "Td") {
            TdArray.push(weatherElement[j].time);
          }
        }
      }
    }
    // PoP12h=12小時降雨機率
    const oldPoP12hTime = [];
    const oldPoP12h = [];
    const newPoP12hArray = PoP12hArray[0];
    for (let i = 0, length = newPoP12hArray.length; i < length; i = i + 1) {
      oldPoP12hTime.push(newPoP12hArray[i].startTime);
      if (newPoP12hArray[i].elementValue[0].value === " ") {
        oldPoP12h.push(+"0")
      } else{
        oldPoP12h.push(+newPoP12hArray[i].elementValue[0].value);
      }
    }
    // T=平均溫度
    const oldTtime = [];
    const oldT = [];
    const newTArray = TArray[0];
    for (let i = 0, length = newTArray.length; i < length; i = i + 1) {
      oldTtime.push(newTArray[i].startTime);
      if (+newTArray[i].elementValue[0].value === " ") {
        oldT.push("0");
      }else{
        oldT.push(+newTArray[i].elementValue[0].value);
      }
    }
    // RH=平均相對濕度
    const oldRHtime = [];
    const oldRH = [];
    const newRHArray = RHArray[0];
    for (let i = 0, length = newRHArray.length; i < length; i = i + 1) {
      oldRHtime.push(newRHArray[i].startTime);
      oldRH.push(+newRHArray[i].elementValue[0].value);
    }
    // MinCI=最小舒適度指數
    const oldMinCItime = [];
    const oldMinCI = [];
    const newMinCIArray = MinCIArray[0];
    for (let i = 0, length = newMinCIArray.length; i < length; i = i + 1) {
      oldMinCItime.push(newMinCIArray[i].startTime);
      oldMinCI.push(+newMinCIArray[i].elementValue[0].value);
    }
    // WS=最大風速
    const oldWStime = [];
    const oldWS = [];
    const newWSArray = WSArray[0];
    for (let i = 0, length = newWSArray.length; i < length; i = i + 1) {
      oldWStime.push(newWSArray[i].startTime);
      oldWS.push(+newWSArray[i].elementValue[0].value);
    }
    // MaxAT=最高體感溫度
    const oldMaxATtime = [];
    const oldMaxAT = [];
    const newMaxATArray = MaxATArray[0];
    for (let i = 0, length = newMaxATArray.length; i < length; i = i + 1) {
      oldMaxATtime.push(newMaxATArray[i].startTime);
      oldMaxAT.push(+newMaxATArray[i].elementValue[0].value);
    }
    // Wx=天氣現象
    // 內容為中文描述
    const oldWxtime = [];
    const oldWx = [];
    const newWxArray = WxArray[0];
    for (let i = 0, length = newWxArray.length; i < length; i = i + 1) {
      oldWxtime.push(newWxArray[i].startTime);
      oldWx.push(newWxArray[i].elementValue[0].value);
    }
    // MaxCI=最大舒適度指數
    const oldMaxCItime = [];
    const oldMaxCI = [];
    const newMaxCIArray = MaxCIArray[0];
    for (let i = 0, length = newMaxCIArray.length; i < length; i = i + 1) {
      oldMaxCItime.push(newMaxCIArray[i].startTime);
      oldMaxCI.push(+newMaxCIArray[i].elementValue[0].value);
    }
    // MinT=最低溫度
    const oldMinTime = [];
    const oldMinT = [];
    const newMinTempArray = MinTempArray[0];
    for (let i = 0, length = newMinTempArray.length; i < length; i = i + 1) {
      oldMinTime.push(newMinTempArray[i].startTime);
      oldMinT.push(+newMinTempArray[i].elementValue[0].value);
    }
    // UVI=紫外線指數
    const oldUVITime = [];
    const oldUVI = [];
    const newUVIArray = UVIArray[0];
    for (let i = 0, length = newUVIArray.length; i < length; i = i + 1) {
      oldUVITime.push(newUVIArray[i].startTime);
      oldUVI.push(+newUVIArray[i].elementValue[0].value);
    }
    // MinAT=最低體感溫度
    const oldMinATTime = [];
    const oldMinAT = [];
    const newMinATArray = MinATArray[0];
    for (let i = 0, length = newMinATArray.length; i < length; i = i + 1) {
      oldMinATTime.push(newMinATArray[i].startTime);
      oldMinAT.push(+newMinATArray[i].elementValue[0].value);
    }
    // MaxT=最高溫度
    const oldMaxTTime = [];
    const oldMaxT = [];
    const newMaxTArray = MaxTArray[0];
    for (let i = 0, length = newMaxTArray.length; i < length; i = i + 1) {
      oldMaxTTime.push(newMaxTArray[i].startTime);
      oldMaxT.push(+newMaxTArray[i].elementValue[0].value);
    }
    // WD=風向
    const oldWDTime = [];
    const oldWD= [];
    const newWDArray = WDArray[0];
    for (let i = 0, length = newWDArray.length; i < length; i = i + 1) {
      oldWDTime.push(newWDArray[i].startTime);
      oldWD.push(+newWDArray[i].elementValue[0].value);
    }
    // Td=平均露點溫度
    const oldTdTime = [];
    const oldTd = [];
    const newTdArray = TdArray[0];
    for (let i = 0, length = newTdArray.length; i < length; i = i + 1) {
      oldTdTime.push(newTdArray[i].startTime);
      oldTd.push(+newTdArray[i].elementValue[0].value);
    }
    const PoP12h = {
      time: oldPoP12hTime,
      Mint: oldPoP12h,
    };
    const T = {
      time: oldTtime,
      Mint: oldT,
    };
    const RH = {
      time: oldRHtime,
      Mint: oldRH,
    };
    const MinCI = {
      time: oldMinCItime,
      Mint: oldMinCI,
    };
    const WS = {
      time: oldWStime,
      Mint: oldWS,
    };
    const MaxAT = {
      time: oldMaxATtime,
      Mint: oldMaxAT,
    };
    const Wx = {
      time: oldWxtime,
      Mint: oldWx,
    };
    const MaxCI = {
      time: oldMaxCItime,
      Mint: oldMaxCI,
    };
    const MinT = {
      time: oldMinTime,
      Mint: oldMinT,
    };
    const UVI = {
      time: oldUVITime,
      Mint: oldUVI,
    };
    const MinAT = {
      time: oldMinATTime,
      Mint: oldMinAT,
    };
    const MaxT = {
      time: oldMaxTTime,
      Mint: oldMaxT,
    };
    const WD = {
      time: oldWDTime,
      Mint: oldWD,
    };
    const Td = {
      time: oldTdTime,
      Mint: oldTd,
    };
    const allData = {
      PoP12h,
      T,
      RH,
      MinCI,
      WS,
      MaxAT,
      Wx,
      MaxCI,
      MinT,
      UVI,
      MinAT,
      MaxT,
      WD,
      Td,
    }
    // 回傳成功的回應
    res.json(allData);
  } catch (error) {
    // 處理錯誤，回傳錯誤的回應
    res.status(error.response?.status || 500).json({
      message: error.message,
      error: error.response?.data,
    });
  }
});
