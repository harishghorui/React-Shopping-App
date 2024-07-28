import { useEffect, useState } from "react";
import Product from "../components/Product";
import Spinner from "../components/Spinner";

const Home = () => {

  const API_URL = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchProductData = async() => {
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}`);
      const data = await res.json();
      setProducts(data)
    }
    catch(error) {
      console.log(error ,"API Error")
      setProducts([])
    }
    
    setLoading(false)
  }
  
  useEffect(() => {
    fetchProductData()
  }, [])


  return (
    <div>

      {
        loading ? <Spinner/> :

        products.length > 0 ? 
        (<div className="grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">

          {
            products.map((product) => (
              <Product product={product} key={product.id} />
            ))
          }
        </div>) :
        
        <div className="flex justify-center items-center">
          <h1>No Products Found</h1>
        </div>
      }
      
    </div>
  )
};

export default Home;
