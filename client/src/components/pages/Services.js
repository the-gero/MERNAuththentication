import React, { useContext } from 'react'
import UserContext from "../../context/UserContext";
export default function Services() {
    const { userData } = useContext(UserContext);
    return (
        <div>
            Services section.
        </div>
    )
}
