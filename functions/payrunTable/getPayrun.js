const { table } = require("./airtable-payrun");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id } = event.queryStringParameters;

  if (id) {
    const payrun = await table.find(id);
    const formattedPayrun = { id: payitem.id, ...payitem.fields };
    if (payitem.error) {
      return {
        statusCode: 404,
        body: `No Payrun batch with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedPayrun);
  }

  try {
    const payrun = await table.select().firstPage();
    const formattedPayrun = payrun.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedPayrun);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
