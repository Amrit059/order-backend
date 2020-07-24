//Define our about us schema
import * as mongoose from 'mongoose'

export interface OrderDetailsDocument extends mongoose.Document {
    _id: string;
    OrderID?: Number;
    ProductID?: Number;
    UnitPrice?: Number;
    Quantity?: Number;
    Discount?: Number;
}

const OrderDetailsSchema = new mongoose.Schema({
    OrderID: { type: Number },
    ProductID: { type: Number },
    UnitPrice: { type: Number },
    Quantity: { type: Number },
    Discount: { type: Number },
});

export const OrderDetailsModel: mongoose.Model<OrderDetailsDocument> =
    mongoose.model<OrderDetailsDocument>('order-details', OrderDetailsSchema, 'order-details');
