export default function ReceiptModal({ receipt, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">✅</div>
          <h2 className="text-2xl font-bold text-green-600">Order Successful!</h2>
        </div>
        
        <div className="border-t border-b py-4 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-mono">{receipt.orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Customer:</span>
            <span>{receipt.customer.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Email:</span>
            <span>{receipt.customer.email}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Date:</span>
            <span>{new Date(receipt.timestamp).toLocaleString()}</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Items:</h3>
          {receipt.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm mb-1">
              <span>{item.name} x{item.quantity}</span>
              <span>${item.subtotal.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between text-xl font-bold">
            <span>Total Paid:</span>
            <span className="text-green-600">${receipt.total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}