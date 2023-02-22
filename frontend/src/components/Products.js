import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getPrducts();
    }, [])

    const getPrducts = async () => {
        let result = await fetch('http://localhost:5500/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        // console.log(result);
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        console.log(`Deleted ID:---${id} `);
        let result = await fetch(`http://localhost:5500/product/${id}`, {
            method: 'Delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        if (result) {
            alert('Product Deleted');
            getPrducts();
        }


    }
        const searchProduct = async (event) => {

            let key = event.target.value

            if (key){

                
                const result = await fetch(`http://localhost:5500/search/${key}` ,{
                    headers:{
                        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                });
                let data = await result.json();
                
                setProducts(data)
            }else{
                getPrducts();
            }
            // console.log(result);
        }

    return (
        <div className="product-list ">
            <h1>Product Page</h1>
            <input className="search-input" type="text" placeholder="Search" onChange={searchProduct}></input>
            <ul>
                <li>S No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Brand</li>
                <li>Operation...</li>
            </ul>
            {
               products.length>0? products.map((item, k = 0) =>


                    <ul key={k} >
                        <li>{k + 1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.brand}</li>
                        <li><button onClick={() => deleteProduct(item._id)} >Delete</button><Link to={"/update/" + item._id}>Update</Link></li>
                    </ul>

                )
                :<h1>No Result Found...............</h1>
            }
        </div>
    )

}
export default ProductList;