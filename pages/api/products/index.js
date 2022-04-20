import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method, cookies } = req;
  
  const token = cookies.token

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find();
        res.status(200).json(products);
      }
      catch (err) {
        res.status(500).json(err);
      }
      break;

    case 'POST':
      try {
        const product = await Product.create(req.body);
        res.status(201).json(product);        
      }
      catch (err) {
        res.status(500).json(err);
      }
      break;

      default: 
      res.status(400).json({"Error":"No Response"})
  }
}