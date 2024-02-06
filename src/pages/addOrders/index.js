
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import './index.css'
import axios from 'axios';
import { toast } from 'react-toastify';



export default function AddOrder() {
    const [orders, setOrders] = useState([]);
    const [value, setValue] = useState('');

    const [systemAToken, setSystemAToken] = useState();
    const [systemBToken, setSystemBToken] = useState();
    const [systemCToken, setSystemCToken] = useState();

    const [de, setDe] = useState();
    const [para, setPara] = useState();

    const [checkSystem, setCheckSystem] = useState({
        SYSA: false,
        SYSB: false,
        SYSC: false,
    })

    const [checkSystemPara, setCheckSystemPara] = useState({
        SYSA: false,
        SYSB: false,
        SYSC: false,
    })

    const pushToOrders = (e) => {
        setOrders([...orders, value]);
        setValue('')
    };

    const getSystemTokens = () => {
        setSystemAToken(Cookies.get('SYSA'));
        setSystemBToken(Cookies.get('SYSB'));
        setSystemCToken(Cookies.get('SYSC'));
    }

    async function makeRequest() {
        try {
            toast.promise(axios.post('http://localhost:4000/sendOrderSale', {
                authorizationCodeSYS01: de,
                authorizationCodeSYS02: para,
                numberSaleOrders: orders,
            }), {
                pending: 'Enviando...',
                success: 'Notas enviadas com sucesso 😊',
                error: '❌ Algo deu errado!'
            }, {
                closeOnClick: true,
            });
        } catch(e) {
            console.log("Deu ruim");
        }


    }


    const checkIfThereIsAnyOtherBesidesMeChecked = (sys, obj) => {
        for (const key in checkSystem) {
            if (obj[key] && String(key) !== sys) {
                return true;
            }
        }
        return false
    }

    const handleDe = (sys, e) => {
        if (sys === "SYSA" && e.target.checked && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystem) === false) {
            setDe(systemAToken);
            setCheckSystem((prev) => {
                const x = {
                    ...prev,
                    SYSA: true
                }
                return x;
            });
        } else if (sys === "SYSA" && e.target.checked === false && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystem) === false) {
            setCheckSystem((prev) => {
                const x = {
                    ...prev,
                    SYSA: false
                }
                return x;
            });
            setDe('');
        }

        if (sys === "SYSB" && e.target.checked && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystem) === false) {
            setDe(systemBToken);
            setCheckSystem({ ...checkSystem, SYSB: true });
        } else if (sys === "SYSB" && e.target.checked === false && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystem) === false) {
            setDe('');
            setCheckSystem({ ...checkSystem, SYSB: false });
        }

        if (sys === "SYSC" && e.target.checked && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystem) === false) {
            setDe(systemCToken);
            setCheckSystem({ ...checkSystem, SYSC: true });
        } else if (sys === "SYSC" && e.target.checked === false && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystem) === false) {
            setDe('');
            setCheckSystem({ ...checkSystem, SYSC: false });
        }
    }

    const handlePara = (sys, e) => {
        if (sys === "SYSA" && e.target.checked && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystemPara) === false) {
            setPara(systemAToken);
            setCheckSystemPara((prev) => {
                const x = {
                    ...prev,
                    SYSA: true
                }
                return x;
            });
        } else if (sys === "SYSA" && e.target.checked === false && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystemPara) === false) {
            setCheckSystemPara((prev) => {
                const x = {
                    ...prev,
                    SYSA: false
                }
                return x;
            });
            setPara('');
        }

        if (sys === "SYSB" && e.target.checked && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystemPara) === false) {
            setPara(systemBToken);
            setCheckSystemPara({ ...checkSystemPara, SYSB: true });
        } else if (sys === "SYSB" && e.target.checked === false && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystemPara) === false) {
            setPara('');
            setCheckSystemPara({ ...checkSystemPara, SYSB: false });
        }

        if (sys === "SYSC" && e.target.checked && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystemPara) === false) {
            setPara(systemCToken);
            setCheckSystemPara({ ...checkSystemPara, SYSC: true });
        } else if (sys === "SYSC" && e.target.checked === false && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystemPara) === false) {
            setPara('');
            setCheckSystemPara({ ...checkSystemPara, SYSC: false });
        }
    }

    useEffect(() => {
        getSystemTokens()
    }, []);

    return (
        <div className="order-main">
            <div className="upper-order">
                <div className="wraper">
                    <div className='orders-title'>DIGITE OS NUMEROS DOS PEDIDOS QUE DESEJA ADICIONAR</div>
                    <div className="orders">
                        {orders.map((x, index) => {
                            return (
                                <span key={index}> {x}</span>
                            )
                        })}
                    </div>
                    <div className="order-footer">
                        <input type='number' className='order-input' value={value} onChange={(e) => setValue(Number(e.target.value))} />
                        <div className='order-btn' onClick={() => pushToOrders()}>ADICIONAR</div>
                        <div className='order-btn' onClick={() => setOrders([])}>LIMPAR</div>
                    </div>
                </div>
            </div>
            <div className="lower-order">

                <div className="lower-wraper">
                    <div className='row'>
                        <div className='orders-title'>Enviar de:</div>
                        <div className='systems'>
                            <div className='system-wraper'>
                                <span className='system-icon'>{process.env.REACT_APP_SYSTEM_A_NAME}</span>
                                <input onChange={(e) => handleDe('SYSA', e)} disabled={checkIfThereIsAnyOtherBesidesMeChecked("SYSA", checkSystem)} type="checkbox" />
                                <span className='system-icon'>{process.env.REACT_APP_SYSTEM_B_NAME}</span>
                                <input onChange={(e) => handleDe('SYSB', e)} disabled={checkIfThereIsAnyOtherBesidesMeChecked("SYSB", checkSystem)} type="checkbox" />
                                <span className='system-icon'>{process.env.REACT_APP_SYSTEM_C_NAME}</span>
                                <input onChange={(e) => handleDe('SYSC', e)} disabled={checkIfThereIsAnyOtherBesidesMeChecked("SYSC", checkSystem)} type="checkbox" />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='orders-title'>Enviar para:</div>
                        <div className='systems'>
                            <div className='system-wraper'>
                                <span className='system-icon'>{process.env.REACT_APP_SYSTEM_A_NAME}</span>
                                <input onChange={(e) => handlePara('SYSA', e)} disabled={checkIfThereIsAnyOtherBesidesMeChecked("SYSA", checkSystemPara)} type="checkbox" />
                                <span className='system-icon'>{process.env.REACT_APP_SYSTEM_B_NAME}</span>
                                <input onChange={(e) => handlePara('SYSB', e)} disabled={checkIfThereIsAnyOtherBesidesMeChecked("SYSB", checkSystemPara)} type="checkbox" />
                                <span className='system-icon'>{process.env.REACT_APP_SYSTEM_C_NAME}</span>
                                <input onChange={(e) => handlePara('SYSC', e)} disabled={checkIfThereIsAnyOtherBesidesMeChecked("SYSC", checkSystemPara)} type="checkbox" />
                            </div>
                        </div>
                    </div>


                    <div className="order-footer">
                        <div className='order-btn' onClick={() => makeRequest()}>ENVIAR</div>
                    </div>
                </div>
            </div>

        </div>
    );

}