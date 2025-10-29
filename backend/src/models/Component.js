import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Buttons",
        "Cards",
        "Forms",
        "Inputs",
        "Navigation",
        "Modals",
        "Tables",
        "Charts",
        "Layout",
        "Other",
      ],
      default: "Other",
    },
    isPublic: { type: Boolean, default: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: { type: Number, default: 0 },
    copies: { type: Number, default: 0 },
    previewImage: { type: String },
    hasLivePreview: { type: Boolean, default: true },
    tags: [{ type: String }],
    previewSettings: {
      theme: {
        type: String,
        enum: ["dark", "light"],
        default: "dark",
      },
      useNirmaanTheme: {
        type: Boolean,
        default: true,
      },
      previewImage: { type: String }, // optional thumbnail URL
    },
    propsSchema: {
      type: Object,
      default: {},
    }, // for props playground
  },
  { timestamps: true }
);

// Index for faster queries
componentSchema.index({ isPublic: 1, createdAt: -1 });
componentSchema.index({ owner: 1 });
componentSchema.index({ category: 1 });

const Component = mongoose.model("Component", componentSchema);
export default Component;
