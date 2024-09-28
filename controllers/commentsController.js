const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getCommentsByPostSlug = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: id },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).send("Error fetching comments");
  }
};

exports.createComment = async (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: {
        desc,
        postId: id,
        userId: req.session.user.id,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).send("Error creating comment");
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    if (comment.userId !== req.session.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden - You cannot edit this comment." });
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { desc },
    });

    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating comment");
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    if (comment.userId !== req.session.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden - You cannot delete this comment." });
    }

    await prisma.comment.delete({
      where: { id },
    });

    res.status(204).send({ message: "Comment - Deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting comment");
  }
};
