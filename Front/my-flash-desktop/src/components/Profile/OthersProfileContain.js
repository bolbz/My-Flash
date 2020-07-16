import React from 'react'
import axios from 'axios'
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

export default class OthersProfileContain extends React.Component {

    componentDidMount() {
        if (this.state.found) {
            axios.get("/api/profile/userDatas/" + this.props.chipUserApikey).then(response => {
                this.setState({ infos: response.data.cards }, function () {
                    let tempInfos = this.state.infos;
                    for (let i = 0, length = tempInfos.length; i < length; i++) {
                        tempInfos.find(function (element) {
                            if (element.title === styleCardsArray[i].title) {
                                Object.defineProperty(element, 'mainId', {
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
            axios.get("/api/profile/userDatasVisibility/" + this.props.profileValue + "/" + this.props.chipUserApikey).then(response => {
                this.setState({ visibilityInfos: response.data.visibilityCards }, function () {
                    let tempVisibilityInfos = this.state.visibilityInfos;
                    for (let i = 0, length = tempVisibilityInfos.length; i < length; i++) {
                        tempVisibilityInfos[i].profile = this.props.profileValue;
                        tempVisibilityInfos.find(function (element) {
                            if (element.title === styleCardsArray[i].title) {
                                Object.defineProperty(element, 'mainId', {
                                    value: styleCardsArray[i].id,
                                    writable: false
                                });
                            }
                            return element;
                        });
                    }
                    this.setState({
                        visibilityInfos: tempVisibilityInfos
                    });
                })
            });
        }
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
            profileValue: this.props.profileValue,
            chipId: this.props.chipId,
            userApikey: this.props.userApikey,
            found: this.props.found,
            userFirstName: this.props.userFirstName,
            isAuthenticated: this.props.isAuthenticated
        };
        this._changeIcon = this._changeIcon.bind(this)
    }

    _changeIcon = (i, increm) => {
        const tempCollapsed = this.state.collapsed
        if (tempCollapsed[i + increm]) {
            tempCollapsed[i + increm] = false
        } else {
            tempCollapsed[i + increm] = true
        }
        this.setState({
            collapsed: tempCollapsed
        })
    }

    //On ajoute le flash actuel au compte actuellement connecté
    addChipToUser = () => {
        axios.post("/api/users/addChip/" + this.state.chipId + "/" + this.state.userApikey);
        window.location.reload();
    }

    //Création d'une rubrique ("Identité", "Coordonnée", etc)
    Card(card, i, increm) {
        /*
        On range les noms des propriétés de l'objet "card" dans un tableau appelé "keys"
        Pareil pour leurs valeurs dans "values"
        */
        const keys = Object.keys(card);
        const values = Object.values(card);
        return (
            <div className="col-md-12 col-12 mt-4" key={i}>
                <div id={card.mainId} className="mb-2">
                    <div className="card story-card mb-3">
                        <div
                            className="card-header pt-2 pb-2"
                            style={styles.zindex}
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
                                onClick={() => this._changeIcon(i, increm)}
                            >
                                <i
                                    className={"icon fa fa-" + (this.state.collapsed[i + increm] ? "plus" : "minus")}
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
                                this.state.visibilityInfos[i + increm][key] &&
                                values[j].trim() !== ""
                            ) {
                                return (
                                    <div id={card.mainId + "-second"} className="collapse show" key={j}>
                                        <div className="card-body pt-2 pb-2">
                                            <div className="body-section mb-3">
                                                <div className="row align-items-center ml-1">
                                                    {(j >= 0 && j <= socialNetworksLogos.length) ? key === socialNetworksLogos[j-1].title && (
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
                                                    {values[j]}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        // On range le tableau de données récupéré par axios dans la constante "cards"
        const cards = this.state.infos;
        let firstThird = []
        let secThird = []
        let thirdThird = []
        let firstHalf = []
        let secHalf = []
        //Si la constante "cards" existe (ni nulle, ni indéfinie)
        //  on range les 1er, 2nd et 3ème tiers de cette constante dans 3 variables
        //  et on fait de même pour les première et 2nd moitiées
        if (cards) {
            firstThird = cards.slice(0, cards.length / 3)
            secThird = cards.slice(cards.length / 3, cards.length * 2 / 3)
            thirdThird = cards.slice(cards.length * 2 / 3)
            firstHalf = cards.slice(0, cards.length / 2)
            secHalf = cards.slice(cards.length / 2)
        }
        return (
            <div className="container p-0">
                {
                    !this.state.found && (
                        <div className="container p-0 text-center">
                            <h3>Ce flash n'est relié à aucun utilisateur</h3>
                            {this.state.userFirstName !== "Urgences" && this.state.isAuthenticated && (
                                <div>
                                    <h2>Voulez-vous l'associer à votre compte ?</h2>
                                    <button onClick={this.addChipToUser} style={styles.buttons}>Associer ce flash à mon compte</button>
                                    <a href="/editer-profile-general">
                                        <p className="mt-3">Revenir sur mon profil</p>
                                    </a>
                                </div>
                            )}
                            {!this.state.isAuthenticated && (
                                <div>
                                    <h3>Connectez-vous pour l'ajouter à votre compte</h3>
                                    <a href="/connection">
                                        <button className="mt-3" style={styles.buttons}>Me connecter</button>
                                    </a>
                                </div>
                            )}
                        </div>
                    )
                }
                {
                    this.props.found && (
                        //Si la constante "cards" existe (ni nulle, ni indéfinie)
                        //  on regarde quelle est la largeur de la fenêtre afin de savoir quelle structure afficher (1, 2 ou 3 colonnes)
                        cards !== undefined && this.state.infos !== undefined && this.state.visibilityInfos !== undefined && (
                            <div className="container p-0">
                                {
                                    window.innerWidth > 768 ? (
                                        <div className="row limit">
                                            <div className="d-flex flex-column col-4 p-0 limit">
                                                {
                                                    firstThird.map((card, i) => {
                                                        return (
                                                            <div className={"col-12 p-0 limit " + (card.mainId)} key={i}>
                                                                {this.Card(card, i, 0)}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="d-flex flex-column col-4 p-0 limit">
                                                {
                                                    secThird.map((card, i) => {
                                                        return (
                                                            <div className={"col-12 p-0 limit " + (card.mainId)} key={i}>
                                                                {this.Card(card, i, 2)}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="d-flex flex-column col-4 p-0 limit">
                                                {
                                                    thirdThird.map((card, i) => {
                                                        return (
                                                            <div className={"col-12 p-0 limit " + (card.mainId)} key={i}>
                                                                {this.Card(card, i, 4)}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                            window.innerWidth > 576 ? (
                                                <div className="row limit">
                                                    <div className="d-flex flex-column col-6 p-0 limit">
                                                        {
                                                            firstHalf.map((card, i) => {
                                                                return (
                                                                    <div className={"col-12 p-0 limit " + (card.mainId)} key={i}>
                                                                        {this.Card(card, i, 0)}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="d-flex flex-column col-6 p-0 limit">
                                                        {
                                                            secHalf.map((card, i) => {
                                                                return (
                                                                    <div className={"col-12 p-0 limit " + (card.mainId)} key={i}>
                                                                        {this.Card(card, i, 3)}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                    cards.map((card, i) => {
                                                        return (
                                                            <div className={"col-md-12 col-12 " + (card.mainId)} key={i}>
                                                                {this.Card(card, i, 0)}
                                                            </div>
                                                        )
                                                    })
                                                )
                                        )
                                }
                            </div>
                        )
                    )
                }
            </div>
        );
    }
}

const styles = {
    zindex: {
        zIndex: 2
    },
    buttons: {
        color: "white",
        backgroundColor: "#0073cb",
        marginTop: "5vh",
        border: "2px solid #0073cb",
        borderRadius: "7px",
        fontSize: "1rem",
        padding: "1vh",
        cursor: "pointer",
        width: '25vh'
    }
}
