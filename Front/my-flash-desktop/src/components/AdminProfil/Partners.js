import React from 'react'
import axios from 'axios'
import FileBase64 from 'react-file-base64';
import DefaultImg from '../../../src/images/Mascotte_01B.png'

class Partners extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            partner: [],
            name: '',
            topImgPartner: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitImg = this.submitImg.bind(this);
    }

    setDefaultImage() {
        this.setState({
            topImgPartner: DefaultImg,
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    recoverImg(infos) {
        this.setState({
            partnerChange: infos
        })
        axios.get('/api/partners/changePartner/:index')
            .then(res => {
                if (res.data === null) {
                    console.error('aucun utilisateur')
                } else {
                    this.setState({
                        partnerChange: res.data.data
                    })
                }
            }).catch(error => {
                console.error(error.data)
            })
    }


    getBaseFile(files) {
        this.setState({
            topImgPartner: files.base64,
            name: this.state.name
        })
        let imageObj = {
            topImageData: this.state.topImgPartner.toString(),
            name: this.state.name
        };
        this.submitImg(imageObj)
    }

    submitImg(imageObj) {
        axios.post('/api/partners/newpartner', imageObj)
            .then((data) => {
                if (data.data.success) {
                    alert("Partenaire enregistré");
                    this.setDefaultImage();
                }
            })
            .catch((err) => {
                alert("Une erreur c'est produite!\nVérifiez que le nom est entré avant de choisir l'image\nou réduisez la taille de l'image.");
                this.setDefaultImage();
            });
        window.location.reload();
    }

    componentDidMount() {
        axios.get('/api/partners/allpartner')
            .then(res => {
                if (res.data === null) {
                    console.error('aucun utilisateur')
                } else {
                    this.setState({
                        partner: res.data.data
                    })
                }
            }).catch(error => {
                console.error(error.data)
            })
    }

    render() {
        const { partner } = this.state
        return (
            <div className="container-fluid text-center">
                <h1 className="mb-3">Ajout ou modification des partenaires :</h1>
                <p style={styles.titleBeforeImg}>Veuillez entrer le nom du partenaire avant l'image</p>
                <div className="container-fluid p-0 m-0">
                    <input
                        type="text"
                        name="name"
                        style={styles.formControl}
                        aria-label="name"
                        placeholder="Nom du partenaire"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="row mb-3"> 
                    <div className="process__upload-btn">
                        <h4 className="mb-3">Choisir une image: </h4> 
                        <FileBase64 type="file" multiple={false} onDone={this.getBaseFile.bind(this)} />
                    </div>
                </div>
                <div className="container-fluid">
                    <h1 style={{ textAlign: 'center' }}>Infos Partenaires:</h1>
                    <table className="table table-striped col-lg-12 col-md-12 col-sm-12">
                        <thead className="thead-dark">
                            <tr >
                                <th>ID</th>
                                <th >Partenaire</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partner.map((value, index) => {
                                return (
                                    <tr key={index} >
                                        <td>{value.index}</td>
                                        <td >{value.name} </td>
                                        <td><img alt={"Miniature partenaire " + (index + 1)} style={{ width: '60px', height: '45px' }} src={value.topImageData} /></td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const styles = {
    formControl: {
        width: "100%",
        maxWidth: "600px",
        maxHeight: "350px",
        height: "3rem",
        paddingLeft: "0.5rem",
    },
    titleBeforeImg: {
        fontSize: "0.85rem",
        color: "grey"
    }
}

export default Partners;