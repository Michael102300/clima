import React, { Fragment, useState, useEffect } from 'react';

import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  const [search, setSearch ] = useState({
    ciudad: '',
    pais: ''
    });
  const [ consult, setConsult ] = useState(false);
  const [ result , setResult ] = useState({});
  const [ error, setError ] = useState(false);

  const { ciudad, pais } = search;

  useEffect(() => {
    const consultarApi = async () => {
      if(consult){
        const key = 'e2ef9c445c98a995d4fc59ab32dfd8c7'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`
        const api = await fetch(url)
        const result = await api.json();
        setResult(result);
        setConsult(false);
        if(result.cod === "404" ){
          setError(true);
        }else{
          setError(false);
        };
      }
    }
    consultarApi();
    // eslint-disable-next-line
  }, [consult])

  let componente;
  if(error){
    componente = <Error message="No hay resultados"/>
  }else{
    componente =  <Clima result={result} />
  }

  return (
    <Fragment>
      <Header 
        titulo="Clima React "
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                search={search}
                setSearch={setSearch}
                setConsult={setConsult}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>

        </div>
      </div>
    </Fragment>
  );
}

export default App;
