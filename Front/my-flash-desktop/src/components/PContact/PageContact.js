import React, { Component } from 'react';
import logoMyFlash from "../../images/Mascotte_01B.png";
import axios from "axios";

class PageOfContact extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            message:"",
            email:"",
            sent: false,
            buttonText:" Envoyer votre message "
        }
    }

    formSubmit = (e) => {
        e.preventDefault() // empeche l'action par défaut du formulaire, ce qui aurait provoqué un rechargement de la page
      
        this.setState({
            buttonText: '...Envoi en cour' // le texte du bouton devient «… Envoi en cour» et axios appelle l’API
        })
      
        let data = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message
        }
        
        axios.post('api/contact/api/v1', data)
        .then( res => {
            this.setState({ sent: true }, this.resetForm())
        })
        .catch( () => {
          console.log('Message non Envoyé')
        })
      }

    resetForm = () => {
        this.setState({
            name: '',
            message: '',
            email: '',
            buttonText: 'Message envoyé'
        })
    }

    render() {
        return(
            <div className="pageContact-Container" style={styles.containerContact}>
                <img src={logoMyFlash} style={styles.logoContact} alt="logo My Flash"/>
                <form className="contact-form col-12" onSubmit={ (e) => this.formSubmit(e)}>                    
                    <div className="mb-2">
                        <label className="message-name col-md-4" style={styles.labels} htmlFor="message-name">Votre nom :</label>
                        <input 
                            onChange={e => this.setState({ name: e.target.value})} 
                            name="name" 
                            className="message-name"
                            style={styles.positionInput} 
                            type="text" 
                            placeholder="Votre nom" 
                            value={this.state.name}                            
                        />
                    </div>
                    <div className="mb-2">
                        <label className="message-email col-md-4 mb-2" style={styles.labels} htmlFor="message-email">Votre Email :</label>
                        <input 
                            onChange={(e) => this.setState({ email: e.target.value})} 
                            name="email" 
                            className="message-email"
                            style={styles.positionInput} 
                            type="email" 
                            placeholder="JeanDuJardin@mail.com" 
                            required value={this.state.email}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="message col-md-4 mb-2" style={styles.labels} htmlFor="message-input">Votre Message :</label>
                        <textarea 
                            onChange={e => this.setState({ message: e.target.value})} 
                            name="message" 
                            className="message-input"
                            style={styles.positionInput} 
                            type="text" 
                            placeholder="Veuillez ecrire votre message ici, s'il vous plait" 
                            value={this.state.message} 
                            required                            
                        />
                    </div>
                    <div className="button-container mt-3 mb-4">
                        <button type="submit" className="btn btn-primary">{ this.state.buttonText }</button>
                    </div>
                </form>
            </div>
        )
    }
}

const styles = {
    containerContact:{
        margin: "0 auto",
        marginBottom: "20px",
        marginTop: "20px",
        maxWidth: "600px",
        paddingLeft: "",
        textAlign: "center"
    },
    logoContact:{
        margin: "0 auto",
        width: "25vh",
        marginBottom: "20px"
    },
    labels:{
        verticalAlign:"top",
    }
}

export default PageOfContact; 