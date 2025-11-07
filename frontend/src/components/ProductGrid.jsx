export default function ProductGrid({ products, onAddToCart }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow p-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
              <button
                onClick={() => onAddToCart(product._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}