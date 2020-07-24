import { Request, Response, NextFunction } from 'express';
import { UserModel, UserDocument } from '../models/user.model';
import * as mongoose from 'mongoose';
import { UtillServices } from '../utill.service';
import { OrderDocument, OrderModel } from '../models/order.model';
import { OrderDetailsModel, OrderDetailsDocument } from '../models/order-details.model';


const utillServices: UtillServices = new UtillServices();

export class OrderController {
    constructor() {
        console.log('Order Controller called');
    }

    async getOrderList(req: Request, res: Response, next: NextFunction) {
        const page: Number = Number(req.query.page) ? Number(req.query.page) : 1;
        const limit: Number = Number(30);
        try {
            const orderModel: any = await OrderModel.aggregate([
                {
                    $lookup: {
                        from: "order-details",
                        localField: "OrderID",
                        foreignField: "OrderID",
                        as: "orderDetails"
                    }
                }, {
                    $unwind: "$orderDetails"
                }, {
                    $project: {
                        "_id": 1,
                        "CustomerID": 1,
                        "ShipName": 1,
                        "ShipAddress": 1,
                        "ShipCity": 1,
                        "ShipRegion": 1,
                        "ShipPostalCode": 1,
                        "ShipCountry": 1,
                        "EmployeeID": 1,
                        "OrderID": 1,
                        "ShipVia": 1,
                        "Freight": 1,
                        "OrderDate": 1,
                        "RequiredDate": 1,
                        "ShippedDate": 1,
                        "ProductID": "$orderDetails.ProductID",
                        "UnitPrice": "$orderDetails.UnitPrice",
                        "Quantity": "$orderDetails.Quantity",
                        "Discount": "$orderDetails.Discount"
                    }
                }
            ]).skip(Number(limit) * (Number(page) - 1))
                .limit(Number(limit)).exec();;
            if (orderModel.length > 0) {
                res.status(200).send(orderModel);
            } else {
                res.status(500).send({ message: 'no data found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            let orderModel: any = req.body;
            // console.log('search_term is ', Math.round(Math.random() * 1000000));
            orderModel.OrderID = Math.round(Math.random() * 1000000);
            orderModel = new OrderModel(orderModel);
            // console.log('final orderModel ', orderModel);
            orderModel = await orderModel.save();
            orderModel = req.body;
            orderModel.ProductID = orderModel.ProductID;
            orderModel.UnitPrice = orderModel.UnitPrice;
            orderModel.Quantity = orderModel.Quantity;
            orderModel.Discount = orderModel.Discount;
            let orderDetailModel: OrderDetailsDocument = new OrderDetailsModel(orderModel);
            // console.log('final orderDetailModel ', orderDetailModel);
            await orderDetailModel.save();
            res.status(200).send({});
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async deleteOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId: Number = Number(req.query.orderId);
            await OrderModel.remove(orderId).exec();
            res.status(200).send({ message: 'order is deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async getOrderSearch(req: Request, res: Response, next: NextFunction) {
        const page: Number = Number(req.query.page) ? Number(req.query.page) : 1;
        const limit: Number = Number(30);
        const search_term: String = String(req.query.search_term);
        try {
            let query = {}
            query['$or'] = [{
                "ShipName": {
                    $regex: search_term,
                    $options: 'i'
                }
            }, {
                'ShipPostalCode': {
                    $regex: search_term,
                    $options: 'i'
                }
            }, {
                "OrderID": {
                    $eq: Number(search_term),
                }
            }, {
                "CustomerID": {
                    $regex: search_term,
                    $options: 'i'
                }
            }];
            const orderModel: any = await OrderModel.aggregate([
                { $match: query },
                {
                    $lookup: {
                        from: "order-details",
                        localField: "OrderID",
                        foreignField: "OrderID",
                        as: "orderDetails"
                    }
                }, {
                    $unwind: "$orderDetails"
                }, {
                    $project: {
                        "_id": 1,
                        "CustomerID": 1,
                        "ShipName": 1,
                        "ShipAddress": 1,
                        "ShipCity": 1,
                        "ShipRegion": 1,
                        "ShipPostalCode": 1,
                        "ShipCountry": 1,
                        "EmployeeID": 1,
                        "OrderID": 1,
                        "ShipVia": 1,
                        "Freight": 1,
                        "OrderDate": 1,
                        "RequiredDate": 1,
                        "ShippedDate": 1,
                        "ProductID": "$orderDetails.ProductID",
                        "UnitPrice": "$orderDetails.UnitPrice",
                        "Quantity": "$orderDetails.Quantity",
                        "Discount": "$orderDetails.Discount"
                    }
                }
            ]).skip(Number(limit) * (Number(page) - 1))
                .limit(Number(limit)).exec();;
            if (orderModel.length > 0) {
                res.status(200).send(orderModel);
            } else {
                res.status(500).send({ message: 'no data found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }





}