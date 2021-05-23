const { table } = require("./airtable-dailyallowsdetls");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const dailyallowsdetls = await table.find(id);
    const formattedDailyAllowsdetls = {
      id: dailyallowsdetls.id,
      ...dailyallowsdetls.fields,
    };
    if (dailyallowsdetls.error) {
      return {
        statusCode: 404,
        body: `No Daily Allowances Details with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedDailyAllowsDetls);
  }
  if (fv) {
    const dailyallowsdetls = await table
      .select({ filterByFormula: `empid = '${fv}'` })
      .firstPage();
    const formattedDailyAllowsDetls = dailyallowsdetls.map((dailyallowsdetl) => ({
      id: dailyallowsdetl.id,
      ...dailyallowsdetl.fields,
    }));

    return formattedReturn(200, formattedDailyAllowsDetls);
  }

  try {
    const dailyallowsdetls = await table.select().firstPage();
    const formattedDailyAllowsDetls = dailyallowsdetls.map((dailyallowsdetl) => ({
      id: dailyallowsdetl.id,
      ...dailyallowsdetl.fields,
    }));

    return formattedReturn(200, formattedDailyAllowsDetls);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
