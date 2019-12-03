import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Nav.scss';

export default function Nav ({links}) {
    return (
        <nav>
            <ul>
                {links.map((link) => {
                    return (
                        <li key={`path:${link.path}title:${link.title}`}>
                            <Link to={link.path}>{link.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
