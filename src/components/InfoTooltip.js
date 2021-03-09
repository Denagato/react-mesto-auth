import login from "../images/login.svg";
import loginErr from "../images/loginErr.svg";

export default function InfoTooltip({ isOpen, onClose, isRequestSuccessful }) {
    return (
        <section className={`${isOpen ? "popup_opened" : ""} popup`}>
            <div className="popup__container popup__container_login">
            <button className="popup__close popup__close_infotool" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__login-img" alt="info" src={`${isRequestSuccessful ? login : loginErr}`}/>
                <p className="popup__login-text">{`${isRequestSuccessful ? "Вы успешно зарегестрированы" : "Что-то пошло не так. Попробуйте ещё раз"}`}</p>
            </div>
        </section>
    )}
