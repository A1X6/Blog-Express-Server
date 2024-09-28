const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  const { title, desc, img, categoryId } = req.body;
  const userId = req.session.user.id;

  if (!title || !desc || !categoryId) {
    return res
      .status(400)
      .json({ message: "Title, description, and category ID are required." });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        desc,
        img,
        categoryId,
        userId,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating post");
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, desc, img, categoryId } = req.body;
  const userId = req.session.user.id;

  if (!title && !desc && !categoryId && !img) {
    return res
      .status(400)
      .json({ message: "At least one field is required to update." });
  }

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (existingPost.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden - You cannot update this post." });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: title || existingPost.title,
        desc: desc || existingPost.desc,
        img: img || existingPost.img,
        categoryId: categoryId || existingPost.categoryId,
        updatedAt: new Date(),
      },
    });

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating post");
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params; 
  const userId = req.session.user.id; 

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (existingPost.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden - You cannot delete this post." });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(204).send({ message: "Post deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting post");
  }
};
