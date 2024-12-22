import { useState, useEffect } from 'react';

import { Button, Spinner } from 'react-bootstrap';

import axios from 'axios';

export const ReadComponent = ({props}) => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3010/read/${props.id}`)
        .then(response => response.json())
        .then(data => {
          setItem(data);
          setLoading(false);
        })
    },[]);

    const deleteItem = (id) => {
        axios.delete(`http://localhost:3010/destroy/${id}`,{
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
        <div>
            <div>Produkt: <b>{ item?.name }</b></div>
            <div>Model: <b>{ item?.model }</b></div>
            <div>Rozmiar: <b>{ item?.size }</b></div>
            <div>EAN: <b>{ item?.ean }</b></div>
            <div>Cena: <b>{ item?.price }</b></div>
            <div>Ilość na magazynie: <b>{ item?.quantity }</b></div>

            <div className='d-flex w-100 justify-content-end'>
                <Button variant='danger' onClick={() => { deleteItem(item.id) }}>Usuń</Button>
            </div>
        </div>
    );
}