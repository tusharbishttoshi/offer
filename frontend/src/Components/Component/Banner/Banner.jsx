import React from 'react'
import styles from './Banner.module.css';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
function Banner({ children }) {
    return (<>
        <div className={styles.banner}>
            <Navbar />
            {
                children ? children : <div className={styles.main}>
                    <h1>"In <span>Unzzip Truth</span>, a finger points at truths within cosmic <span>constellations</span>."</h1>
                    <p>Unzzip Truth serves as a guiding hand, pointing towards the profound realities that shape our lives. It's not the destination but a finger leading you to self-discovery and cosmic insights on your unique journey</p>
                    <Link to="/auth?login=true" className={styles.btn} >Login</Link>
                </div>
            }

        </div>
    </>
    )
}

export default Banner
