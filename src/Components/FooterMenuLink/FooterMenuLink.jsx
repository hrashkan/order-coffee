import { Link } from "react-router-dom"

export default function FooterMenuLink({ title, href }) {
    return (
        <li className="footer__menu-item">
            <Link to={href} className="footer__menu-link">{title}</Link>
        </li>
    )
}
