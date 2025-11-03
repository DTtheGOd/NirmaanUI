import app from "./app.js";
import { connectDB } from "./config/db.js";
import { configureCloudinary } from "./config/cloudinary.js";

const PORT = process.env.PORT || 5000;

async function start() {
  console.log("🚀 Starting server...");

  try {
    await connectDB();

    // Configure Cloudinary
    const cloudinary = configureCloudinary();
    if (cloudinary) {
      console.log("☁️  Cloudinary configured successfully");
    } else {
      console.warn("⚠️  Cloudinary not configured - image uploads disabled");
    }

    app.listen(PORT, () => {
      console.log(`✅ API listening on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 Client origin: ${process.env.CLIENT_ORIGIN}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
}

start();
