import React from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();
    const addProduct = async () => {
        // checking invalid input fields
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        console.log(name, price, category, company);
        const userID = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userID)
        let result = await fetch('http://localhost:4000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userID }),
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })

        result = await result.json()
        if (result) {
            alert('Are you sure, you want to add this product?');
        }
        // console.log(result)
        navigate('/');

        // result = await result.json();
        // console.log(result)
    }
    return (
        <div className="addProduct">
            <h1 className="heading">Add product</h1>

            <input type='text' placeholder="Enter product name"
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className="inputValid">*Enter valid name</span>}
            <input type="text" placeholder="Enter Price"
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className="inputValid">*Enter product price</span>}
            <input type="text" placeholder="Enter product category"
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
            {error && !category && <span className="inputValid">*Enter category name</span>}
            <input type="text" placeholder="Enter company name"
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            {error && !company && <span className="inputValid">*Enter company name</span>}
            <button onClick={addProduct} className="btn btn-padding">Add Product</button>
        </div>
    )
}

export default AddProduct;

