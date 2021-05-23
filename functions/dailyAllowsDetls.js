const formattedReturn = require("./formattedReturn");
const getDailyAllowsDetls = require("./dailyallowancesTable/getDailyAllowsDetls");
const createDailyAllowsDetl = require("./dailyAllowancesTable/createDailyAllowsDetl");
const deleteDailyAllowsDetl = require("./dailyAllowancesTable/deleteDailyAllowsDetl");
const updateDailyAllowsDetl = require("./dailyAllowancesTable/updateDailyAllowsDetl");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getDailyAllowsDetls(event);
  } else if (event.httpMethod === "POST") {
    return await createDailyAllowsDetl(event);
  } else if (event.httpMethod === "PUT") {
    return await updateDailyAllowsDetl(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteDailyAllowsDetl(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
