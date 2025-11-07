import { Trash2, Package } from 'lucide-react';

export default function CartItem({ item, onRemove }) {
  const subtotal = item.product.price * item.quantity;

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{item.product.name}</h3>
        <p className="text-sm text-gray-600">
          ${item.product.price.toFixed(2)} × {item.quantity}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <span className="font-bold text-lg text-blue-600">
          ${subtotal.toFixed(2)}
        </span>
        <button
          onClick={() => onRemove(item._id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}