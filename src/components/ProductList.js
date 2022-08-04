import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:4000/products',{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:4000/product/${id}`, {
            method: 'Delete',
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if (result) {
            alert('Are you sure, you want to delete this item ?');
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:4000/search/${key}`, {
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
                
            })
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts()
        }

    }

    return (
        <div className="products product-list">
            <h1>Product List</h1>
            <input className="product-search-box" type='text' placeholder="Search Products"
                onChange={searchHandle}
            />

            <ul>
                <li className="li-sno">S. No. </li>
                <li className="listItem">Name</li>
                <li className="listItem_price" > Price</li>
                <li className="listItem" >Category</li>
                <li className="listItem" >Company</li>
                <li className="btn_op" >Operation</li>
            </ul>

            {
                products.length > 0 ? products.map((item, index) =>
                    <ul>
                        <li className="li-sno">{index + 1}</li>
                        <li className="listItem" >{item.name}</li>
                        <li className="listItem_price price_color"><span>&#x20B9;</span> {item.price}</li>
                        <li className="listItem" >{item.category}</li>
                        <li className="listItem" >{item.company}</li>
                        <li className="btn_op" >
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link className="updateLink" to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                )
                    : <h1>No result found</h1>
            }
        </div>
    )
}

export default ProductList;