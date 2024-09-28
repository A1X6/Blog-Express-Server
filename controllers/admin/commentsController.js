const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.comment.delete({
      where: { id },
    });
    res.status(204).send({ Message: "Comment - Deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).send("Error deleting comment");
  }
};
