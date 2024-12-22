import { Button, Modal } from 'react-bootstrap';

export const ModalComponent = ({props}) => {

    return(
        <Modal
            size="lg"
            show={props.modal}
            backdrop="static"
            onHide={props.closeModal}
            className=''
            centered
        >
            <Modal.Header closeButton>
            { props.ModalChildren().name }
            </Modal.Header>
            <Modal.Body>
                { props.ModalChildren().children }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>props.closeModal()} variant="secondary">Anuluj</Button>
                { props.ModalChildren().actionButton && props.ModalChildren().actionButton }
            </Modal.Footer>
        </Modal>
    )
}