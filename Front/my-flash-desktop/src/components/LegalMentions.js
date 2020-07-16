import React, { Component } from 'react';
import axios from 'axios';
import logoMyFlash1 from "../images/LogoMyFlash.png";

class LegalMentions extends Component {

    componentDidMount() {
        axios.get("/api/admins/legalmention").then(response => {
             if(response.data.legalMentions[0]){
            this.setState({ legalMentions: response.data.legalMentions });
            document.getElementById("text").innerHTML = String(this.state.legalMentions[0].text)
             } else {
            const tempLegalMentions = [{
                    text: ""
                }]
            this.setState({legalMentions: tempLegalMentions});
           }     
        });
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const legalMentions = this.state.legalMentions
        return (
            <div>
                <header>
                    <div style={styles.image}>
                        <img src={logoMyFlash1} style={styles.img} alt="My Flash logo" />
                    </div>
                    <div style={styles.containerLegalMentions}>
                        <div style={styles.fabFrance}>Fabrication 100% Française</div>
                        <div style={styles.enteteLegalMentions}>Mentions Légales :</div>

                        <div style={styles.containerTextLegalMentions}>
                            {
                                legalMentions !== undefined && (
                                    <p id="text"></p>
                                )
                            }
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

const styles = {
    img: {
        margin: 'auto',
        marginBottom: '2rem',
        marginTop: '2rem',
        width: '40%',
    },
    image: {
        maxWidth: '800px',
        width: '100%',
        margin: 'auto',
        textAlign: 'center',
    },
    span: {
        fontWeight: 'bold,'
    },
    enteteLegalMentions: {
        color: 'white',
        fontSize: '2rem',
        textAlign: 'center',
        border: '1px solid #0086CB',
        backgroundColor: '#0086CB'
    },
    containerLegalMentions: {
        textAlign: 'justify',
        maxWidth: '800px',
        margin: 'auto',
    },
    containerTextLegalMentions: {
        margin: '2rem 2rem 2rem 2rem',
    },
    fabFrance: {
        textAlign: 'right',
        color: 'grey',
        marginBottom: '2rem',
    }
}

export default LegalMentions