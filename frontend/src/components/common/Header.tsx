import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={styles.header}>
            <nav style={styles.nav}>
                <ul style={styles.menu}>
                    <li style={styles.menuItem}>
                        <Link to="/decks" style={styles.link}>Decks</Link>
                    </li>
                </ul>
            </nav>
        </header>

    );
};

const styles = {
    header: {
        backgroundColor: '#f8f9fa',
        padding: '10px 20px',
        borderBottom: '1px solid #ddd',
    },
    nav: {
        display: 'flex',
        justifyContent: 'center',
    },
    menu: {
        listStyle: 'none',
        display: 'flex',
        gap: '20px',
        margin: 0,
        padding: 0,
    },
    menuItem: {
        fontSize: '16px',
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
    },
};

export default Header;
