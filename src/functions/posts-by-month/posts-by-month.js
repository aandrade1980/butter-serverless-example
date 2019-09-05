const Butter = require("buttercms");
const API_KEY = process.env.BUTTER_API_KEY;
const butter = Butter(API_KEY);

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const limit = event.queryStringParameters.limit || 10;
    console.log("LIMIT => ", limit);
    const response = await butter.post.list({ page: 1, page_size: limit });
    const postsByMonth = {};
    response.data.data
      .map(post => new Date(post.published).getMonth())
      .forEach(monthIndex => {
        if (postsByMonth[monthIndex]) {
          postsByMonth[monthIndex]++;
        } else {
          postsByMonth[monthIndex] = 1;
        }
      });
    return {
      statusCode: 200,
      body: JSON.stringify(postsByMonth)
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
