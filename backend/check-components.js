import mongoose from "mongoose";
import dotenv from "dotenv";
import Component from "./src/models/Component.js";
import User from "./src/models/User.js";

dotenv.config();

const checkComponents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    // Get all components
    const allComponents = await Component.find({}).populate(
      "owner",
      "name email"
    );
    console.log(`📊 Total Components: ${allComponents.length}\n`);

    // Group by user
    const byUser = {};
    allComponents.forEach((comp) => {
      const userName = comp.owner?.name || "Unknown";
      if (!byUser[userName]) byUser[userName] = [];
      byUser[userName].push(comp);
    });

    console.log("👥 Components by User:");
    Object.entries(byUser).forEach(([userName, comps]) => {
      console.log(`\n  ${userName}: ${comps.length} components`);
      comps.forEach((comp) => {
        console.log(
          `    - ${comp.title} | ${comp.category} | isPublic: ${comp.isPublic}`
        );
      });
    });

    // Check for Dhruv's components
    const dhruvUser = await User.findOne({ name: /dhruv/i });
    if (dhruvUser) {
      const dhruvComponents = await Component.find({ owner: dhruvUser._id });
      console.log(`\n🔍 Dhruv's Components (${dhruvComponents.length}):`);
      dhruvComponents.forEach((comp) => {
        console.log(
          `  - ${comp.title} | isPublic: ${comp.isPublic} | category: ${comp.category}`
        );
      });
    }

    await mongoose.connection.close();
    console.log("\n✅ Done!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
  process.exit(0);
};

checkComponents();
