import { CheckCircle, Package, Calendar, Mail, User } from 'lucide-react';

export default function Receipt({ receipt }) {
  if (!receipt) return null;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600">Thank you for your purchase</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3">
            <Package className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-gray-600">Order ID</p>
              <p className="font-mono font-semibold">{receipt.orderId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-gray-600">Date</p>
              <p className="font-semibold">
                {new Date(receipt.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-gray-600">Customer</p>
              <p className="font-semibold">{receipt.customer.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{receipt.customer.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Order Items</h3>
        <div className="space-y-3">
          {receipt.items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              <span className="font-semibold text-gray-800">
                ${item.subtotal.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t-2 border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">Total Paid</span>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${receipt.total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}