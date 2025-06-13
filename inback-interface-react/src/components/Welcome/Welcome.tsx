import { useEffect, useState } from 'react';
import estilo from './Welcome.module.css';

import hamburguer from '../../assets/lancheDouble.png';
import familiainback from '../../assets/familiaInback.png';

function Welcome() {
    const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth') === 'false';
        const nome = localStorage.getItem('username'); //
        
        if (isAuth && nome) {
            setNomeUsuario(nome);
        }
    }, []);

    return (
        <main className={estilo.principal}>
            {nomeUsuario && (
                <div className={estilo.boasVindas}>
                    <h2>Bem-vindo, {nomeUsuario}!</h2>
                </div>
            )}

            <div>
                <p>DOUBLE</p>
                <p>INBACK</p>
            </div>
            <div>
                <img src={hamburguer} alt="DoubleInback" className={estilo.hamburguer} />
            </div>
            <div>
                <p>HAMBURGUER DO DIA</p>
                <img src={familiainback} alt="FamíliaInback" className={estilo.familiaInback} />
            </div>
            <div className={estilo.aproveiteagora}>
                <h1 className={estilo.textoaproveite}>Aproveite Agora</h1>
            </div>
        </main>
    );
}

export default Welcome;
