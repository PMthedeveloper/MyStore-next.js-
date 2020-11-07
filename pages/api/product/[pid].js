import Product from '../../../models/Product';

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await GetProduct(req, res);
            break;
        case "DELETE":
            await deleteProduct(req, res);
            break;
    }

}

const GetProduct = async (req, res) => {
    const { pid } = req.query;
    const product = await Product.findOne({ _id: pid });
    res.status(200).json(product);
}
const deleteProduct = async (req, res) => {
    const { pid } = req.query;
    await Product.findOneAndDelete({ _id: pid });
    res.status(200).json({});
}