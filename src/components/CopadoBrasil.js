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
            const dados = setJogos(json.data)
            showJogos(dados)
          
        
            }

            catch (error) {
            console.log(error)
        }
    
    
    }




const showJogos = () => {
        
      
        for(let resultados of jogos )
    
        {
            if (resultados.idEquipeVisitante | resultados.idEquipeMandante === 1083)
    
            {
                
                
            setResultado([resultados])

             
    
            }
    
        //let data = resultados.dataDaPartidaIso;
        //data.getDay();
        //data.getMonth();
        //data.getUTCFullYear();
        //const dataFormat = new Date(data)
     
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

                </div> )}
                {resultado && resultado.map((partida) => <div className='CopadoBrasilTimeDireita'>   
                Direita 
                {partida.idEquipeVisitante}
              
                </div>)}
                   
               
                </div>
            

                
                
            </div>
        )
                
    
        
                }
    