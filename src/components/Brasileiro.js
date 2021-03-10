import { useState, useEffect} from "react";
import '../styles/components/Brasileiro.css';
import moment from 'moment';
import 'moment/locale/pt-br';


export function Brasileiro(){

    const [JogosBrasileiro, setJogosBrasileiro] = useState([]);
    const [equipesBrasileiro, setEquipesBrasileiro] =useState([]);
    const [estadiosBrasileiro, setEstadiosBrasileiro] =useState([]);


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

useEffect((() => {
    getInfoBrasileiro();
  }), []);
  
  return(
      <div></div>
  )

}







    
