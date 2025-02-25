const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { recordId, lat, lng } = event.queryStringParameters;
    if (!recordId || !lat || !lng) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Missing parameters" }),
        };
    }

    //get google maps details
    

    // async function getAddress(lat, lng) {
    //     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GoogleMaps_API_KEY}`;
    //     try {
    //             const response = await fetch(url);
    //             const data = await response.json();
    //             if (data.status === "OK") {
    //             return data.results[0].formatted_address;
    //             }
    //             return "Address not found";
    //         } catch (error) {
    //             console.error("Error:", error);
    //             return "Error";
    //         }
    // }
    // try {
    //     const address = await getAddress(lat, lng);
    //     const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

        

    //     console.log("✅ Address generated!");
    //     } catch (error) {
    //         console.log(`❌ Error: ${error.message}`);
    // }



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
                        "Latitude": parseFloat(lat),
                        "Longitude": parseFloat(lng),
                        "Lat-Long":`${parseFloat(lat)},${parseFloat(lng)}`,
                        "Google Maps Link":"googleMapsLink",
                        "Address":"address",
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