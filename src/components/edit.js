import { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

import axios from 'axios';

export const EditComponent = ({props}) => {
    const [loading, setLoading] = useState(false);
    const [dataToPass, setDataToPass] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3010/read/${props.id}`)
        .then(response => response.json())
        .then(data => {
            setDataToPass(data);
            setLoading(false);
        })
    },[]);

    const changeHandler = (event) => { setDataToPass(prevState => ({...prevState, [event.target.name]: event.target.value})) };

    const saveData = (event) => {
        event.preventDefault();

        setLoading(true);
        axios.post(`http://localhost:3010/update/${dataToPass.id}`, { dataToPass },{
            headers: { 'Content-Type': 'application/json; charset=utf-8'}
        })
        .then((res)=>{
            // console.log(res);
            setLoading(false);
            props.closeModal();
        }).catch(e => {
            console.log(e);
        });
    }

    if(loading) return <div className='d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></div>;

    return(
        <Form id="form-submit-update" className='d-flex flex-column gap-2' onSubmit={(e) => {saveData(e)}} >
            <Form.Control onChange={(e) => changeHandler(e)}    value={dataToPass?.name}       name="name"        placeholder='Produkt'   type="text"     required autoComplete='off' />
            <Form.Control onChange={(e) => changeHandler(e)}    value={dataToPass?.model}      name="model"       placeholder='Model'     type="text"     required autoComplete='off' />
            <Form.Control onChange={(e) => changeHandler(e)}    value={dataToPass?.size}       name="size"        placeholder='Rozmiar'   type="text"     required autoComplete='off' />
            <Form.Control onChange={(e) => changeHandler(e)}    value={dataToPass?.ean}        name="ean"         placeholder='EAN'       type='number'   required autoComplete='off' />
            <Form.Control onChange={(e) => changeHandler(e)}    value={dataToPass?.price}      name="price"       placeholder='Cena'      type='number'   required autoComplete='off' />
            <Form.Control onChange={(e) => changeHandler(e)}    value={dataToPass?.quantity}   name="quantity"    placeholder='Ilość'     type='number'   required autoComplete='off' />
            <div className='d-flex w-100 justify-content-end'>
                <Button type="submit">Zapisz</Button>
            </div>
        </Form>
    );
};