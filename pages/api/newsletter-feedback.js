import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { rating, message } = req.body;

    // ================= VALIDATION =================
    if (!rating) {
      return res.status(400).json({
        message: "Rating is required.",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required.",
      });
    }

    if (message.length > 255) {
      return res.status(400).json({
        message: "Message cannot exceed 255 characters.",
      });
    }

    // ================= ENV VALIDATION =================
    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      return res.status(500).json({
        message: "Missing GOOGLE_SHEETS_CLIENT_EMAIL",
      });
    }

    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      return res.status(500).json({
        message: "Missing GOOGLE_SHEETS_PRIVATE_KEY",
      });
    }

    if (!process.env.GOOGLE_SHEET_ID) {
      return res.status(500).json({
        message: "Missing GOOGLE_SHEET_ID",
      });
    }

    // ================= AUTH =================
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    await auth.authorize();

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    // ================= APPEND DATA =================
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "DA-newsletter-feedback!A:C",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            rating,
            message,
            new Date().toISOString(),
          ],
        ],
      },
    });

    return res.status(200).json({
      success: true,
      message: "Feedback stored successfully.",
    });

  } catch (error) {
    console.error("Sheets error:", error.response?.data || error);

    return res.status(500).json({
      message:
        "Server error while saving feedback. Please contact support.",
    });
  }
}