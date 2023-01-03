import  Express  from 'express';
import asyncHandler from "express-async-handler"
import User from './Models/UserModel.js';
import users from './data/users.js';

import product from './data/Products.js';
import Product from './Models/ProductModel.js'
import Category from './Models/Category.js';
import category from './data/category.js'
import Logo from './Models/Logo.js';
import logo from './data/logo.js';
import Banner from './Models/Banner.js';
import banner from './data/banner.js';
import News from './Models/News.js';
import news from './data/news.js';

const ImportData = Express.Router()

ImportData.post("/user", asyncHandler(
    async(req,res)=>{
        await User.remove({});
        const importUser = await User.insertMany(users);
        res.send({ importUser });
    }
)
);

ImportData.post("/product", asyncHandler(
    async(req,res)=>{
        await Product.remove({});
        const importProducts = await Product.insertMany(product);
        res.send({ importProducts });
    }
)
);
ImportData.post("/category", asyncHandler(
    async(req,res)=>{
        await Category.remove({});
        const importCategory = await Category.insertMany(category);
        res.send({ importCategory });
    }
)
);
ImportData.post("/logo", asyncHandler(
    async(req,res)=>{
        await Logo.remove({});
        const importLogo = await Logo.insertMany(logo);
        res.send({ importLogo });
    }


)
);
ImportData.post("/banner", asyncHandler(
    async(req,res)=>{
        await Banner.remove({});
        const importBanner = await Banner.insertMany(banner);
        res.send({ importBanner });
    }



)
);

ImportData.post("/news", asyncHandler(
    async(req,res)=>{
        await News.remove({});
        const importNews = await News.insertMany(news);
        res.send({ importNews });
    }



)
);

export default ImportData;