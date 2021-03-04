import { useState, useEffect} from "react";
import { Header} from '../components/Header';
import '../styles/components/CopadoBrasil.css';


export function CopadoBrasil(){


    const [jogos, setJogos] = useState([]);
    const [resultado, setResultado] =  useState([]);
    
    
    const getJogos = async () => {
    
        try {
            const response = await fetch('https://cors-anywhere.herokuapp.com/https://futebol.homolog.groundsportech.com/samples/campeonatos/670/partidas.json')
            const json = await response.json()
            setJogos(json.data)
            console.log(setJogos)
          
        
            }

            catch (error) {
            console.log(error)
        }
    
    
    }




const showJogos = () => {
        
      
        for(let resultados of jogos )
    
        {
            if (resultados.idEquipeVisitante === 1083 || resultados.idEquipeMandante  === 1083 )
    
            {    
            setResultado([resultados])
            console.log(setResultado)
             
    
            }
    

     
        }    
       
    }
    


    
    
    useEffect((() => {
        getJogos();
        showJogos();

       
      }), []);
    
    
          
    

        return (
            <div className="CopadoBrasilContainer">
                <div className='CopadoBrasilLayer'></div>

                    <div class='CopadoBrasilTitulo'>
                
                        <p> Copa do Brasil </p>

                     </div>
                <div className='CopadoBrasilJogos'> 
               
                {resultado && resultado.map((partida) => <div className='CopadoBrasilTimeEsquerda'>
                 
                 Esquerda 


                {partida.idEquipeMandante}
                {partida.idCampeonato}
                {partida.fase}

                </div> )}
                {resultado && resultado.map((partida) => <div className='CopadoBrasilTimeDireita'>   
                Direita 
                {partida.idEquipeVisitante}
              
                </div>)}
                   
               
                </div>
            

                
                
            </div>
        )
                
    
        
                }
    