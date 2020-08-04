import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

function TeacherItem(){
    return(
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/12430174?s=460&u=bc64b18611667c3fc3623f814c6c3f4d36a942fd&v=4" alt="Richardson Rosa"></img>
                <div>
                    <strong>Usuario ABC</strong>
                    <span>Química</span>
                </div>
            </header>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eos, quod aliquam, voluptas dolores cumque dolorum debitis tempora eveniet corrupti hic id? Id impedit sit minus illo voluptatum minima tempore?
                <br/><br/>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, earum voluptas inventore placeat repudiandae accusamus facere consequuntur fugiat quia dolorem nostrum autem molestiae laudantium temporibus neque nam itaque porro deserunt.
            </p>

            <footer>
                <p>
                    Preço/hora<strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;