const fetch = require('node-fetch');

process.env.AIRTABLE_BASE_ID = 'appJsKmmxuFPkRQD3';
process.env.AIRTABLE_TABLE_NAME = 'tblgSASr9aRL0WGJb';
const recordId = 'receWoHK50M5lhSvh';
process.env.AIRTABLE_API_KEY = 'patsScoQySipTIGUG.4c4679e99390113cea4517b12c68726c4a658278a4aea051b916860b943c7737';


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
                body: JSON.stringify({
                    "fields": {
                        "Latitude": 7,
                        "Longitude": 8
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