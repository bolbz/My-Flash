import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PageOfContact from './PageContact';

class ContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal       
    }));
  }

  render() {
    return (
      <div>
        <div onClick={this.toggle} >Courriel : contact@my-flash.fr</div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} style={styles.header}>CONTACTEZ-MOI</ModalHeader>
          <ModalBody>
            <PageOfContact />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const styles = {
    header: {
        // textAlign: "center",
        margin: "0 auto"
    }    
}



export default ContactModal;