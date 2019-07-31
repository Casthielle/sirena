import {Router} from 'express';
import {validator, auth} from '../middlewares';
import {Product, SearchOrder, Provider} from '../models';

const router = new Router();

const searchOrderRules = {
  query: ['required'],
  provider: ['required'],
};

router.post('/product/search-order',
    auth,
    validator.check(searchOrderRules),
    async (req, res) => {
      const provider = await Provider.findById(req.body.provider);
      const data = {
        search_data: {...req.body, options: provider.options},
        status: 'reveived',
      };
      const searchOrder = new SearchOrder(data);
      await searchOrder.save();
      res.status(200).json(searchOrder);
    });

router.get('/product/search-order/:order_id', auth, async (req, res) => {
  const order = await SearchOrder.findById(req.params.order_id);
  res.status(200).json(order);
});

router.get('/product/search-order', auth, async (req, res) => {
  const orders = await SearchOrder.find();
  res.status(200).json(orders);
});

router.get('/providers', auth, async (req, res) => {
  const providers = await Provider.find();
  res.status(200).json(providers);
});

router.get('/product/category/:category_id', auth, async (req, res) => {
  const products = await Product.find({
    product_category_id: req.params.category_id,
  });
  res.status(200).json(products);
});

export default router;
