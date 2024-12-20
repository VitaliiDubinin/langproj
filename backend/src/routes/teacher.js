const multer = require("multer");
const express = require("express");
const fetch = require("node-fetch");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Configure file upload
const upload = multer({ 
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, 
 });

let processedText = ""; // Temporary storage for extracted text (use DB for production)


// Helper function: Extract text from PDF
async function extractTextFromPDF(filePath) {
  const pdf = require("pdf-parse");
  const fs = require("fs");
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  const text = data.text
  console.log("Extracted Text:", text);
  return data.text;
}

// Existing endpoint: Assign Task
router.post("/assign-task", authMiddleware, async (req, res) => {
  const { studentId, taskDetails } = req.body;
  try {
    // Logic to save task to the database for the student
    res.status(200).json({ success: true, message: "Task assigned successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// New endpoint: Upload and process PDF
router.post("/upload-pdf", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const filePath = req.file.path;
    console.log("Uploaded file path:", filePath);
    // Extract text from PDF
    processedText = await extractTextFromPDF(filePath);

    res.status(200).json({ success: true, message: "PDF processed successfully." });
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});






router.post("/generate-questions", async (req, res) => {
  console.log("OPENAI_API_KEY:",process.env.OPENAI_API_KEY)
  const { mode, options } = req.body;

  try {
    // Define the base prompt
    const basePrompt =
      mode === "default"
        ? `Write 10 questions based on the following text:\n\n${processedText}`
        : `Write 10 questions based on the following text and consider these options:\n\n${processedText}\n\nOptions:\n${options}`;

    //Call ChatGPT API
    // const response =  "response from AI"
    // console.log(response)
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that generates questions based on text.",
      },
      {
        role: "user",
        content: mode === "default"
          ? `Write 10 questions based on the following text:\n\n${processedText}`
          : `Write 10 questions based on the following text and consider these options:\n\n${processedText}\n\nOptions:\n${options}`,
      },
    ],
    max_tokens: 300,
  }),
});

    const data = await response.json();
    // console.log("OpenAI API response:", data);
    console.log("Full OpenAI API Response:", JSON.stringify(data, null, 2));

  //   if (response.ok) {
  //     const questions = data.choices[0].text.trim().split("\n");
  //     res.status(200).json({ success: true, questions });
  //   } else {
  //     res.status(500).json({ success: false, message: data.error.message });
  //   }
  // } catch (error) {
  //   console.error("Error generating questions:", error);
  //   res.status(500).json({ success: false, message: error.message });
  // }
  if (
    response.ok &&
    data.choices &&
    data.choices[0] &&
    data.choices[0].message &&
    data.choices[0].message.content
  ) {
    const content = data.choices[0].message.content; // Safely access content
    const questions = content.trim().split("\n");
    res.status(200).json({ success: true, questions });
  } else {
    const errorMessage = data.error?.message || "Unexpected response from OpenAI API";
    console.error("OpenAI API error:", errorMessage);
    res.status(500).json({ success: false, message: errorMessage });
  }
    } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({ success: false, message: error.message });
  }

});


router.get("/students", authMiddleware, async (req, res) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }

  try {
    const students = await User.findAll({
      where: { role: "student" },
      attributes: ["id", "name", "email"],
    });
    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
});


module.exports = router;





