import React from 'react'
import styles from "./styles.module.css"
import { NavLink, Link } from 'react-router-dom'
import { useAuthentication } from '../../hooks/auth'
import { useAuthValue } from '../../context/AuthContext'

const NavBar = () => {
  //pega o valor do usuario
  const {user} = useAuthValue()

  //importando a funcao de logout
  const {logout} = useAuthentication()

  return (
  <nav className={styles.navbar}>
    <Link to="/" className={styles.brand}>
        My Mini <span>Blog</span>
    </Link>

    <ul className={styles.links_list}>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
    {!user && (
      <>
        <li>
        <NavLink to="/login">Entrar</NavLink>
      </li>
      <li>
        <NavLink to="/register">Cadastrar</NavLink>
      </li>
      </>
    )}
    {user && (
      <>
        <li>
        <NavLink to="/posts/create">Novo post</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      </>
    )}
    <li>
        <NavLink to="/about">Sobre</NavLink>
    </li>
    {user && (
      <>
      <li>
        <button onClick={logout}>Sair</button>
      </li>
      </>
    )}
    </ul>
  </nav>
  )
}

export default NavBar