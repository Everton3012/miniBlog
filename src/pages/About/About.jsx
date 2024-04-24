//CSS
import styles from './About.module.css';

import { Link } from 'react-router-dom';

const About = () => {
    return (
        <>
            <div className={styles['about']}>
                <h2>Sobre o Mini <span>Blog</span></h2>
                <p>Este projeto consiste em um blog feito com React no front-end e Firebase no back-end, contendo as devidas validações e autenticações</p>
                <Link to={"/posts/create"} className="btn" >Criar Post</Link>

                <h2>Contato</h2>

                <div className={styles['contato']}>
                <Link target='blank' to={"https://github.com/Everton3012/miniBlog"} className={'btn'}>Repositorio</Link>
                
                <Link target='blank' to={"https://github.com/Everton3012"} className={'btn'}>GitHub</Link>
                
                <Link target='blank' to={"https://www.linkedin.com/in/everton-brandao-16938922b/"} className={'btn'}>LinkedIn</Link>
                </div>
            </div>
        </>
    )
}

export default About;