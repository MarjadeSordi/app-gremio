import { useState, useEffect} from "react";
import '../styles/components/CopadoBrasil.css';
import moment from 'moment';
import 'moment/locale/pt-br';


export function CopadoBrasil(){


    const [jogos, setJogos] = useState([]);
    const [resultado, setResultado] =  useState([]);
    const [final, setFinal] = useState([])
    const [nomeEquipe,setNomeEquipe] = useState ([])
    const [timenaFinalGremio, setTimenaFinalGremio ] = useState([])
    const [timenaFinalAdversario, setTimenaFinalAdversario] = useState([])
    const [getPlacar, setPlacar] = useState([])
    const [getSegundoPlacar, setSegundoPlacar] = useState([])
    const [dataEsquerda, setDataesquerda] = useState()
    const [dataDireita, setDatadireita] = useState()
    const [estadio, setEstadio] = useState([])
    const [estadioEsquerda, setEstadioEsquerda] = useState([])
    const [estadioDireita, setEstadioDireita] = useState([])


    const getJogos = async () => {
    
        try {
            const response = await fetch('https://cors-anywhere.herokuapp.com/https://futebol.homolog.groundsportech.com/samples/campeonatos/670/partidas.json')
            const json = await response.json()
            setJogos(json.data)

            const equipe = await fetch('https://cors-anywhere.herokuapp.com/https://futebol.homolog.groundsportech.com/samples/campeonatos/670/equipes.json')
            const jsonequipe = await equipe.json()
            setNomeEquipe(jsonequipe.data)

            const estadio = await fetch('https://cors-anywhere.herokuapp.com/https://futebol.homolog.groundsportech.com/samples/estadios.json')
            const jsonestadio = await estadio.json()
            setEstadio(jsonestadio.data)
          
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
            console.log(final)
    
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
            const placares = final.filter((placartime) =>  placartime.placar.id === 143451 );
            setPlacar(placares)
            }
 }

  const GetPlacarSegundoTime = () => {
      if (final.length) {
          const segundoPlacar = final.filter((placartimedois) =>  placartimedois.placar.id === 144036 );
          setSegundoPlacar(segundoPlacar)
        }
      }
  

  const getData = () => {
    if (getPlacar.length) {

        const getdataEsquerda = getPlacar.map((diadojogo) => diadojogo.dataDaPartidaIso);
        const getEsquerda = getdataEsquerda.toString()
         
        const  getDataFormatada = 
        moment(getEsquerda).format('LLL')
        setDataesquerda(getDataFormatada)
              
       }
  }

  const getDataDireita = () => {
    if (getSegundoPlacar.length) {

        const getdataDireita = getSegundoPlacar.map((diadojogo) => diadojogo.dataDaPartidaIso);
        const getDireita = getdataDireita.toString()
         
        const  getDatadireitaFormatada =
        moment(getDireita).format('LLL')
        setDatadireita(getDatadireitaFormatada)
        console.log(getDatadireitaFormatada)   
       }
  }

  const getEstadioEsquerda = () => {
    if (estadio.length) {
      const estadiodaEsquerda = estadio.filter((estadios) => estadios.id === 6 );
      setEstadioEsquerda (estadiodaEsquerda)
      
    }
  }

  const getEstadioDireita = () => {
    if (estadio.length) {
      const estadiodaDireita = estadio.filter((estadios) => estadios.id === 8 );
      setEstadioDireita (estadiodaDireita)

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

          useEffect((() => {
            GetPlacarSegundoTime();
          }), [final]);
      

          useEffect((() => {
           getData();
          }), [getPlacar]);

          useEffect((() => {
            getDataDireita();
           }), [getSegundoPlacar]);
          
          useEffect((() => {
            getEstadioEsquerda();
          }), [estadio]);

          useEffect((() => {
            getEstadioDireita();
          }), [estadio]);
        
            
          
            

        return (
            <div className="CopadoBrasilContainer">
                <div className='CopadoBrasilLayer'></div>

                    <div class='CopadoBrasilTitulo'>
                           <p> <h1> Copa do Brasil</h1> </p> 
                        
                            <span className='CopadoBrasilData'>{dataEsquerda}</span> 

                            {getPlacar && getPlacar.map((partida) => 
                            <p> <strong> Fase: </strong> {partida.fase} <p></p>
                               <strong> Placar: </strong> <p></p> 
                                Time da Casa:  {partida.placar.golsMandante} <p> X </p>
                                Visitante: {partida.placar.golsVisitante}</p> )}
                                {estadioEsquerda && estadioEsquerda.map((partida) =>
                                <p> <strong>  Estádio:</strong>  {partida.nome}  </p>)}     
                            
                                <span className='CopadoBrasilData'>{dataDireita}</span> 

                                {getSegundoPlacar && getSegundoPlacar.map((partida) => 
                                <p> <strong> Fase: </strong> {partida.fase} <p></p>
                                  <strong> Placar: </strong> <p></p> 
                                  Time da Casa:  {partida.placar.golsMandante} <p> X </p>
                                  Visitante: {partida.placar.golsVisitante}
                                </p> )}

                                {estadioDireita && estadioDireita.map((partida) =>
                                <p> <strong>  Estádio:</strong>  {partida.nome}  </p>)}

                            {}

                   </div>

                <div className='CopadoBrasilJogos'> 

                <div className='CopadoBrasilJogoscapsula'> 

                <div className='CopadoBrasilTimeEsquerda'>

                {timenaFinalGremio && timenaFinalGremio.map((partida) =>
                <h1 className='CopadoBrasilDestaque'> Time da Casa: {partida.nome} - {partida.sigla}</h1>
                                     
                )} 

                <img src="/gremio-logo.svg" alt='Bandeira do Grêmio' />
           
                {timenaFinalGremio && timenaFinalGremio.map((partida) => 
                <p> Cidade de Origem: {partida.cidade} - {partida.estado} <p></p>
                Torcida: {partida.torcedorNoPlural}</p> )}   

                {estadioEsquerda && estadioEsquerda.map((partida) =>
                <p> <strong>  Estádio:</strong>  {partida.nome}  </p>)}     
                
                 
                
                          
                </div> 
                </div>
                
                <div className='CopadoBrasilJogoscapsula'>

                <div className='CopadoBrasilTimeDireita'>   
                {timenaFinalAdversario && timenaFinalAdversario.map((partida) =>
                <h1 className='CopadoBrasilDestaque'> Visitante: {partida.nome} - {partida.sigla}</h1>)}
                 
                <img src="/logoatletico.png" alt='Bandeira do Atlético' />
               

                {timenaFinalAdversario && timenaFinalAdversario.map((partida) =>  
                <p> Cidade de Origem: {partida.cidade} - {partida.estado} <p></p>
                Torcida: {partida.torcedorNoPlural}</p>  )}
                
                {estadioDireita && estadioDireita.map((partida) =>
                <p> <strong>  Estádio:</strong>  {partida.nome}  </p>)}
                   
                </div>
                </div>
            

                
                  </div>
            </div>
        )
                
  
        
                }
    