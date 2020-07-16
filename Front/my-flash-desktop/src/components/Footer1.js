import React from "react";
import './Footer.css';
import { Col, Container, Row, Footer } from "mdbreact";
import logoMyFlash from "../images/Mascotte.png";
import iconFaceBook from "../images/icon-facebook-64.png";
import ContactModal from './PContact/PageContactModal';

export class FooterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFooter: true,
      growFooter: true
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      showFooter: !this.state.showFooter,
      growFooter: true
    });
  }
  onGrow(){
      this.setState({
        growFooter: !this.state.growFooter,
        showFooter: false,
      });
  }
 
 toggleFalse() {
    this.setState({
      showFooter: true,
      growFooter: !this.state.growFooter
    });
  }

  render() {
    const showFooter = {
      display: this.state.showFooter ? "flex" : "none",
      height: '8.5vh',
      fontSize: '2vh',
    };

    const hideFooter = {
      display: this.state.showFooter ? "none" : "flex"
    };
    
    const grow = {
        height: this.state.growFooter ? "8.5vh" : '32vh',
        transition: '1.5s',
        fontSize: '1.5vh',
        overflow: 'hidden',
    };
        
    return (
      <div className="p-0 m-0">
        <Footer
          color="stylish-color-dark footer"
          style={styles.blockFooter}
          className="page-footer p-0 m-0 font-small"
        >
          <div
            className="container-fluid p-0 m-0"
            onMouseEnter={this.toggle.bind(this)}
            onMouseLeave={this.toggle.bind(this)}
          >
            <Row className="row justify-content-around footerSmall p-0 m-0" style={showFooter}>
              <Col className="d-flex justify-content-center p-0 m-0">
                <div className="d-flex align-item-center mt-auto mb-auto d-none d-md-block">
                  <img
                    src={logoMyFlash}
                    style={styles.smallImg}
                    className="d-block mx-auto img-fluid"
                    alt="My Flash logo"
                  />
                </div>
              </Col>
              <Col className="centrer">
                <h6 className="text-uppercase  mt-auto mb-auto text-center font-weight-bold">
                  Contact
                </h6>
              </Col>
              <Col className="centrer">
                <h6 className="text-uppercase  mt-auto mb-auto text-center  font-weight-bold">
                  Boutique
                </h6>
              </Col>
              <Col className="centrer">
                <h6 className="text-uppercase  mt-auto mb-auto text-center font-weight-bold">
                  Informations
                </h6>
              </Col>
              <Col className="mt-auto mb-auto">
                <div className="text-center d-none d-md-block">
                  <ul className="list-unstyled list-inline p-0 m-0">
                    <li className="list-inline-item">
                      <a
                        target="/blank"
                        href="https://www.facebook.com/myflashflash"
                        className="facebookLink"
                      >
                        <div className="mt-auto mb-auto">
                          <img
                            style={styles.facebook}
                            src={iconFaceBook}
                            className="img-fluid"
                            alt="Facebook logo"
                          />
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Container fluid className=" col-12 p-0 m-0">
                <div className="footer-copyright text-center p-0 m-0">
                  &copy; 2015 Copyright :{" "}
                  <a href="https://www.my-flash.fr/"> My Flash </a>
                </div>
              </Container>
            </Row>
            <div className="container-fluid p-0 m-0" style={hideFooter} 
                onMouseEnter={this.onGrow.bind(this)}
                onMouseLeave={this.onGrow.bind(this)}>
            <Row className="footerFull w-100 p-0 m-0 mt-auto mb-auto" style={grow} >
              <Col md="2 d-flex align-item-center">
                <div className="d-none d-md-block" style={styles.logoContainer}>
                  <img
                    style={styles.img}
                    src={logoMyFlash}
                    alt="My Flash logo"
                  />
                </div>
              </Col>
              <Col className="mt-auto mb-auto" md="3">
                <h6 className="text-uppercase text-center mb-3 mt-1 font-weight-bold">
                  Contact
                </h6>
                <ul className="list-unstyled text-center hover">
                  <li className="mb-3">
                    <a href="#!">Téléphone : 07 82 81 36 28</a>
                  </li>
                  <li 
                  onClick={this.toggleFalse.bind(this)}
                  className="hover mb-3">                      
                    <ContactModal />                    
                  </li>
                  <li className="mb-3">
                    <a href="#!">
                      Adresse : AIRE CUBE - Les 3 Minées - 41800
                      Montoire-sur-le-Loir
                    </a>
                  </li>
                  <li className="mb-3 d-sm-block d-md-none">
                    <a href="/legalMentions">Mentions Légales</a>
                  </li>
                </ul>
              </Col>
              <Col md="3" className="mt-auto mb-auto d-none d-md-block">
                <h6 className="text-uppercase text-center mb-3 mt-1 font-weight-bold">
                  Boutique
                </h6>
                <ul className="list-unstyled text-center">
                  <li className="mb-3">
                     <a target="/blank" href="https://www.my-flash.fr/">
                      Ma boutique my-flash
                    </a>
                  </li>
                 
                  
                </ul>
              </Col>
              <Col md="3" className="mt-auto mb-auto d-none d-md-block">
                <h6 className="text-uppercase text-center mb-3 mt-1 font-weight-bold">
                  Informations
                </h6>
                <ul className="list-unstyled text-center">
                  <li className="mb-3">
                    <p data-toggle="modal"
                     data-target="#exampleModalCenter"
                     style={{cursor: "pointer"}}>Conditions générales d'utilisation</p>
                  </li>
                  <li className="mb-3">
                    <a href="/legalMentions">Mentions Légales</a>
                  </li>
                   <li className="list-inline-item">
                      <a
                        target="/blank"
                        href="https://www.facebook.com/myflashflash"
                        className="facebookLink"
                      >
                        <div
                          className="logoContainer"
                          style={styles.logoContainer}
                        >
                          <img
                            src={iconFaceBook}
                            className="w-50"
                            alt="Facebook logo"
                          />
                        </div>
                      </a>
                    </li>
                </ul>
              </Col>
              <Col md="1">
                <div className="text-center mb-3">
                  <ul className="list-unstyled list-inline">
                  
                  </ul>
                </div>
              </Col>
              <Container fluid style={styles.copyright} className="col-12 p-0 m-0">
                <div className="footer-copyright text-center p-0 m-0">
                  &copy; 2015 Copyright :{" "}
                  <a href="https://www.my-flash.fr/"> My Flash </a>
                </div>
              </Container>
            </Row>
            </div>
          </div>
        </Footer>
         <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
            onClose={this.toggleFalse.bind(this)}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Conditions générales d'utilisation
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h4 className="mt-3"> ARTICLE 1 : Objet </h4>
                  Les présentes « conditions générales d'utilisation » ont pour
                  objet l'encadrement juridique de l’utilisation du site
                  www.myflash.fr et de ses services. Ce contrat est conclu entre
                  : Le gérant du site internet, ci-après désigné « l’Éditeur »,
                  Toute personne physique ou morale souhaitant accéder au site
                  et à ses services, ci-après appelé « l’Utilisateur ». Les
                  conditions générales d'utilisation doivent être acceptées par
                  tout Utilisateur, et son accès au site vaut acceptation de ces
                  conditions.
                  <h4 className="mt-3">ARTICLE 2 : Mentions légales</h4>
                  Le site www.myflash.fr est édité par la société AIRE CUBE,
                  micro-entreprise dont le siège social est situé à : Les 3
                  Minées - 41800 Montoire-sur-le-Loir. La société est
                  représentée par SABBAH Rudy.
                  <h4 className="mt-3">ARTICLE 3 : Accès aux services</h4>
                  L’Utilisateur du site www.myflash.fr a accès aux services
                  suivants : • Consultation des produits présentés • Achat en
                  ligne des produits présentés Tout Utilisateur ayant accès à
                  internet peut accéder gratuitement et depuis n’importe où au
                  site. Les frais supportés par l’Utilisateur pour y accéder
                  (connexion internet, matériel informatique, etc.) ne sont pas
                  à la charge de l’Éditeur. Les services suivants ne sont pas
                  accessibles pour l’Utilisateur que s’il est membre du site
                  (c’est-à-dire qu’il est identifié à l’aide de ses identifiants
                  de connexion) : • Achat en ligne des produits présentés Le
                  site et ses différents services peuvent être interrompus ou
                  suspendus par l’Éditeur, notamment à l’occasion d’une
                  maintenance, sans obligation de préavis ou de justification.
                  <h4 className="mt-3">
                    ARTICLE 4 : Responsabilité de l’Utilisateur
                  </h4>
                  L'Utilisateur est responsable des risques liés à l’utilisation
                  de son identifiant de connexion et de son mot de passe. Le mot
                  de passe de l’Utilisateur doit rester secret. En cas de
                  divulgation de mot de passe, l’Éditeur décline toute
                  responsabilité. L’Utilisateur assume l’entière responsabilité
                  de l’utilisation qu’il fait des informations et contenus
                  présents sur le site www.myflash.fr Tout usage du service par
                  l'Utilisateur ayant directement ou indirectement pour
                  conséquence des dommages doit faire l'objet d'une
                  indemnisation au profit du site. Le site www.myflash.fr ne
                  permet pas aux membres de publier sur le site.
                  <h4 className="mt-3">
                    ARTICLE 5 : Responsabilité de l’Éditeur
                  </h4>
                  Tout dysfonctionnement du serveur ou du réseau ne peut engager
                  la responsabilité de l’Éditeur. De même, la responsabilité du
                  site ne peut être engagée en cas de force majeure ou du fait
                  imprévisible et insurmontable d'un tiers. Le site
                  www.my-flash.fr s'engage à mettre en œuvre tous les moyens
                  nécessaires pour garantir la sécurité et la confidentialité
                  des données. Toutefois, il n’apporte pas une garantie de
                  sécurité totale. L’Éditeur se réserve la faculté d’une
                  non-garantie de la fiabilité des sources, bien que les
                  informations diffusées sur le site soient réputées fiables.
                  <h4 className="mt-3">ARTICLE 6 : Propriété intellectuelle</h4>
                  Les contenus du site www.myflash.fr (logos, textes, éléments
                  graphiques, vidéos, etc.) sont protégés par le droit d’auteur,
                  en vertu du Code de la propriété intellectuelle. L’Utilisateur
                  devra obtenir l’autorisation de l’éditeur du site avant toute
                  reproduction, copie ou publication de ces différents contenus.
                  Ces derniers peuvent être utilisés par les utilisateurs à des
                  fins privées ; tout usage commercial est interdit.
                  L’Utilisateur est entièrement responsable de tout contenu
                  qu’il met en ligne et il s’engage à ne pas porter atteinte à
                  un tiers. L’Éditeur du site se réserve le droit de modérer ou
                  de supprimer librement et à tout moment les contenus mis en
                  ligne par les utilisateurs, et ce sans justification.
                  <h4 className="mt-3">ARTICLE 7 : Données personnelles</h4>
                  L’Utilisateur doit obligatoirement fournir des informations
                  personnelles pour procéder à son inscription sur le site.
                  L’adresse électronique (e-mail) de l’utilisateur pourra
                  notamment être utilisée par le site [nom de votre site] pour
                  la communication d’informations diverses et la gestion du
                  compte. [Votre site] garantie le respect de la vie privée de
                  l’utilisateur, conformément à la loi n°78-17 du 6 janvier 1978
                  relative à l'informatique, aux fichiers et aux libertés. Le
                  site est déclaré auprès de la CNIL en date du 7 Mars 2017 sous
                  le numéro suivant : 2041950v0. En vertu des articles 39 et 40
                  de la loi en date du 6 janvier 1978, l'Utilisateur dispose
                  d'un droit d'accès, de rectification, de suppression et
                  d'opposition de ses données personnelles. L'Utilisateur exerce
                  ce droit via : • Son espace personnel sur le site ; • Un
                  formulaire de contact ; • Par mail à : airecube@gmail.com ; •
                  Par voie postale à : Les 3 Minées - 41800
                  Montoire-sur-le-Loir.
                  <h4 className="mt-3">ARTICLE 8 : Liens hypertextes</h4>
                  Les domaines vers lesquels mènent les liens hypertextes
                  présents sur le site n’engagent pas la responsabilité de
                  l’Éditeur de [votre site], qui n’a pas de contrôle sur ces
                  liens. Il est possible pour un tiers de créer un lien vers une
                  page du site www.my-flash.fr sans autorisation expresse de
                  l’éditeur.
                  <h4 className="mt-3">
                    ARTICLE 9 : Évolution des conditions générales d’utilisation
                  </h4>
                  Le site www.my-flash.fr se réserve le droit de modifier les
                  clauses de ces conditions générales d’utilisation à tout
                  moment et sans justification.
                  <h4 className="mt-3">ARTICLE 10 : Durée du contrat</h4>
                  La durée du présent contrat est indéterminée. Le contrat
                  produit ses effets à l'égard de l'Utilisateur à compter du
                  début de l’utilisation du service.
                  <h4 className="mt-3">
                    ARTICLE 11 : Droit applicable et juridiction compétente
                  </h4>
                  Le présent contrat dépend de la législation française. En cas
                  de litige non résolu à l’amiable entre l’Utilisateur et
                  l’Éditeur, les tribunaux de Blois sont compétents pour régler
                  le contentieux.
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

const styles = {
  smallImg: {
    width: "15%",
  },
  facebook: {
    width: "40%"
  },
  img: {
    maxWidth: "100%",
    marginBottom: "1rem"
  },
  smallLogoContainer: {
    maxHeight: "5vh"
  },
  logoContainer: {
    textAlign: "center",
    width:"100%",
    maxWidth: '8rem',
    margin: "auto"
  },
  blockFooter: {
    position: "fixed",
    zIndex: 5,
    bottom: "0",
    width: "100%",
  },
  copyright: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    opacity: 1,
    backgroundColor: '#3E4551',
  },
};

export default FooterPage;
