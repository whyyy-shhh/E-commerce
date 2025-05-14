import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product data: ", error);
        });
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="content">
      <div className="main-content">
        <div className="product-image-container">
          <img
            src={product.images[0]}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div className="right-column">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 px-4 py-2 bg-black text-white rounded"
          >
            Back
          </button>
          <div className="product-details">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <div className="flex">
              <p>Price: ${product.price}</p>
              <p className="ml-10">Rating: {product.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;