const midtransClient = require('midtrans-client');

class MidtransRequest {
    constructor({ payment_type, order_id, amount, item_details, customer_details }) {
        this.core = new midtransClient.CoreApi({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-ODxJzxNjUPnr6SfhgCA2kn87',
            clientKey: process.env.MIDTRANS_CLIENT_KEY || 'SB-Mid-client-yeCDbvEXnzjylyzD'
        })
        this.payment_type = payment_type
        this.order_id = order_id
        this.amount = amount
        this.item_details = item_details
        this.customer_details = customer_details
    }
}

module.exports = MidtransRequest