import { useState } from 'react';
import { Form } from 'react-bootstrap';

import axios from 'axios';

export const CreateComponent = ({props}) => {
    const [dataToPass, setDataToPass] = useState();

    const changeHandler = (event) => { setDataToPass(prevState => ({...prevState, [event.target.name]: event.target.value})) };

    const saveData = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3010/create',{ dataToPass }, {
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        })
        .then((res)=>{
            props.closeModal();
        }).catch(e => {
            console.log(e);
        });
    }

    return(
        <Form id="form-submit" className='d-flex flex-column gap-2' onSubmit={(e) => {saveData(e)}} >
            <Form.Control onChange={(e) => changeHandler(e)} name="name"        placeholder='Produkt'   type="text"     required autoComplete='off' />
            <Form.Control onChange={(e) => changeHandler(e)} name="model"       placeholder='Model'     type="text"     required autoComplete='off' />
            <Form.Control onChange={(e) => changeHandler(e)} name="size"        placeholder='Rozmiar'   type="text"     required autoComplete='off' />
            <Form.Control onChange={(e) => changeHandler(e)} name="ean"         placeholder='EAN'       type='number'   required autoComplete='off' />
            <Form.Control onChange={(e) => changeHandler(e)} name="price"       placeholder='Cena'      type='number'   required autoComplete='off' />
            <Form.Control onChange={(e) => changeHandler(e)} name="quantity"    placeholder='Ilość'     type='number'   required autoComplete='off' />
        </Form>
    );
}