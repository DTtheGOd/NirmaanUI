import mongoose from "mongoose";import mongoose from "mongoose";



const feedbackSchema = new mongoose.Schema(const feedbackSchema = new mongoose.Schema(

  {  {

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    message: { type: String, required: true },    message: { type: String, required: true },

    rating: { type: Number, min: 1, max: 5 },    rating: { type: Number, min: 1, max: 5 },

  },  },

  { timestamps: true }  { timestamps: true }

););



const Feedback = mongoose.model("Feedback", feedbackSchema);const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;export default Feedback;

