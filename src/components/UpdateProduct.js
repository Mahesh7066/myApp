import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    }, [])

    const getProductDetails = async ()=>{
        console.log(params)
        let result = await fetch(`http://localhost:4000/product/${params.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    const updateProduct = async () => {
        console.log(name, price, category, company)
        let result = await fetch(`http://localhost:4000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({name, price, category, company}),
            headers: {
                'content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        if (result) {
            alert('Are you sure, you want to update this product?');
        }
        // console.log(result)
        navigate('/');
    }
    return (
        <div className="addProduct">
            <h1 className="heading">Update product</h1>

            <input type='text' placeholder="Enter product name"
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            <input type="text" placeholder="Enter Price"
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            <input type="text" placeholder="Enter product category"
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
            <input type="text" placeholder="Enter company name"
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            <button onClick={updateProduct} className="btn btn-padding">Update</button>
        </div>
    )
}

export default UpdateProduct;

