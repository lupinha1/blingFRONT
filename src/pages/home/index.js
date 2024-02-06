import { useEffect, useState } from 'react';
import Card from '../../components/card';
import './index.css';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import icon_a from '../../assets/icons8-coração-50.png';
import icon_b from '../../assets/icons8-ferramenta-64.png';
import icon_c from '../../assets/icons8-pedra-64.png';


function Home() {
  const [canGoToNextPage, setCanGoNextPage] = useState(false);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const system = queryParams.get('system');
  const token = queryParams.get('token');


  const setCookies = () => {
    Cookies.set(system, token);
  }


  useEffect(() => {
    if(system && token) {
      setCookies();
    }

    if (Cookies.get('SYSA') && Cookies.get('SYSB') && Cookies.get('SYSC')) {
      setCanGoNextPage(true);
    }else {
      setCanGoNextPage(false);
    }

    if (canGoToNextPage) {
      toast.dark("✅ Autenticações relizada com sucesso", { closeOnClick: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="main">
      <div className='content'>
        <div className='title'>
          <span>Bem vindo</span>
          <span>Você precisa se autenticar em todos os serviços antes de prosseguir</span>
        </div>
        <div className='cards'>
          <Card
            urlToAuth={process.env.REACT_APP_SYSTEM_A_AUTH_URL}
            systemName={process.env.REACT_APP_SYSTEM_A_NAME}
            icon={icon_a}/>
          
          <Card
          urlToAuth={process.env.REACT_APP_SYSTEM_B_AUTH_URL} 
          systemName={process.env.REACT_APP_SYSTEM_B_NAME} 
          icon={icon_b}/>
          
          <Card
          urlToAuth={process.env.REACT_APP_SYSTEM_C_AUTH_URL}
          systemName={process.env.REACT_APP_SYSTEM_C_NAME} 
          icon={icon_c}/>
        </div>
        <div className='btn-layer'>
          {
            canGoToNextPage ? (
              <Link to="/addorder" className='btn'>CONTINUAR</Link>
            ) : (<div></div>)
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
