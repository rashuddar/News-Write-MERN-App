import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import countries from "./countries";
import downArrow from './../assets/downarrow.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import "./leftnav.css"

function Leftnav() {
    const [active, setActive] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    let category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];

    return (
        <header className="">
            <nav className="fixed left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">

                <ul className={active ? "nav-ul flex gap-4 md:gap-6 xs:gap-4 lg:basis-3/6 md:basis-4/6 md:justify-end active" : " nav-ul flex gap-6 lg:basis-3/6 md:basis-4/6 justify-end"}>
                    <li><Link className="no-underline font-semibold" to="/" onClick={() => { setActive(!active) }}>All News</Link></li>
                    {/* Display Top Headlines directly in the navbar with capitalized text */}
                    {category.map((element, index) => (
                        <li key={index}>
                            <Link
                                to={"/top-headlines/" + element}
                                className="no-underline font-semibold capitalize text-uppercase"
                                onClick={() => { setActive(!active) }}>
                                {element}
                            </Link>
                        </li>
                    ))}
                    {/* Country dropdown */}
                    <li className="dropdown-li">
                        <Link className="no-underline font-semibold flex items-center gap-2"
                            onClick={() => { setShowCountryDropdown(!showCountryDropdown); }}>
                            Country <FontAwesomeIcon className={showCountryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
                        </Link>
                        <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
                            {countries.map((element, index) => (
                                <li key={index} onClick={() => { setShowCountryDropdown(!showCountryDropdown) }}>
                                    <Link to={"/country/" + element?.iso_2_alpha} className="flex gap-3" type="btn" onClick={() => { setActive(!active) }}>
                                        <img src={element?.png} srcSet={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`} alt={element?.countryName} />
                                        <span>{element?.countryName}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
                <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => { setActive(!active) }}>
                    <span className="lines line-1"></span>
                    <span className="lines line-2"></span>
                    <span className="lines line-3"></span>
                </div>
            </nav>
        </header>
    );
}

export default Leftnav;
