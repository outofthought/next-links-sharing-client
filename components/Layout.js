import Head from 'next/head'
import Link from 'next/link'
import { isAuth, logout } from '../helpers/auth'

const Layout = ({ children }) => {
    const head = () => (
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous" />
    )

    const nav = () => (
        <ul className="nav nav-tabs bg-info">
            <li className="nav-item">
                <Link href="/">
                    <a className="nav-link text-dark">Home</a >
                </Link>

            </li>
            <li className="nav-item">
                <Link href="/about">
                    <a className="nav-link text-dark">About</a >
                </Link>
            </li>

            {!isAuth() && (
                <React.Fragment>
                    <li className="nav-item">
                        <Link href="/login">
                            <a className="nav-link text-dark">Login</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/register">
                            <a className="nav-link text-dark">Register</a>
                        </Link>
                    </li>
                </React.Fragment>
            )}

            {isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item ml-auto">
                    <Link href="/admin">
                        <a className="nav-link text-dark">{isAuth().name}</a>
                    </Link>
                </li>
            )}

            {isAuth() && isAuth().role === 'subscriber' && (
                <li className="nav-item ml-auto">
                    <Link href="/user">
                        <a className="nav-link text-dark">{isAuth().name}</a>
                    </Link>
                </li>
            )}

            {isAuth() && (
                <li className="nav-item">
                    <a onClick={logout} className="nav-link text-dark">
                        Logout
                    </a>
                </li>
            )}

        </ul>
    )
    return <React.Fragment>
        {head()}{nav()}
        <div className="container pt-5 pb-5" >{children}</div>

    </React.Fragment>
}
export default Layout