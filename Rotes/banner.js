import Express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Banner from './../Models/Banner.js';


const bannerRoute = Express.Router();

bannerRoute.get("/",asyncHandler(async(req,res)=>{
    const banner = await Banner.find({})
    res.json(banner)
}))

// update banner
bannerRoute.put(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const { image} = req.body;
      const banner = await Banner.findById(req.params.id);
      if (banner) {

        banner.image = image || banner.image;
  
        const updatedBanner = await banner.save();
        res.json(updatedBanner);
      } else {
        res.status(404);
        throw new Error("Banner not found");
      }
    })
  );


  // GET SINGLE banner
bannerRoute.get(
    "/:id",
    asyncHandler(async (req, res) => {
      const banner = await Banner.findById(req.params.id);
      if (banner) {
        res.json(banner);
      } else {
        res.status(404);
        throw new Error("Banner not Found");
      }
    })
  );


  // DELETE banner
bannerRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const banner = await Banner.findById(req.params.id);
    if (banner) {
      await banner.remove();
      res.json({ message: "Banner deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// CREATE bannerrr
bannerRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { image} = req.body;
    const bannerExist = await Banner.findOne({ image });
    if (bannerExist) {
      res.status(400);
      throw new Error("Banner already exist");
    } else {
      const banner = new Banner({
        
        image,
        
      });
      if (banner) {
        const createdBanner = await banner.save();
        res.status(201).json(createdBanner);
      } else {
        res.status(400);
        throw new Error("Invalid baner data");
      }
    }
  })
);


export default bannerRoute