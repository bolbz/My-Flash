import React from "react";
import axios from "axios";
import "./Profile.css";
import { notify } from "react-notify-toast";
import Facebook from '../../images/logo_facebook.png'
import Instagram from '../../images/logo_instagram.png'
import Twitter from '../../images/logo_twitter.png'
import LinkedIn from '../../images/logo_linkedin.png'
import Youtube from '../../images/logo_youtube.png'
import Skype from '../../images/logo_skype.png'
import Discord from '../../images/logo_discord.png'
import Shapr from '../../images/logo_shapr.png'
import Twitch from '../../images/logo_twitch.png'
import Snapshat from '../../images/logo_snapchat.png'

const styleCardsArray = [
    { title: "Identité", id: "identity" },
    { title: "Coordonnées", id: "coordonates" },
    { title: "Réseaux Sociaux", id: "socialNetworks" },
    { title: "Professionnel", id: "professional" },
    { title: "Santé", id: "health" },
    { title: "Centres d'intéret", id: "hobbies" }
];

const socialNetworksLogos = [
    { title: "Facebook", logo: Facebook },
    { title: "Instagram", logo: Instagram },
    { title: "Twitter", logo: Twitter },
    { title: "LinkedIn", logo: LinkedIn },
    { title: "Youtube", logo: Youtube },
    { title: "Skype", logo: Skype },
    { title: "Discord", logo: Discord },
    { title: "Shapr", logo: Shapr },
    { title: "Twitch", logo: Twitch },
    { title: "Snapshat", logo: Snapshat }
];

export default class ProfileContain extends React.Component {

    componentDidMount = () => {
        //On récupère l'apikey de l'utilisateur connecté et on stocke celle-ci dans le state
        axios.get("/api/users/me").then(response => {
            this.setState({
                apikey: response.data.apikey,
                firstName: response.data.firstname
            });
            if (this.state.firstName !== "Urgences") {
                axios.get("/api/active/activeCards").then(response => {
                    this.setState({
                        tab: response.data.tab
                    });
                });
                //On récuère les données de visibilité de l'utilisateur en fonction du profil où il se trouve actuellement
                //Puis on ajoute aux objets du tableau d'objet obtenu la propriété "mainId" avec comme valeur la propriété "id"
                // du tableau "styleCardsArray" correspondant au bon "title"
                //Et on fini par stocker ces données dans le state
                axios.get("api/profile/userDatas/" + this.state.apikey).then(response => {
                    this.setState({ infos: response.data.cards }, function () {
                        let tempInfos = this.state.infos;
                        for (let i = 0, length = tempInfos.length; i < length; i++) {
                            tempInfos.find(function (element) {
                                if (element.title === styleCardsArray[i].title) {
                                    Object.defineProperty(element, "mainId", {
                                        value: styleCardsArray[i].id,
                                        writable: false
                                    });
                                }
                                return null;
                            });
                        }
                        this.setState({
                            infos: tempInfos
                        });
                    });
                });
                //On récuère les données de visibilité de l'utilisateur en fonction du profil où il se trouve actuellement
                //Puis on ajoute aux objets du tableau d'objet obtenu la propriété "mainId" avec comme valeur la propriété "id"
                // du tableau "styleCardsArray" correspondant au bon "title"
                //Et on fini par stocker ces données dans le state
                axios.get("api/profile/userDatasVisibility/" + this.props.profileValue + "/" + this.state.apikey).then(response => {
                    let tempVisibilityInfos = response.data.visibilityCards;
                    for (let i = 0, length = tempVisibilityInfos.length; i < length; i++) {
                        tempVisibilityInfos[i].profile = this.props.profileValue;
                        tempVisibilityInfos.find(function (element) {
                            if (element.title === styleCardsArray[i].title) {
                                Object.defineProperty(element, "mainId", {
                                    value: styleCardsArray[i].id,
                                    writable: false
                                });

                                if (element.title === "Réseaux Sociaux") {

                                }
                            }
                            return null;
                        });
                    }
                    this.setState({
                        visibilityInfos: tempVisibilityInfos
                    });
                });
                axios.get("api/profile/userDatas/presentation/" + this.state.apikey).then(response => {
                    this.setState({
                        presentationInfos: response.data.presentation[0]
                    });
                    // document.getElementById("text-presentation").innerHTML = String(this.state.presentationInfos.Présentation);
                });
                axios.get("api/profile/userDatasVisibility/presentation/" + this.props.profileValue + "/" + this.state.apikey).then(response => {
                    this.setState({
                        visibilityPresentationInfos: response.data.visibilityPresentation[0]
                    });
                })
            }
            axios
                .get(
                    "api/profile/userDatasVisibility/presentation/" +
                    this.props.profileValue +
                    "/" +
                    this.state.apikey
                )
                .then(response => {
                    this.setState({
                        visibilityPresentationInfos: response.data.visibilityPresentation[0]
                    });
                });
        });
    };

    componentDidUpdate() {
        //Si la valeur de "profileValue" change on stocke cette nouvelle valeur dans le state
        // et on reconstruit le composant pour prendre en compte ces nouvelles données
        if (this.props.profileValue !== this.state.profileValue) {
            this.setState({ profileValue: this.props.profileValue }, function () {
                this.componentDidMount();
            });
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            collapsed: [],
            profileValue: this.props.profileValue || localStorage.getItem('profileValue'),
            tab: []
        };
        this._changeIcon = this._changeIcon.bind(this);
    }


    //Fonction appelée lors du click sur un "+" ou un "-" qui permet de changer l'état
    // de celui qui a été cliqué sans changer les autres
    _changeIcon = (i, increm) => {
        const tempCollapsed = this.state.collapsed;
        if (tempCollapsed[i + increm]) {
            tempCollapsed[i + increm] = false;
        } else {
            tempCollapsed[i + increm] = true;
        }
        this.setState({
            collapsed: tempCollapsed
        });
    };

    //card : la rubrique (Identité, Coordonnées, Santé, etc)
    //key : le nom de la valeur changée (Pseudo, nom, adresse, etc)
    //On prend la checkbox modifiée qu'on sauvegarde dans la variable "checkBox"
    //On modifie la propriété "key" de la rubrique "card" en lui définissant "checkBox.checked"(boolean) comme valeur
    //Puis on sauvegarde dans this.state.infos
    _modifyState(card, key, i, j) {
        //On récupère la bonne checkbox suivant son id
        var checkBox = document.getElementById("check" + card.title + j);
        const descriptor = { value: checkBox.checked };
        Object.defineProperty(card, key, descriptor);
        let tempVisibilityInfos = this.state.visibilityInfos;
        tempVisibilityInfos[i] = card;
        this.setState({
            visibilityInfos: tempVisibilityInfos
        });
    }

    //card : la rubrique (Identité, Coordonnées, Santé, etc)
    //key : le nom de la valeur changée (Nom, adresse, etc)
    //value : la valeur le l'input
    //On modifie la propriété "key" de la rubrique "card" en lui définissant "value" comme valeur
    //Puis on sauvegarde dans this.state.infos
    _modifyInputState(card, key, value, i) {
        const descriptor = { value: value };
        Object.defineProperty(card, key, descriptor);
        const tempInfos = this.state.infos;
        tempInfos[i] = card;
        this.setState({
            infos: tempInfos
        });
    }

    //On update les données de visibilité
    updateVisibility(datas) {
        axios.post(
            "api/profile/userDatasVisibility/update/" +
            this.props.profileValue +
            "/" +
            this.state.apikey,
            datas
        );
        notify.show("Les modifications ont été sauvegardées");
    }

    //On update les données
    updateDB(datas) {
        axios.post("/api/profile/userDatas/update/" + this.state.apikey, datas);
        notify.show('Les modifications ont été sauvegardées');
    }
    
    //Card body affichée sur l'url "/profile"
    ProfilesCardBody(key, j, i, increm) {
        return (
            <div className="card-body pt-2 pb-2">
                {key === "Présentation" ? (
                    <div className="body-section mb-3">
                        <p
                            className="text-data text-presentation section-content m-0"
                            style={{ width: "100%" }}
                        >
                            {this.state.visibilityPresentationInfos.Présentation &&
                                this.state.presentationInfos.Présentation}
                        </p>
                    </div>
                ) : (
                        <div className="body-section mb-3">
                            <div className="row align-items-center ml-1">
                                {(j >= 0 && j <= socialNetworksLogos.length) ? key === socialNetworksLogos[j - 1].title && (
                                    < img
                                        src={socialNetworksLogos[j - 1].logo}
                                        style={{ width: "1.5rem", height: "1.5rem", marginBottom: "0.8vh" }}
                                        alt="my-flash"
                                    />
                                ) : (null)}
                                <h6 className="text-title section-heading mb-1 ml-1">
                                    {key}
                                </h6>
                            </div>
                            <p
                                className="text-data text-presentation section-content m-0"
                                style={{ width: "100%" }}
                            >
                                {this.state.visibilityInfos[i + increm][key] && key !== "Présentation" &&
                                    this.state.infos[i + increm][key]}
                            </p>
                        </div>
                    )}
            </div>
        )
    }

    //Card body affichée sur l'url "/editer-profile"
    VisibilityCheckCardBody(card, key, j, i, increm) {
        return (
            <div className="card-body pt-2 pb-2">
                {key === "Présentation" ? (
                    <div className="body-section mb-3">
                        <h6 className="text-title section-heading mb-1 ml-1">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={this.state.visibilityPresentationInfos.Présentation}
                                checked={this.state.visibilityPresentationInfos.Présentation}
                                id="checkPrésentation"
                                onChange={e => {
                                    var PresentationCheckBox = document.getElementById("checkPrésentation");
                                    let tempsVisibilityPresentationInfos = this.state.visibilityPresentationInfos;
                                    tempsVisibilityPresentationInfos.Présentation = PresentationCheckBox.checked;
                                    tempsVisibilityPresentationInfos.profile = this.state.profileValue;
                                    this.setState({
                                        visibilityPresentationInfos: tempsVisibilityPresentationInfos
                                    });
                                    axios.post("/api/profile/userDatasVisibility/presentation/update/" + this.state.profileValue + "/" + this.state.apikey, this.state.visibilityPresentationInfos);
                                }}
                            />
                            {key}
                        </h6>
                        <p
                            className="text-data text-presentation section-content m-0"
                            style={{ width: "100%" }}
                        >
                            {this.state.visibilityPresentationInfos.Présentation &&
                                this.state.presentationInfos.Présentation}
                        </p>
                    </div>
                ) : (
                        <div className="body-section mb-3">
                            <div className="row align-items-center ml-1">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={this.state.visibilityInfos[i + increm][key]}
                                    checked={this.state.visibilityInfos[i + increm][key]}
                                    id={"check" + card.title + j}
                                    onChange={e => {
                                        this._modifyState(this.state.visibilityInfos[i + increm], key, i + increm, j)
                                    }}
                                />
                                {j <= socialNetworksLogos.length ? key === socialNetworksLogos[j - 1].title && (
                                    < img
                                        src={socialNetworksLogos[j - 1].logo}
                                        style={{ width: "1.5rem", height: "1.5rem", marginBottom: "0.8vh" }}
                                        alt="my-flash"
                                    />
                                ) : (null)}
                                <h6 className="text-title section-heading mb-1 ml-1">
                                    {key}
                                </h6>
                            </div>
                            <p
                                className="text-data section-content m-0"
                                style={{ width: "100%" }}
                            >
                                {this.state.visibilityInfos[i + increm][key] &&
                                    this.state.infos[i + increm][key]}
                            </p>
                        </div>
                    )}
            </div>
        )
    }

    //Card body affichée sur l'url "/editer-profile-general"
    DatasInputsCardBody(card, key, values, j, i, increm) {
        return (
            <div className="card-body pt-2 pb-2">
                {i === -1 && increm === -1 ? (
                    <form className="body-section mb-3">
                        <textarea
                            defaultValue={values[j]}
                            onChange={e => {
                                this._modifyInputState(card, key, e.target.value, i + increm)
                                axios.post("/api/profile/userDatas/presentation/update/" + this.state.apikey, this.state.presentationInfos);
                            }}
                            style={{ width: "100%", maxHeight: "20vh" }}
                        />
                    </form>
                ) : (
                        <form className="body-section mb-3">
                            <div className="row align-items-center ml-1">
                                {j <= socialNetworksLogos.length ? key === socialNetworksLogos[j - 1].title && (
                                    < img
                                        src={socialNetworksLogos[j - 1].logo}
                                        style={{ width: "1.5rem", height: "1.5rem", marginBottom: "0.8vh" }}
                                        alt="my-flash"
                                    />
                                ) : (null)}
                                <h6 className="section-heading mb-1 ml-1">
                                    <strong>{key}</strong>
                                </h6>
                            </div>
                            <input
                                type="text"
                                defaultValue={values[j]}
                                className="section-content m-0"
                                onChange={e => this._modifyInputState(card, key, e.target.value, i + increm)}
                                style={{ width: "100%" }}
                            />
                        </form>
                    )}
            </div>
        )
    }

    //Création d'une rubrique ("Identité", "Coordonnée", etc)
    Card(card, i, increm) {
        /*
            On range les noms des propriétés de l'objet "card" dans un tableau appelé "keys"
            Pareil pour leurs valeurs dans "values"
            */
        const { tab } = this.state;
        const keys = Object.keys(card);
        const values = Object.values(card);
        return (
            <div
                className={
                    "col-md-12 col-12 mt-4" + (i === -1 && increm === -1 ? " px-0" : "")
                }
                key={i}
            >
                {tab &&
                    <div id={card.mainId} className={"mb-2" + (tab[i + increm] === false ? " d-none" : "")}>
                        <div className="card story-card mb-3">
                            <div
                                className="card-header pt-2 pb-2"
                                style={styles.zindex}
                                id={card.firstId}
                                key={i}
                            >
                                <h6 className="mb-0">{card.title}</h6>
                                <a
                                    href=" "
                                    className="float-right"
                                    data-toggle="collapse"
                                    data-height=""
                                    data-target={"#" + card.mainId + "-second"}
                                    aria-expanded="true"
                                    aria-controls={card.aria}
                                    onClick={() => this._changeIcon(i, increm)}
                                >
                                    <i
                                        className={
                                            "icon fa fa-" +
                                            (this.state.collapsed[i + increm] ? "plus" : "minus")
                                        }
                                        style={{ color: "black" }}
                                    />
                                </a>
                            </div>
                            {keys.map((key, j) => {
                                if (
                                    key !== "title" &&
                                    key !== "mainId" &&
                                    key !== "profile" &&
                                    key !== "_id" &&
                                    key !== "user" &&
                                    key !== "__v" &&
                                    (key === "Présentation"
                                        ? true
                                        : window.location.pathname === "/profile"
                                            ? values[j]
                                            : window.location.pathname === "/editer-profile"
                                                ? this.state.infos[i + increm][key]
                                                : true)
                                ) {
                                    return (
                                        <div
                                            id={card.mainId + "-second"}
                                            className="collapse show"
                                            key={j}
                                        >
                                            {window.location.pathname === "/profile" &&
                                                this.ProfilesCardBody(key, j, i, increm)}
                                            {window.location.pathname === "/editer-profile" &&
                                                this.VisibilityCheckCardBody(card, key, j, i, increm)}
                                            {window.location.pathname === "/editer-profile-general" &&
                                                this.DatasInputsCardBody(card, key, values, j, i, increm)}
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </div>
                }
            </div>
        );
    }

    render() {
        // On range le tableau de données récupéré par axios dans la constante "cards"
        const cards = this.state.infos;
        let firstThird = [];
        let secThird = [];
        let thirdThird = [];
        let firstHalf = [];
        let secHalf = [];
        //Si la constante "cards" existe (ni nulle, ni indéfinie)
        //  on range les 1er, 2nd et 3ème tiers de cette constante dans 3 variables
        //  et on fait de même pour les première et 2nd moitiées
        if (cards) {
            firstThird = cards.slice(0, cards.length / 3);
            secThird = cards.slice(cards.length / 3, (cards.length * 2) / 3);
            thirdThird = cards.slice((cards.length * 2) / 3);
            firstHalf = cards.slice(0, cards.length / 2);
            secHalf = cards.slice(cards.length / 2);
        }
        return (
            <div style={styles.container} className="container-fluid">
                {//Si la constante "cards" existe (ni nulle, ni indéfinie)
                    //  on regarde quelle est la largeur de la fenêtre afin de savoir quelle structure afficher (1, 2 ou 3 colonnes)
                    cards !== undefined && this.state.infos !== undefined && this.state.visibilityInfos !== undefined && this.state.presentationInfos !== undefined && this.state.visibilityPresentationInfos !== undefined && this.state.firstName !== "Urgences" && (
                        <div className="container p-0">
                            {
                                window.location.pathname === "/editer-profile" &&
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="btn btn-primary mb-4"
                                        onClick={() => this.updateVisibility(this.state.visibilityInfos)}>
                                        Sauvegarder mon profil
                        </button>
                                </div>
                            }
                            {
                                window.location.pathname === "/editer-profile-general" &&
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="btn btn-primary mb-4"
                                        onClick={() => this.updateDB(this.state.infos)}>
                                        Sauvegarder mon profil
                        </button>
                                </div>
                            }
                            {this.Card(this.state.presentationInfos, -1, -1)}
                            {window.innerWidth > 768 ? (
                                <div className="row limit">
                                    <div className="d-flex flex-column col-4 p-0">
                                        {firstThird.map((card, i) => {
                                            return (
                                                <div className="col-12 p-0 limit" key={i}>
                                                    {this.Card(card, i, 0)}
                                                </div >
                                            );
                                        })}
                                    </div>
                                    <div className="d-flex flex-column col-4 p-0">
                                        {secThird.map((card, i) => {
                                            return (
                                                <div className="col-12 p-0 limit" key={i}>
                                                    {this.Card(card, i, 2)}
                                                </div >
                                            );
                                        })}
                                    </div>
                                    <div className="d-flex flex-column col-4 p-0">
                                        {thirdThird.map((card, i) => {
                                            return (
                                                <div className="col-12 p-0 limit" key={i}>
                                                    {this.Card(card, i, 4)}
                                                </div>
                                            );
                                        })}
                                    </div >
                                </div >
                            ) : window.innerWidth > 576 ? (
                                <div className="row limit">
                                    <div className="d-flex flex-column col-6 p-0">
                                        {firstHalf.map((card, i) => {
                                            return (
                                                <div className="col-12 p-0 limit" key={i}>
                                                    {this.Card(card, i, 0)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="d-flex flex-column col-6 p-0">
                                        {secHalf.map((card, i) => {
                                            return (
                                                <div className="col-12 p-0 limit" key={i}>
                                                    {this.Card(card, i, 3)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                        cards.map((card, i) => {
                                            return (
                                                <div className="col-md-12 col-12 limit" key={i}>
                                                    {this.Card(card, i, 0)}
                                                </div>
                                            );
                                        })
                                    )
                            }
                        </div>

                    )}
                {this.state.firstName === "Urgences" &&
                    <p className="scan-flash row mt-5 justify-content-center">Veuillez scanner un profil</p>
                }
            </div>
        );
    }
}


const styles = {
    zindex: {
        zIndex: 2
    },
    container: {
        marginBottom: '10vh'
    }
};
