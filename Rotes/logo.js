import Express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Logo from "../Models/Logo.js";


const logoRoute = Express.Router();

logoRoute.get("/",asyncHandler(async(req,res)=>{
    const logo = await Logo.find({})
    res.json(logo)
}))


// GET SINGLE logo
logoRoute.get(
    "/:id",
    asyncHandler(async (req, res) => {
      const logo = await Logo.findById(req.params.id);
      if (logo) {
        res.json(logo);
      } else {
        res.status(404);
        throw new Error("Logo not Found");
      }
    })
  );


// UPDATE logo 
logoRoute.put(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const { image} = req.body;
      const logo = await Logo.findById(req.params.id);
      if (logo) {

        logo.image = image || logo.image;
  
        const updatedLogo = await logo.save();
        res.json(updatedLogo);
      } else {
        res.status(404);
        throw new Error("Logo not found");
      }
    })
  );

export default logoRoute