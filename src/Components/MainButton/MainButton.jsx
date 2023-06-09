
import { Link } from "react-router-dom"
import "./MainButton.css"

export default function MainButton({ model, title, link }) {
    return (
        <Link to={link} className={`main-button ${model === 1 && 'bg'}`}>
            {title}
        </Link>
    )
}
