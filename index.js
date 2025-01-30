const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
app.use(express.json());

async function first_calling() {

    const requestBody1 = {
        "otp": "123456",
        "csrConfig": {
            "commonName": "DAKIDEV-17",
            "serialNumber": "1-DAKIDEV|2-V1.0|3-ed22f1d8-e6a2-1118-9b58-d9a8f11e445f",
            "organizationIdentifier": "311111111101113",
            "organizationUnitName": "Riyadh Branch",
            "organizationName": "ABCD Limited",
            "locationAddress": "RRRD2929",
            "functionalityMap": "BOTH",
            "industryBusinessCategory": "Real estate activities",
            "countryName": "SA"
        }
    };
    const response = await axios.post(
        'http://app.apizatca.com/api/dev/onboard',
        requestBody1,
        { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
}
app.post('/1', async (req, res) => {

    const data1 = await first_calling()
    res.send(data1)
});
app.post('/2', async (req, res) => {
    const requestBody2 = req.body
    async function second_calling() {
        const response = await axios.post(
            'http://app.apizatca.com/api/dev/submit',
            requestBody2,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    }
    const data2 = await second_calling()
    res.send(data2)
});
app.get("/3", async (req, res) => {
    async function thrid_calling() {
        try {
            const name = "Nikhil";
            const invoiceNumber = "SME001";
            const issueDateTime = "2024-02-11T22:29:36";
            const vatNumber = "300075588700003";
            const env = "core";

            const response = await axios.get(
                `http://app.apizatca.com/api/downloadPDF?name=${name}&invoiceNumber=${invoiceNumber}&issueDateTime=${issueDateTime}&vatNumber=${vatNumber}&env=${env}`
            );

            return response.data; // Return the response data
        } catch (error) {
            console.error("Error fetching PDF:", error.message);
            return { error: "Failed to fetch PDF" }; // Return an error message
        }
    }

    const data3 = await thrid_calling();
    res.send(data3); // Send the response data
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});












