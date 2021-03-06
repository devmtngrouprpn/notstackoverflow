import stringSimilarity from "string-similarity";
import axios from "axios";
export function toggle(value) {
  return !value;
}
export const timeFunction = postedDate => {
  var cD = "2019-02-11T01:37:54.015Z";
  let cD2 = cD.split("T");
  let currentDate = new Date(cD2[0] + " " + cD2[1].split("Z")[0]);
  let first = postedDate.split("T");
  var qMade = new Date(first[0] + " " + first[1].split("Z")[0]);
  const time = function (currentTime, postTime) {
    var delta = Math.floor(
      Math.abs(currentTime.getTime() - postTime.getTime()) / 10
    );
    return delta;
  };
  return time(qMade, currentDate);
};

export function Ads(num) {
  // num = Math.floor(Math.random() * 2);
  let API = [
    {
      name: "Pyrofex Corporation",
      background: "",
      logo: "https://pyrofex.io/wp-content/uploads/2018/08/Reddit-Icon.png",
      location: "Orem, UT",
      industry: { type: "CryptoCurency" },
      funds: false,
      size: "11-50",
      techStack: [
        "scala",
        "linux",
        "haskell",
        "rholang",
        "javascript",
        "c",
        "c++",
        "scheme"
      ],
      jobNum: 2
    }
  ];
  return API[num].name;
}

export async function getUserData(userId) {
  let res = await axios.get(`/api/user/indv?user_id=${userId}`);
  return res.data.basicData[0].username;
}
export async function getQuestions() {
  let res = await axios.get(`/api/questions/interesting`);
  return res.data;
}

export function stringCheck(value, tagNames) {
  let object = stringSimilarity.findBestMatch(value, tagNames);
  object = object.ratings
    .sort((a, b) => {
      return a.rating * 100 - b.rating * 100;
    })
    .reverse()
    .filter(a => a.rating > 0);
  object = object.slice(0, 6);
  return object;
}
export function stringObjectToArray(strObj) {
  if (typeof strObj !== 'string') {
    return false
  }
  let array = strObj.split('{')[1].split('}')[0].split(',')
  return array
}