import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';

import {
  Button,
  Card,
  Table,
  Spinner
} from 'react-bootstrap';

import { ModalComponent } from './components/modal';
import { CreateComponent } from './components/create';
import { ReadComponent } from './components/read';
import { EditComponent } from './components/edit';

function App() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState();
  const [modal, setModal] = useState(false);
  const [modalChildren, setModalChildren] = useState({});

  useEffect(() => {
    fetch('http://localhost:3010/')
    .then(response => response.json())
    .then(data => {
      setItems(data);
      setLoading(false);
    })
  },[modal]);

  const openModal = (type, obj) => {
    setModal(true);
    setModalChildren({type, obj});
  };
  const closeModal = () => { setModal(false) };

  const ModalChildren = () => {
    switch(modalChildren.type){
      case 'create-product':
        return{
          children: <CreateComponent props={{closeModal}} />,
          name: 'Dodaj produkt',
          actionButton: <Button type="submit" form="form-submit">Zapisz</Button>};
      case 'edit-product':
        return{
          children: <EditComponent props={{id: modalChildren.obj?.id, closeModal}} />,
          name: `Edytuj ID: ${modalChildren.obj?.id}`,
          actionButton: <Button onClick={()=>setModalChildren({...modalChildren, type: 'read-product'})}>Cofnij</Button>};
      case 'read-product':
      default:
        return{
          children: <ReadComponent props={{id: modalChildren.obj?.id, closeModal }} />,
          name: `Produkt ID: ${modalChildren.obj?.id}`,
          actionButton: <Button onClick={()=>setModalChildren({...modalChildren, type: 'edit-product'})}>Edytuj</Button>};
    }
    
  }

  return (
    <div className="App">
      <Card className='card-class'>
        <Card.Header>Baza sklepu internetowego</Card.Header>
        <Card.Body className={`p-0 ${loading ? 'd-flex justify-content-center align-items-center' : ''} `}>
          { loading ? 
            <Spinner animation="border" variant="primary" />
          :
            <Table striped bordered hover className='table-sticky'>
              <thead>
                <tr>
                  <th>Produkt</th>
                  <th>Model</th>
                  <th>Rozmiar</th>
                  <th>EAN</th>
                  <th>Cena</th>
                  <th>Ilość</th>
                </tr>
              </thead>
              <tbody>
                { items?.map((i) => 
                  <tr key={ i.ean } onClick={()=>openModal('read-product', i)}>
                    <td>{ i.name }</td>
                    <td>{ i.model }</td>
                    <td>{ i.size }</td>
                    <td>{ i.ean }</td>
                    <td>{ parseFloat(i.price).toFixed(2) } zł</td>
                    <td>{ i.quantity }</td>
                  </tr>
                )}
              </tbody>
            </Table>
          }
        </Card.Body>
        <Card.Footer>
          <Button onClick={()=>openModal('create-product')}>Dodaj produkt</Button>
        </Card.Footer>
      </Card>

      <ModalComponent props={{modal, closeModal, ModalChildren}}/>
    </div>
  );
}

export default App;
