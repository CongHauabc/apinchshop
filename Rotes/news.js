import Express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import News from './../Models/News.js';

const newsRoute = Express.Router();

newsRoute.get("/",asyncHandler(async(req,res)=>{
    const news = await News.find({})
    res.json(news)
}))


// GET SINGLE new
newsRoute.get(
    "/:id",
    asyncHandler(async (req, res) => {
      const news = await News.findById(req.params.id);
      if (news) {
        res.json(news);
      } else {
        res.status(404);
        throw new Error("News not Found");
      }
    })
  );


  // UPDATE news 
newsRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name,  description, image} = req.body;
    const news = await News.findById(req.params.id);
    if (news) {
      news.name = name || news.name;
      news.description = description || news.description;
      news.image = image || news.image;
      const updatedNews = await news.save();
      res.json(updatedNews);
    } else {
      res.status(404);
      throw new Error("News not found");
    }
  })
);

  // DELETE banner
  newsRoute.delete(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const news = await News.findById(req.params.id);
      if (news) {
        await news.remove();
        res.json({ message: "News deleted" });
      } else {
        res.status(404);
        throw new Error("News not Found");
      }
    })
  );

// CREATE bannerrr
newsRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name,image,description} = req.body;
    const newsExist = await News.findOne({ name });
    if (newsExist) {
      res.status(400);
      throw new Error("News already exist");
    } else {
      const news = new News({
        name,
        image,
        description
        
      });
      if (news) {
        const createdNews = await news.save();
        res.status(201).json(createdNews);
      } else {
        res.status(400);
        throw new Error("Invalid news data");
      }
    }
  })
);


export default newsRoute