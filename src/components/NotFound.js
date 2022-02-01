import React from 'react'
import './NotFound.css'
import image from '../images/404.jpg'

export default function NotFound() {
    return (
        <div className='notFound'>
            <img src={image} alt="Resource not found...sorry for the inconvenience from you Canadian dev!." />
            {/* <h1>Resource Not Found</h1> */}
        </div>
    )
}
