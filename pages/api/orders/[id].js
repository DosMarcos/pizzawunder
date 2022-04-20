import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const order = await Order.findById(id);
        res.status(200).json(order);
      }
      catch (err) {
        res.status(500).json(err);
      }
      break;

    case 'PUT':
      try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
          new: true
        });
        res.status(200).json(order);        
      }
      catch (err) {
        res.status(500).json(err);
      }
      break;

    case 'DELETE':
      try{}
      catch(err) {
        res.status(500).json(err);
      }
      break;

      default: 
      res.status(400).json({"Error":"No Response"})
  }          
};

export default handler;