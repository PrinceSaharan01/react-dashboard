import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        getProductDetails();


    }, []);

    const getProductDetails = async () => {
        const data = await fetch(`http://localhost:5500/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        let result = await data.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setBrand(result.brand);


    }

    const update = async () => {
        alert("Product Updated")

        let result = await fetch(`http://localhost:5500/product/${params.id}`,{
            method:'put',
            body:JSON.stringify({name,price,category,brand}),
            headers:{
                'content-type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        let data = await result.json();
        console.log(data);
        navigate('/')



        // console.log(name,price,brand,category)
    }
    return (
        <div>
            <h1>Update Product</h1>
            <input className="inputBox" type={"text"} value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Product Name'></input> <br></br><br></br>
            <input className="inputBox" type={"Number"} value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='Product Price'></input><br></br><br></br>
            <input className="inputBox" type={"text"} value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder='Product Category'></input><br></br><br></br>
            <input className="inputBox" type={"text"} value={brand} onChange={(e) => { setBrand(e.target.value) }} placeholder='Product Brand'></input><br></br><br></br>
            <button className="btn" onClick={update} type="submit">Update</button>
        </div>
    )
}


export default UpdateProduct;