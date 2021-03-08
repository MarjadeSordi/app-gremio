import { useState, useEffect} from "react";
import "../styles/components/Header.css";


export function Header(){


const [equipes, setEquipes] = useState([]);
const [time, setTime] =  useState([]);


const getEquipes = async () => {

    try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://futebol.homolog.groundsportech.com/samples/campeonatos/670/equipes.json')
        const json = await response.json()
        setEquipes(json.data)
        
    
      } 
       catch (error) {
       console.log(error)

    }


}

const show = () => {
  
  
if(equipes.length) {
        
        const Gremionoarray = equipes.filter((times) => times.nome === "Grêmio");

        setTime(Gremionoarray);  
    }
   
}


useEffect((() => {
    getEquipes();  
 }), []);

 useEffect((() => {
    show();
  }), [equipes]);



  

    return (
        <div>


        <div className='HeaderContainer'>
      
        <img src="/gremio-logo.svg" className='HeaderLogo' alt='Bandeira Grêmio' />
          

          {time && time.map((gremio) => 
            <div  className='HeaderConteudo'>
              
            <p> Bem vindos {gremio.torcedorNoPlural}! <br></br>
            O  {gremio.nome} é de {gremio.cidade} - {gremio.estado} </p>
            


                
            </div>

            )}

    

      </div>   



            
            
        </div>
    )
            

    
            }
            
