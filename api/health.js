// Basic Vercel serverless function to verify the API route is deployed.
// This endpoint intentionally exposes no secrets or personal data.
export default function handler(req, res) {
  res.status(200).json({
    app: "Auction Time",
    status: "starter-demo",
    message: "API route is running. Authentication, database, bidding and payment are not configured yet."
  });
}
