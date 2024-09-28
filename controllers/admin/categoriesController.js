const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createCategory = async (req, res) => {
  const { title, img } = req.body;

  try {
    const newCategory = await prisma.category.create({
      data: { title, img },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send("Error creating category");
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title, img } = req.body;

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { title, img },
    });
    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send("Error updating category");
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({
      where: { id },
    });
    res.status(204).send({ Message: " Category - Deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send("Error deleting category");
  }
};
