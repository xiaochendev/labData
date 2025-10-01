import { Link } from 'react-router-dom'
import style from './Nav.module.css'

export default function NavBar(){
    return (
        <nav className={style.nav} >
            <Link to='/people'>
                <div>people</div>
            </Link>
            <Link to='/starships'>
                <div>starships</div>
            </Link>
            <Link to='/planets'>
                <div>planets</div>
            </Link>
        </nav>
    )
}