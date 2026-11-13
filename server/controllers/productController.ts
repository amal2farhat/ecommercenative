import { Request,Response } from "express";
import Product from "../models/Products.js";
import { v2 as cloudinary } from 'cloudinary';

import multer from 'multer';

//get all products
//get /api/products
export const getProducts=async (req:Request, res:Response)=>{
    try {
        const {page=1,limit=10}=req.query;
        const query:any={isActive:true}

        const total=await Product.countDocuments(query)
        const products=await Product.find(query).skip((Number(page) -1) * Number(limit)).limit(
            Number(limit))
        res.json({
            success:true,data:products,pagination:{total,page:Number(page),pages:Math.ceil(
                total/Number(limit)
            )}
        })
    } catch (error:any) {
        res.status(500).json({success:false, message:error.message})
    }
}
 
// get single product
// GET /api/products/:id
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await Product.findOne({
            _id: id,
            isActive: true
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getProduct = async (req: Request, res: Response) =>{
    try {
        const product =await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error:any) {
         res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
// export const createProduct = async (req: Request, res: Response) => {
//     try {
//         let images: string[] = [];

//         if (req.files && (req.files as Express.Multer.File[]).length > 0) {

//             const uploadPromises = (req.files as Express.Multer.File[]).map((file) => {

//                 return new Promise<string>((resolve, reject) => {

//                     const uploadStream = cloudinary.uploader.upload_stream(
//                         {
//                             folder: 'ecom-app/products'
//                         },(error, result) => {
//                             if (error) {
//                                 return reject(error);
//                             }

//                             resolve(result!.secure_url);
//                         }
//                     );

//                     uploadStream.end(file.buffer);
//                 });
//             });

//             images = await Promise.all(uploadPromises);
//         }

//         res.status(201).json({
//             success: true,
//             images
//         });

//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

export const createProduct = async (req: Request, res: Response) =>{
    try {
        let images: string[] = [];
        // let images=[];
        if(req.files && (req.files as any).length >0){
            const uploadPromises=(req.files as any).map((file:any)=>{
                return new Promise((resolve,reject)=>{
                    const uploadStream=cloudinary.uploader.upload_stream({
                        folder:'ecom-app/products'},(error,result)=>{
                            if (error)  reject(error);
                            else    resolve(result!.secure_url);
                        })
                        uploadStream.end(file.buffer);
                        


                })
            })
            images=await Promise.all(uploadPromises)
        }
        let sizes=req.body.sizes || [];
        if(typeof sizes ==="string"){
            try {
                sizes=JSON.parse(sizes)
            } catch (e) {
                sizes=sizes.split(",").map((s:string)=>s.trim()).filter(
                    (s:string)=>s !== "" );
            }
        }
if(!Array.isArray(sizes)) sizes=[sizes]

const productData={
    ...req.body,
    images:images,
    sizes
}
if(images.length ===0){
    return res.status(400).json({
        success: false,
            message: "Please upload at  least one image"
    })
}
const product =await Product.create(productData)
res.status(201).json({   success: false,data:product})

    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//update
export const updateProduct = async (req: Request, res: Response) =>{
    try {
        let images: string[] = [];
        if(req.body.existingImages){
            if(Array.isArray(req.body.existingImages)){
                images=[...req.body.existingImages]
            }else{
                images=[req.body.existingImages]
            }
        }
        // let images=[];
        if(req.files && (req.files as any).length >0){
            const uploadPromises=(req.files as any).map((file:any)=>{
                return new Promise((resolve,reject)=>{
                    const uploadStream=cloudinary.uploader.upload_stream({
                        folder:'ecom-app/products'},(error,result)=>{
                            if (error)  reject(error);
                            else    resolve(result!.secure_url);
                        })
                        uploadStream.end(file.buffer);
                        


                })
            })
           const newImages=await Promise.all(uploadPromises)
           images=[...images,...newImages];
        }
        const updates={...req.body}
        if(req.body.size){
            let sizes=req.body.sizes;
            if(typeof sizes ==="string"){
            try {
                sizes=JSON.parse(sizes)
            } catch (e) {
                sizes=sizes.split(",").map((s:string)=>s.trim()).filter(
                    (s:string)=>s !== "" );
            }
        }if(!Array.isArray(sizes)) sizes=[sizes]
        updates.sizes=sizes
        }
        // let sizes=req.body.sizes || [];
        
// if(!Array.isArray(sizes)) sizes=[sizes]

// const productData={
//     ...req.body,
//     images:images,
//     sizes
// }
// if(images.length ===0){
//     return res.status(400).json({
//         success: false,
//             message: "Please upload at  least one image"
//     })
// }
// const product =await Product.create(productData)
// res.status(201).json({   success: false,data:product})
if(req.body.existingImages || (req.files && (req.files as any).length >0)){
    updates.images=images;
}
delete updates.existingImages
const product =await Product.findByIdAndUpdate(req.params.id,updates,{
    new:true,
    runValidators:true
})
if(!product){
     return res.status(400).json({
        success: false,
            message: "Product not found"
    });
}
  res.json({
        success: true,
            data: product
    })

    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// export const updateProduct = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;

//         const existingProduct = await Product.findById(id);

//         if (!existingProduct) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }

//         let images: string[] = existingProduct.images || [];

//         if (req.files && (req.files as any).length > 0) {

//             const uploadPromises = (req.files as any).map((file: any) => {

//                 return new Promise<string>((resolve, reject) => {

//                     const uploadStream = cloudinary.uploader.upload_stream(
//                         {
//                             folder: 'ecom-app/products'
//                         },
//                         (error, result) => {
//                             if (error) reject(error);
//                             else resolve(result!.secure_url);
//                         }
//                     );

//                     uploadStream.end(file.buffer);
//                 });
//             });

//             const newImages = await Promise.all(uploadPromises);

//             images = [...images, ...newImages];
//         }

//         let sizes = req.body.sizes ?? existingProduct.sizes;

//         if (typeof sizes === "string") {
//             try {
//                 sizes = JSON.parse(sizes);
//             } catch (e) {
//                 sizes = sizes.split(",")
//                     .map((s: string) => s.trim())
//                     .filter((s: string) => s !== "");
//             }
//         }

//         if (!Array.isArray(sizes)) {
//             sizes = [sizes];
//         }

//         const productData = {
//             ...req.body,
//             images,
//             sizes
//         };

//         const product = await Product.findByIdAndUpdate(
//             id,
//             productData,
//             { new: true, runValidators: true }
//         );

//         res.status(200).json({
//             success: true,
//             data: product
//         });

//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


//delet

export const deleteProduct = async (req: Request, res: Response) =>{
    try {
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({success:false,message:"product not found"});
        }
        if(product.images  && product.images.length >0){
            const deletePromises=product.images.map((imageurl)=>{
                const publicIdMatch=imageurl.match(/\/v\d+\/(.+)\.[a-z]+$/);
                const publicId=publicIdMatch ? publicIdMatch[1] : null;
            if(publicId){
                return cloudinary.uploader.destroy(publicId)
            }
            return Promise.resolve();
            })
            await Promise.all(deletePromises);
        }
        await Product.findByIdAndDelete(req.params.id)
        res.json({success:true,message:"Product deleted"})
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}