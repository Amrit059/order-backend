import * as express from 'express';
import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

const newOrderController = new OrderController();

const router: Router = express.Router();

/* order Api start from here */

/**
 * /fetch/order/list
 * @author Amritpal Singh
 * @FinalUrlExample /rest/api/fetch/order/list
 * @description this route used for fetching order list
 */
router.get(
    '/rest/api/fetch/order/list',
    newOrderController.getOrderList);

/**
* /create/order
* @author Amritpal Singh
* @FinalUrlExample /rest/api/create/order
* @description this route used for create order
*/
router.post(
    '/rest/api/create/order',
    newOrderController.createOrder);

/**
* /delete/order
* @author Amritpal Singh
* @FinalUrlExample /rest/api/delete/order
* @description this route used for delete order
*/
router.post(
    '/rest/api/delete/order',
    newOrderController.deleteOrder);

/* order Api end here */

export default router;
