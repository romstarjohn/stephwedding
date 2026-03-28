import {Link} from "react-router-dom";
import Timer from "../components/Timer.tsx";
import WeddingBg from "../assets/images/stephetdanielle.jpeg"
import BGHero from "../assets/images/trysteph.png";
import Reservation from "../components/Reservation.tsx";
//import Localisation from "../assets/images/localisation.svg"

const Home = () => {
    //const today = new Date('2026-07-19');
    const goal_date = new Date('2026-03-05T00:00:00');

    return (
        <>
            <header id="hero" style={{
                backgroundImage: `url(${BGHero})`,
                backgroundSize:"cover"
            }}>
                <div className={"container_main"}>
                    <div className={"wrapper"}>
                        <p className={"heading"}>Le mariage de</p>
                        <h1>Stephen & Danielle</h1>
                        <Timer goal_date={goal_date}></Timer>
                        <p style={{fontWeight:"600"}}>
                            Nous sommes ravis de célébrer notre amour et de partager ce moment unique avec nos proches.
                            Rejoignez-nous pour une journée remplie d’émotion, de joie et de souvenirs inoubliables.<br/>
                            <b>Merci de bien vouloir nous confirmer votre présence avant le 04 mars.</b>
                        </p>
                        <Link className={"btn_main"}
                          to="/"
                          onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById("rsvp");
                              if (element) {
                                  element.scrollIntoView({ behavior: "smooth" });
                              }
                          }}>
                            RSVP
                        </Link>
                    </div>
                </div>
            </header>
            <section className="wedding-day">
                <div className="container-main">
                    <div className={"wrapper"}>
                        <h2>Journée de Mariage</h2>
                        <h3>La Cérémonie</h3>
                        <div className="event"
                             style={{
                                 backgroundImage: `url(${WeddingBg})`,
                                 backgroundSize: "cover",
                                 backgroundRepeat: "no-repeat",
                                 backgroundPositionY: "-77px"
                        }}>
                            <span className={"date"}>
                                17 Juillet 2026
                            </span>
                            <p>Lieu : Suisse<br />
                                Heure : 15h00</p>

                            <Link className={"btn_main"}
                              to="/"
                              onClick={(e) => {
                                  e.preventDefault();
                                  const element = document.getElementById("rsvp");
                                  if (element) {
                                      element.scrollIntoView({ behavior: "smooth" });
                                  }
                              }}>
                                RSVP
                            </Link>
                        </div>
                    </div>

                    <div className={"wrapper"} style={{marginTop: "30px"}}>

                        <h3>Lieu de la cérémonie</h3>
                        <p>
                            Les détails de la localisation<br /> seront communiqués prochainement.
                        </p>

                    </div>
                </div>
            </section>
            <Reservation>

            </Reservation>
        </>
    )
}

export default Home;