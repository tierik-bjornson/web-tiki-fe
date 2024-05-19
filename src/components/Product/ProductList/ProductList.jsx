import React from "react";
import { useEffect, useState } from "react";
import ProducItem from "../productItem/ProductItem";
import'./ProductList.css'

function ProductList()
{
    const [products, setProducts]=useState([]);

        useEffect(()=>{
            fetch('../../../../data.json')
                .then(Response=>Response.json())
                .then(data=>{
                    const sortedProduct=data.sort((a,b)=>b.rating-a.rating);
                    setProducts(sortedProduct);
                })
        })
    return(
            <ProductList className="ProductList">
                <div className="row">
                    {products.map(product=>(
                        <div className="col-md-4" key={product.id}>
                            <ProducItem
                            image={product.images[0].base_url}
                            name={product.name}
                            rating={product.rating_average}
                            price={product.current_seller.price}
                            discount={product.discount}
                            fastDelivery={product.fastDelivery}
                            sold={product.quantity_sold.text}/>
                        </div>
                    ))}
                </div>
            </ProductList>
    );
}
export default ProductList;