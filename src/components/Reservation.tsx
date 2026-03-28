import { useState } from "react";
import './reservation.css';

import CoupleImage1 from '../assets/images/couple-image-1.jpeg'
import CoupleImage2 from '../assets/images/couple-image-2.jpeg'
import CoupleImage4 from '../assets/images/couple-image-4.jpeg'

const api_url = import.meta.env.VITE_BACKEND_URL;
type FormData = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    relation: string;
    participation: string;
    message: string;
};

const ReservationSection = () => {
    const site_disabled = false;
    const [formData, setFormData] = useState<FormData>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        relation: "",
        participation: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [apiMessage, setApiMessage] = useState("");  // new


    const handleChange = (e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!formData.participation) {
            setError("Merci d’indiquer votre participation.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${api_url}/api/v1/rsvp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": "s9vJ9H8fEwG3kQ7vR2tZ0uY5lL4aN6bP", // 🔒 replace in production
                },
                body: JSON.stringify(formData),
            });

            // Attempt to parse JSON from response
            const data = await response.json().catch(() => null);

            if (!response.ok) {
                const message = data?.message || "Une erreur est survenue. Veuillez réessayer.";
                if (response.status === 401) {
                    setError("Accès non autorisé.");
                } else if (response.status === 429) {
                    setError("Trop de tentatives. Merci de réessayer plus tard.");
                } else {
                    setError(message);
                }
                return;
            }

            // Success: show message returned from backend
            setSuccess(true);
            setError("");
            setApiMessage(data?.message || "Merci pour votre réponse 💖");

            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                relation: "",
                participation: "",
                message: "",
            });

            // Optional: show a toast, modal, or inline message
            setTimeout(() => setApiMessage(""), 15000);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Erreur réseau. Veuillez réessayer.");
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <section className="reservation-section" id={"rsvp"}>
            <div className="container-main">
                <div className={"reservation-grid"}>
                    <div className="reservation-form">
                        <h2>Confirmation de présence</h2>
                        <p className="reservation-subtitle">
                            Merci de confirmer votre présence avant le grand jour
                        </p>

                        <form className="rsvp-form" onSubmit={handleSubmit}>
                            {site_disabled && (
                                <p className="maintenance-message">
                                    🚧 Notre site est actuellement en maintenance.
                                    Nous vous invitons à revenir très prochainement.
                                    <br /><br />
                                    🔒 Aucune donnée ne sera enregistrée pendant cette période.
                                </p>
                            )}

                            {apiMessage && (
                                <p className="maintenance-message">
                                    {apiMessage}
                                </p>
                            )}

                            <div className="form-row">
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Nom *"
                                    required
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="Prénom *"
                                    required
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-row">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Adresse e-mail *"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Téléphone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* PARTICIPATION */}
                            <div className="form-row">
                                <select
                                    name="participation"
                                    value={formData.participation}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Participerez-vous au mariage ?
                                    </option>
                                    <option value="yes">Oui, avec plaisir 💍</option>
                                    <option value="maybe">Je ne sais pas encore</option>
                                    <option value="no">Non, malheureusement</option>
                                </select>
                            </div>

                            {/* RELATION */}
                            <div className="form-row">
                                <select
                                    name="relation"
                                    required
                                    value={formData.relation}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>
                                        Votre lien avec les mariés
                                    </option>
                                    <option value="Famille">Famille</option>
                                    <option value="Ami(e)">Ami(e)</option>
                                    <option value="Collègue">Collègue</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>

                            {/* MESSAGE */}
                            <div className="form-row">
                                <textarea
                                    rows={4}
                                    name="message"
                                    placeholder="Message pour les futurs mariés"
                                    disabled={formData.participation === "no"}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>

                            {formData.participation === "maybe" && (
                                <p className="info-text" style={{color:"#fff"}}>
                                    Merci de nous tenir informés dès que vous aurez pris votre décision 💌
                                </p>
                            )}

                            {error && <p className="error-text">{error}</p>}
                            {success && (
                                <p className="success-text">
                                    Merci pour votre réponse 💖
                                </p>
                            )}

                            <button
                                type="submit"
                                className="rsvp-button"
                                disabled={loading}
                            >
                                {loading ? "Envoi..." : "Envoyer ma réponse"}
                            </button>
                        </form>
                    </div>

                    <div className="reservation-image masonry">
                         <img src={CoupleImage1} alt="Les mariés, moment tendre" />
                        <img src={CoupleImage4} alt="Les mariés, regard amoureux" />

                        <img src={CoupleImage2} alt="Les mariés en voyage" />

                    </div>
                </div>

            </div>
        </section>
    );
};

export default ReservationSection;
