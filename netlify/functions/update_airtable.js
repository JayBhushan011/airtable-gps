const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { recordId, lat, lng } = event.queryStringParameters;

    try {
        const response = await fetch(
            `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}/${recordId}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "fields": {
                        "Latitude": parseInt(lat),
                        "Longitude": parseInt(lng)
                    }
                }
            }
        );

        return {
            statusCode: response.status,
            body: await response.text()
        };
    } catch (error) {
        return { statusCode: 500, body: error.message };
    }
};