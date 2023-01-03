import Express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Category from './../Models/Category.js';



const categoryRoute = Express.Router();

categoryRoute.get("/",asyncHandler(async(req,res)=>{
    const category = await Category.find({})
    res.json(category)
}))

// create category
categoryRoute.post(
    "/",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const { name } = req.body;
      const categoryExist = await Category.findOne({ name });
      if (categoryExist) {
        res.status(400);
        throw new Error("Category name already exist");
      } else {
        const category = new Category({
          name,
          user: req.user._id,
        });
        if (category) {
          const createdcategory = await category.save();
          res.status(201).json(createdcategory);
        } else {
          res.status(400);
          throw new Error("Invalid category data");
        }
      }
    })
  );

  // DELETE categoy
categoryRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      await category.remove();
      res.json({ message: "category deleted" });
    } else {
      res.status(404);
      throw new Error("category not Found");
    }
  })
);



export default categoryRoute