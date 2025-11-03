import Component from "../models/Component.js";
import User from "../models/User.js";

// Helper function to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

// @desc    Get all public components
// @route   GET /api/components
// @access  Public
export async function getPublicComponents(req, res) {
  try {
    const { category, search, sort = "recent" } = req.query;

    let query = { isPublic: true };

    // DEBUG: Check total components in DB
    const totalComponents = await Component.countDocuments({});
    const publicComponents = await Component.countDocuments({ isPublic: true });
    const privateComponents = await Component.countDocuments({
      isPublic: false,
    });
    console.log(
      `[DB Stats] Total: ${totalComponents}, Public: ${publicComponents}, Private: ${privateComponents}`
    );

    // Filter by category
    if (category && category !== "all" && category !== "All") {
      query.category = category;
    }

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case "recent":
        sortOption = { createdAt: -1 };
        break;
      case "popular":
        sortOption = { views: -1 };
        break;
      case "liked":
        sortOption = { likes: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const components = await Component.find(query)
      .populate("owner", "name")
      .sort(sortOption)
      .lean();

    console.log(
      `[getPublicComponents] Found ${components.length} components with query:`,
      query
    );
    console.log(
      `[getPublicComponents] Sample components:`,
      components.slice(0, 2).map((c) => ({
        title: c.title,
        owner: c.owner?.name,
        isPublic: c.isPublic,
        category: c.category,
      }))
    );

    // Add like and save counts
    const enrichedComponents = components.map((comp) => ({
      ...comp,
      likeCount: comp.likes?.length || 0,
      saveCount: comp.saves?.length || 0,
    }));

    res.json(enrichedComponents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Get single component by ID
// @route   GET /api/components/:id
// @access  Public (if public) / Private (if private, owner only)
export async function getComponentById(req, res) {
  try {
    const component = await Component.findById(req.params.id).populate(
      "owner",
      "name _id"
    );

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    // Check if component is private and user is not the owner
    if (
      !component.isPublic &&
      (!req.user || component.owner._id.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({ message: "This component is private" });
    }

    // Increment view count
    component.views += 1;
    await component.save();

    // Check if user has liked/saved this component
    let isLiked = false;
    let isSaved = false;
    if (req.user) {
      isLiked = component.likes.some(
        (id) => id.toString() === req.user._id.toString()
      );
      isSaved = component.saves.some(
        (id) => id.toString() === req.user._id.toString()
      );
    }

    const componentData = component.toObject();
    res.json({
      ...componentData,
      likeCount: component.likes.length,
      saveCount: component.saves.length,
      isLiked,
      isSaved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Create new component
// @route   POST /api/components
// @access  Private
export async function createComponent(req, res) {
  try {
    const {
      title,
      description,
      code,
      category,
      isPublic,
      tags,
      previewImage,
      previewSettings,
      propsSchema,
    } = req.body;

    console.log("📝 Creating component with previewImage:", previewImage);

    if (!title || !description || !code) {
      return res
        .status(400)
        .json({ message: "Title, description, and code are required" });
    }

    // Validate previewSettings if provided
    if (previewSettings) {
      if (
        previewSettings.theme &&
        !["dark", "light"].includes(previewSettings.theme)
      ) {
        return res
          .status(400)
          .json({ message: "Invalid theme value. Must be 'dark' or 'light'" });
      }
      if (
        previewSettings.useNirmaanTheme !== undefined &&
        typeof previewSettings.useNirmaanTheme !== "boolean"
      ) {
        return res
          .status(400)
          .json({ message: "useNirmaanTheme must be a boolean" });
      }
    }

    // Generate unique slug
    let slug = generateSlug(title);
    let existingComponent = await Component.findOne({ slug });
    let counter = 1;
    while (existingComponent) {
      slug = `${generateSlug(title)}-${counter}`;
      existingComponent = await Component.findOne({ slug });
      counter++;
    }

    const component = await Component.create({
      title,
      slug,
      description,
      code,
      category: category || "Other",
      isPublic: isPublic !== undefined ? isPublic : true,
      owner: req.user._id,
      tags: tags || [],
      previewImage: previewImage || null,
      previewSettings: previewSettings || {
        theme: "dark",
        useNirmaanTheme: true,
      },
      propsSchema: propsSchema || {},
    });

    const populatedComponent = await Component.findById(component._id).populate(
      "owner",
      "name"
    );

    res.status(201).json(populatedComponent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Update component
// @route   PUT /api/components/:id
// @access  Private (owner only)
export async function updateComponent(req, res) {
  try {
    const component = await Component.findById(req.params.id);

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    // Check if user is the owner
    if (component.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this component" });
    }

    const {
      title,
      description,
      code,
      category,
      isPublic,
      tags,
      previewSettings,
      propsSchema,
    } = req.body;

    if (title) component.title = title;
    if (description) component.description = description;
    if (code) component.code = code;
    if (category) component.category = category;
    if (isPublic !== undefined) component.isPublic = isPublic;
    if (tags) component.tags = tags;

    // Update previewSettings if provided
    if (previewSettings) {
      if (
        previewSettings.theme &&
        !["dark", "light"].includes(previewSettings.theme)
      ) {
        return res
          .status(400)
          .json({ message: "Invalid theme value. Must be 'dark' or 'light'" });
      }
      component.previewSettings = {
        ...component.previewSettings,
        ...previewSettings,
      };
    }

    // Update propsSchema if provided
    if (propsSchema !== undefined) {
      component.propsSchema = propsSchema;
    }

    // Update slug if title changed
    if (title && title !== component.title) {
      component.slug = generateSlug(title);
    }

    await component.save();

    const updatedComponent = await Component.findById(component._id).populate(
      "owner",
      "name"
    );

    res.json(updatedComponent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Delete component
// @route   DELETE /api/components/:id
// @access  Private (owner only)
export async function deleteComponent(req, res) {
  try {
    const component = await Component.findById(req.params.id);

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    // Check if user is the owner
    if (component.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this component" });
    }

    await component.deleteOne();

    res.json({ message: "Component deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Like/Unlike a component
// @route   POST /api/components/:id/like
// @access  Private
export async function toggleLikeComponent(req, res) {
  try {
    const component = await Component.findById(req.params.id);

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    const userId = req.user._id;
    const isLiked = component.likes.some(
      (id) => id.toString() === userId.toString()
    );

    if (isLiked) {
      // Unlike
      component.likes = component.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      await User.findByIdAndUpdate(userId, {
        $pull: { likedComponents: component._id },
      });
    } else {
      // Like
      component.likes.push(userId);
      await User.findByIdAndUpdate(userId, {
        $addToSet: { likedComponents: component._id },
      });
    }

    await component.save();

    res.json({
      message: isLiked ? "Component unliked" : "Component liked",
      likeCount: component.likes.length,
      isLiked: !isLiked,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Save/Unsave a component
// @route   POST /api/components/:id/save
// @access  Private
export async function toggleSaveComponent(req, res) {
  try {
    const component = await Component.findById(req.params.id);

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    const userId = req.user._id;
    const isSaved = component.saves.some(
      (id) => id.toString() === userId.toString()
    );

    if (isSaved) {
      // Unsave
      component.saves = component.saves.filter(
        (id) => id.toString() !== userId.toString()
      );
      await User.findByIdAndUpdate(userId, {
        $pull: { savedComponents: component._id },
      });
    } else {
      // Save
      component.saves.push(userId);
      await User.findByIdAndUpdate(userId, {
        $addToSet: { savedComponents: component._id },
      });
    }

    await component.save();

    res.json({
      message: isSaved ? "Component unsaved" : "Component saved",
      saveCount: component.saves.length,
      isSaved: !isSaved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Increment copy count
// @route   POST /api/components/:id/copy
// @access  Private
export async function incrementCopyCount(req, res) {
  try {
    const component = await Component.findById(req.params.id);

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    component.copies += 1;
    await component.save();

    res.json({ message: "Copy count incremented", copies: component.copies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Get user's own components
// @route   GET /api/user/components
// @access  Private
export async function getUserComponents(req, res) {
  try {
    const components = await Component.find({ owner: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    const enrichedComponents = components.map((comp) => ({
      ...comp,
      likeCount: comp.likes?.length || 0,
      saveCount: comp.saves?.length || 0,
    }));

    res.json(enrichedComponents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Get user's liked components
// @route   GET /api/user/likes
// @access  Private
export async function getUserLikedComponents(req, res) {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "likedComponents",
      populate: { path: "owner", select: "name" },
    });

    const components = user.likedComponents.map((comp) => ({
      ...comp.toObject(),
      likeCount: comp.likes?.length || 0,
      saveCount: comp.saves?.length || 0,
    }));

    res.json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Get user's saved components
// @route   GET /api/user/saves
// @access  Private
export async function getUserSavedComponents(req, res) {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "savedComponents",
      populate: { path: "owner", select: "name" },
    });

    const components = user.savedComponents.map((comp) => ({
      ...comp.toObject(),
      likeCount: comp.likes?.length || 0,
      saveCount: comp.saves?.length || 0,
    }));

    res.json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
