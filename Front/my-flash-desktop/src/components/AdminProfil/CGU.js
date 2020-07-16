import React from 'react';
import axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import fr from '@ckeditor/ckeditor5-build-classic/build/translations/fr' //eslint-disable-line

export default class CGU extends React.Component {

    componentDidMount() {
        axios.get("/api/admins/legalmention").then(response => {
           if(response.data.legalMentions[0]){
            this.setState({ legalMentions: response.data.legalMentions});
           } else {
            const tempLegalMentions = [{
                    text: ""
                }]
            this.setState({legalMentions: tempLegalMentions});
           }     
        });
        ClassicEditor.defaultConfig.language = 'fr';
    }

    constructor(props) {
        super(props);
        this.state = {
            legalMentions: null,
        }
    }

    render() {
        const legalMentions = this.state.legalMentions
        return (
            legalMentions !== null && (
                <div>
                    <p style={styles.autoUpdateText}>Sauvegarde automatique à l'écriture</p>
                    <CKEditor
                        id="editor"
                        language="fr"
                        editor={ClassicEditor}
                        data={legalMentions[0].text}
                        onInit={editor => {}}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            let value = Object.values(data).join('');
                            let tempLegalMentions = this.state.legalMentions
                            tempLegalMentions[0].text = value;
                            this.setState({
                                legalMentions: tempLegalMentions
                            });
                            axios.post("/api/admins/legalmention/", this.state.legalMentions);
                        }}
                    />
                </div>
            )
        );
    }
}

const styles = {
    autoUpdateText: {
        fontSize: "0.85rem",
        color: "grey"
    }
}