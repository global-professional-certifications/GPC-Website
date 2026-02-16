export default function handler(req, res) {
    const testCountry = req.query.testCountry

    const country = testCountry || req.headers["x-vercel-ip-country"] || req.headers["x-vercel-country"] || "IN";

    res.status(200).json({ country });
}