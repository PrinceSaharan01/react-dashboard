import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [err,setErr]=useState(false)
    const authenticate = localStorage.getItem('user')
    let userID = JSON.parse(authenticate)._id;
    const add = async () => {

        if (!name || !price || !category || !brand) {
            setErr(true)
            return false;
        }
        else {

            let result = await fetch('http://localhost:5500/add-product', {
                method: 'post',
                body: JSON.stringify({ name, price, category, userID, brand }),
                headers: {
                    "content-type": "application/json",
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            console.log(result)
            navigate('/')
        }

    }


    return (

        <div>
            <h1>Add Your Product</h1>
            <input className="inputBox" type={"text"} value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Product Name'></input> <br></br>{err && !name &&  <span className="err-msg">Enter Valid Name</span>}<br></br>
            <input className="inputBox" type={"Number"} value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='Product Price'></input><br></br>{err && !price &&  <span className="err-msg">Enter Valid Price</span>}<br></br>
            <input className="inputBox" type={"text"} value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder='Product Category'></input><br></br>{err && !category &&  <span className="err-msg">Enter Valid Category</span>}<br></br>
            <input className="inputBox" type={"text"} value={brand} onChange={(e) => { setBrand(e.target.value) }} placeholder='Product Brand'></input><br></br>{err && !brand &&  <span className="err-msg">Enter Valid Brand</span>}<br></br>
            <button className="btn" onClick={add} type="submit">Add</button>
        </div>
    )
}
export default AddProduct;