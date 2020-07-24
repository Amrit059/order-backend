//Define our about us schema
import * as mongoose from 'mongoose'

export interface OrderDocument extends mongoose.Document {
    _id: string;
    CustomerID?: string;
    ShipName?: string;
    ShipAddress?: string;
    ShipCity?: string;
    ShipRegion?: string;
    ShipPostalCode?: string;
    ShipCountry?: string;
    EmployeeID?: Number;
    OrderID?: Number;
    ShipVia?: Number;
    Freight?: Number;
    OrderDate?: Date;
    RequiredDate?: Date;
    ShippedDate?: Date;
}

const OrdersSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    CustomerID: { type: String },
    ShipName: { type: String },
    ShipAddress: { type: String },
    ShipCity: { type: String },
    ShipRegion: { type: String },
    ShipPostalCode: { type: String },
    ShipCountry: { type: String },
    EmployeeID: { type: Number },
    OrderID: { type: Number },
    ShipVia: { type: Number },
    Freight: { type: Number },
    OrderDate: { type: Date, default: new Date() },
    RequiredDate: { type: Date },
    ShippedDate: { type: Date },
});

export const OrderModel: mongoose.Model<OrderDocument> =
    mongoose.model<OrderDocument>('orders', OrdersSchema, 'orders');

// export async function userDetails(id: string, projection: Object): Promise<OrderDocument> {
//     return await OrderModel.findById({ _id: mongoose.Types.ObjectId(id) }, projection)
// }
