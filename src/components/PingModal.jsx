import { Modal, Button } from 'react-bootstrap';

function PingModal({ show, onHide, output }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Ping Output</Modal.Title>
      </Modal.Header>
      <Modal.Body><pre>{output}</pre></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PingModal;