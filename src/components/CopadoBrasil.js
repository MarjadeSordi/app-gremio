import { useState, useEffect} from "react";
import '../styles/components/CopadoBrasil.css';



export function CopadoBrasil(){


    const [jogos, setJogos] = useState([]);
    const [resultado, setResultado] =  useState([]);
    const [final, setFinal] = useState([])
    const [nomeEquipe,setNomeEquipe] = useState ([])
    const [timenaFinalGremio, setTimenaFinalGremio ] = useState([])
    const [timenaFinalAdversario, setTimenaFinalAdversario] = useState([])
    const [getPlacar, setPlacar] = useState([])

    const getJogos = async () => {
    
        try {
            const response = await fetch('https://cors-anywhere.herokuapp.com/https://futebol.homolog.groundsportech.com/samples/campeonatos/670/partidas.json')
            const json = await response.json()
            setJogos(json.data)

            const equipe = await fetch('https://cors-anywhere.herokuapp.com/https://futebol.homolog.groundsportech.com/samples/campeonatos/670/equipes.json')
            const jsonequipe = await equipe.json()
            setNomeEquipe(jsonequipe.data)
          
            }

            catch (error) {
            console.log(error)
        }
    
    
    }

    const showJogos = () => {

        if(jogos.length) {
        
            const JogosDoGremio = jogos.filter((jogo) => jogo.idEquipeVisitante === 1083 || jogo.idEquipeMandante  === 1083);

            setResultado(JogosDoGremio);  
         }
       
    }

    const showUltimoJogo = () => {

        if(resultado.length) {

            const JogoFinal = resultado.filter((jogofinal) => jogofinal.fase === 'Semifinal')
            setFinal(JogoFinal);
    
    }
}  
  
    const MostrarGremio =() => {
        if (nomeEquipe.length) {

            const NomesdaFinalGremio = nomeEquipe.filter((semifinal) => semifinal.id === 1083 )
            setTimenaFinalGremio (NomesdaFinalGremio)
  
      }

   }

   const MostrarAdversario =() => {
    if (nomeEquipe.length) {

        const NomesdaFinalAdversario = nomeEquipe.filter((semifinal) => semifinal.id === 1010)
        setTimenaFinalAdversario (NomesdaFinalAdversario)

  }

}


   const GetPlacarTime = () => {
        if (final.length) {
            const placares = final.filter((placartime) => placartime.idequipeMandante === 1083 || placartime.placar.id === 143451 );
            setPlacar(placares)
            console.log(placares);
        }
    }


       
   
    useEffect((() => {
        getJogos();
      }), []);
    
        useEffect((() => {
            showJogos();
          }), [jogos]);
    
          useEffect((() => {
            showUltimoJogo();
          }), [resultado]);
          
          useEffect((() => {
            MostrarGremio();
          }), [nomeEquipe]);

          useEffect((() => {
            MostrarAdversario();
          }), [nomeEquipe]);

          useEffect((() => {
            GetPlacarTime();
          }), [final]);
            
          
            

        return (
            <div className="CopadoBrasilContainer">
                <div className='CopadoBrasilLayer'></div>

                    <div class='CopadoBrasilTitulo'>
                
                        <p> Copa do Brasil </p>

                     </div>
                <div className='CopadoBrasilJogos'> 

                <div className='CopadoBrasilJogoscapsula'> 

                <div className='CopadoBrasilTimeEsquerda'>

                {timenaFinalGremio && timenaFinalGremio.map((partida) =>
                <p className='CopadoBrasilDestaque'>  Time da Casa: {partida.nome} </p>)} 

                {timenaFinalAdversario && timenaFinalAdversario.map((partida) =>
                <p className='CopadoBrasilDestaque'> Visitante: {partida.nome} </p>)}
              

                {getPlacar && getPlacar.map((partida) => 
                <p> Fase: {partida.fase} <p></p>
                Placar time da Casa:  {partida.placar.golsMandante} 
                <p></p>
                Placar visitante: {partida.placar.golsVisitante}</p> )}


                
                </div> 
                </div>
                
                <div className='CopadoBrasilJogoscapsula'>

                {final && final.map((partida) => 

                <div className='CopadoBrasilTimeDireita'>   
                Direita 
                {partida.idEquipeMandante}
                {partida.fase}
              
                </div>
                
                )}
                   
               
                </div>
            

                
                  </div>
            </div>
        )
                
  
        
                }
    