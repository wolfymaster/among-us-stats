const fetch = require('node-fetch');

const api_key = process.env['airtable_api_key'];

exports.handler = async function(event, context) {
    const data = await fetch('https://api.airtable.com/v0/appizKcsd7v5Fgdau/Table%201?view=Among%20Us%20Stats%20Table', {
        headers: {
            'Authorization': `Bearer ${api_key}`
        }
    });

    const json = await data.json();

    const res = json.records.map(r => {
        return r.fields;
    });

    return {
        status: 200,
        body: JSON.stringify(res),
    }
}