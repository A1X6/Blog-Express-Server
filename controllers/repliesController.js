const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getRepliesByCommentId = async (req, res) => {
  const { id: commentId } = req.params;

  try {
    const replies = await prisma.reply.findMany({
      where: { commentId },
    });

    if (!replies) {
      return res
        .status(404)
        .json({ error: "No replies found for this comment" });
    }

    res.json(replies);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching replies", details: error.message });
  }
};

exports.createReply = async (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;

  try {
    const newReply = await prisma.reply.create({
      data: {
        desc,
        commentId: id,
        userId: req.session.user.id,
      },
    });
    res.status(201).json(newReply);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating reply");
  }
};

exports.updateReply = async (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;

  try {
    const reply = await prisma.reply.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!reply) {
      return res.status(404).json({ message: "Reply not found." });
    }

    if (reply.userId !== req.session.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden - You cannot edit this reply." });
    }

    const updatedReply = await prisma.reply.update({
      where: { id },
      data: { desc },
    });

    res.json(updatedReply);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating reply");
  }
};

exports.deleteReply = async (req, res) => {
  const { id } = req.params;

  try {
    const reply = await prisma.reply.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!reply) {
      return res.status(404).json({ message: "Reply not found." });
    }

    if (reply.userId !== req.session.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden - You cannot delete this reply." });
    }

    await prisma.reply.delete({
      where: { id },
    });

    res.status(204).send({ message: "Reply - Deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting reply");
  }
};
