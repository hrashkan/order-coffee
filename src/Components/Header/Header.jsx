import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import useFetchData from "../../../Hooks/useFetchData";
import "./Header.css"

export default function Header({ scrollPosition }) {

    const { data: menu, error: menuError } = useFetchData('headerMenu');

    const [isResponsiveMenuActive, setIsResponsiveMenuActive] = useState(false);

    return (
        <header className={`header ${scrollPosition > 50 && 'scroll'}`}>
            <div className="brand">
                <Link to='/'>
                    <img src="/img/main/logo.png" alt="logo" className="logo" />
                </Link>
            </div>
            <nav className={`nav ${isResponsiveMenuActive && 'active'}`}>
                <ul className="nav__list">
                    {
                        menu.length ?
                            (
                                menu.map(item => (
                                    <li className="nav__list-item" key={item.id}>
                                        <NavLink to={item.href} className='nav__list-link'>{item.title}</NavLink>
                                    </li>
                                ))
                            )
                            : ('')
                    }
                    {
                        menuError && console.log(menuError)
                    }
                </ul>
            </nav>
            <div
                className="responsive-button"
                onClick={() => setIsResponsiveMenuActive(prev => !prev)}
            >
                <span className={`responsive-button__item ${isResponsiveMenuActive && 'active'}`}></span>
            </div>
        </header>
    )
}
