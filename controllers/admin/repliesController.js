const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.deleteReply = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.reply.delete({
      where: { id },
    });
    res.status(204).send({ Message: "Reply - Deleted" });
  } catch (error) {
    console.error("Error deleting reply:", error);
    res.status(500).send("Error deleting reply");
  }
};
