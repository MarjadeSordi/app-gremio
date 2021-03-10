import { useState, useEffect} from "react";
import '../styles/components/Brasileiro.css';
import moment from 'moment';
import 'moment/locale/pt-br';


export function Brasileiro(){

    const [JogosBrasileiro, setJogosBrasileiro] = useState([]);
    const [equipesBrasileiro, setEquipesBrasileiro] =useState([]);
    const [estadiosBrasileiro, setEstadiosBrasileiro] =useState([]);
    const [JogosGremio, setJogosGremio] = useState([]);
    const [ultimaGremio, setultimaGremio] = useState([]);
    const [nomeEquipeEsquerda, setnomeEquipeEsquerda] = useState([]);
    const [nomeEquipeDireita, setnomeEquipeDireita] = useState([]);
    const [estadioEsquerda, setestadioEsquerda] = useState([])
    const [estadioDireita, setestadioDireita] = useState([])
    const [dataBrasileiro, setdataBrasileiro] = useState()


    const getInfoBrasileiro = async () => {

    try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://futebol.homolog.groundsportech.com/samples/campeonatos/673/partidas.json')
        const json = await response.json()
        setJogosBrasileiro(json.data)
        console.log()

        const equipe = await fetch('https://cors-anywhere.herokuapp.com/https://futebol.homolog.groundsportech.com/samples/campeonatos/673/equipes.json')
        const jsonequipe = await equipe.json()
        setEquipesBrasileiro (jsonequipe.data)

        const estadio = await fetch('https://cors-anywhere.herokuapp.com/https://futebol.homolog.groundsportech.com/samples/estadios.json')
        const jsonestadio = await estadio.json()
        setEstadiosBrasileiro(jsonestadio.data)
      
        }

        catch (error) {
        console.log(error)
    }

    }

    const showJogosBrasileiro = () => {
        if (JogosBrasileiro.length) {
            const JogosGremioBrasileiro = JogosBrasileiro.filter((jogosgremio)=> jogosgremio.idEquipeMandante === 1083 || jogosgremio.idEquipeVisitante === 1083);
            setJogosGremio(JogosGremioBrasileiro)
            console.log(JogosGremioBrasileiro)

        }
    }

    const showUltimaPartidaBrasileiro = () => {
        if (JogosGremio.length) {
            const UltimaPartidaGremio = JogosGremio.filter((ultimojogo) => ultimojogo.rodada === 38);
            setultimaGremio(UltimaPartidaGremio)
            console.log(ultimaGremio)

        }
    }

    const showequipeEsquerda = () => {
        if (equipesBrasileiro.length) {
            const showGremio = equipesBrasileiro.filter((gremio) => gremio.id === 1083);
            setnomeEquipeEsquerda(showGremio)
            console.log(showGremio)
        }
    }

    const showequipeDireita = () => {
        if (equipesBrasileiro.length){
            const showAdversario = equipesBrasileiro.filter((adversario) => adversario.id === 1014);
            setnomeEquipeDireita(showAdversario)
            console.log(showAdversario)
        }
    }
  

    const showestadioEsquerda = () => {
        if (estadiosBrasileiro.length){
            const showestadioGremio = estadiosBrasileiro.filter((gremio) => gremio.id === 1060);
            setestadioEsquerda(showestadioGremio)
        }
    }

    const showestadioDireita = () => {
        if (estadiosBrasileiro.length){
            const showestadioAdversario = estadiosBrasileiro.filter((adversario) => adversario.id === 11)
            setestadioDireita(showestadioAdversario)
        }
    }

   const getDataBrasileiro = () => {
       if (ultimaGremio.length) {
           const dataultimaRodada = ultimaGremio.map((gremio) => gremio.dataDaPartidaIso)
           const dataRodada = dataultimaRodada.toString()
           console.log(dataRodada)
           const dataFormatadaBrasileiro = 
           moment(dataRodada).format('LLL')
           setdataBrasileiro(dataFormatadaBrasileiro)
           console.log(dataFormatadaBrasileiro)
       }
   }
 

     
useEffect((() => {
    getInfoBrasileiro();
  }), []);

  useEffect((() => {
    showJogosBrasileiro();
  }), [JogosBrasileiro]);
  
  useEffect((() => {
    showUltimaPartidaBrasileiro();
  }), [JogosGremio]);

  useEffect((() => {
    showequipeEsquerda();
  }), [equipesBrasileiro]);
   
 
  useEffect((() => {
    showequipeDireita();
  }), [equipesBrasileiro]);

  useEffect((() => {
    showestadioEsquerda();
  }), [estadiosBrasileiro]);

  useEffect((() => {
    showestadioDireita();
  }), [estadiosBrasileiro]);
  
  useEffect((() => {
    getDataBrasileiro ();
  }), [ultimaGremio]);
 


  return(
      <div className='BrasileiroContainer'>
        <div className='BrasileiroLayer'>  </div>
         <div className='BrasileiroTitulo'> 
        <h1>  Brasileiro </h1>
         <span className='BrasileiroData'>{dataBrasileiro}</span> 


         {ultimaGremio && ultimaGremio.map((partida) => 
         <p> <strong> Rodada: </strong> {partida.rodada} <p></p> </p>)}
         {ultimaGremio && ultimaGremio.map((resultado) => <p> <strong> Time da Casa: </strong> {resultado.placar.golsMandante}  <p> X </p>
         <strong> Visitante: </strong> {resultado.placar.golsVisitante}</p>)}

         {estadioDireita && estadioDireita.map((partida) => <p><strong> Estádio: </strong> {partida.nome}</p>)}

         </div>
     

      <div className='BrasileiroEsquerda'> 
      <img src='/gremio-logo.svg' alt='Bandeira Grêmio' />
      {nomeEquipeEsquerda && nomeEquipeEsquerda.map((equipe) =>
      <p> <h1> {equipe.nome}</h1> 
      <p> Cidade: {equipe.cidade}  - {equipe.estado} </p> <p> </p>
      <p> Torcida: {equipe.torcedorNoPlural} </p></p>
      )}
      {estadioEsquerda && estadioEsquerda.map((equipe) => 
      <p><strong> Estádio: </strong> {equipe.nome}</p>)}
      
      
      </div>
      <div className='BrasileiroDireita'> 
      <img src='/goias.svg' alt="Bandeira do Goais" />
      {nomeEquipeDireita && nomeEquipeDireita.map((equipe) => 
      <p> <h1> {equipe.nome}</h1>
      <p> Cidade: {equipe.cidade}  - {equipe.estado} </p> <p> </p>
      <p> Torcida: {equipe.torcedorNoPlural}</p>
      </p>)}
      {estadioDireita && estadioDireita.map((equipe) => 
      <p> <strong> Estádio: </strong> {equipe.nome}</p>)}
      </div>
      
      
      </div>
  ) 

}







    
