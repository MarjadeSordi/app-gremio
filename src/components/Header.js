import { useState, useEffect} from "react";
import "../styles/components/Header.css";

export function Header(){


const [equipes, setEquipes] = useState([]);
const [time, setTime] =  useState([]);


const getEquipes = async () => {

    try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://futebol.homolog.groundsportech.com/samples/campeonatos/670/equipes.json')
        const json = await response.json()
        const dados = setEquipes(json.data)
        show(dados)
        show()

        
      
      } 
       catch (error) {
       console.log(error)

    }


}

const show = () => {
  
  


    for(let times of equipes)

    {
        if (times.nome === 'Grêmio')

        {


        setTime([times])
         


        }

 
    }

   
}




useEffect((() => {
    getEquipes();
    show();
   
  }), []);



  

    return (
        <div>

        <div className='HeaderContainer'>
      
        <img src="/assets/gremio-logo.svg" className='HeaderLogo' alt='Bandeira Grêmio' />
   
            {time && time.map((gremio) => 
            <div key={gremio.id} className='HeaderConteudo'>

            <p> Bem vindos {gremio.torcedorNoPlural}! <br></br>
            O  {gremio.nome} é de {gremio.cidade} - {gremio.estado} </p>
            
                
            </div>
            )}

    

        </div>   


          <ul>

            {
            equipes && equipes.map((equipe) =>
            <li key={equipe.id}> 
  
            {equipe.nome}

            </li>)}
    
          </ul>

    
        
            
            
        </div>
    )
            

    
            }