const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { recordId, lat, lng } = event.queryStringParameters;

    if (!recordId || !lat || !lng) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Missing parameters" }),
        };
      }

    try {
        const response = await fetch(
            `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}/${recordId}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "fields": {
                        "Latitude": lat,
                        "Longitude": lng
                    }
                })
            }
        );

        const responseBody = await response.text();
        return {
            statusCode: response.status,
            body: responseBody
        };
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: error.message };
    }
};