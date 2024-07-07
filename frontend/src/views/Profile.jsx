import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';
import Context from '../contexts/Context';

const Profile = () => {
    const navigate = useNavigate();
    const { getDeveloper, setDeveloper } = useContext(Context);

    const getDeveloperData = () => {
        const token = window.sessionStorage.getItem('token');
        axios.get(ENDPOINT.profile, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                setDeveloper(data);
            })
            .catch(({ response: { data } }) => {
                console.error(data);
                window.sessionStorage.removeItem('token');
                setDeveloper(null);
                navigate('/');
            });
    };

    useEffect(() => {
        getDeveloperData();
    }, []);

    return (
        <div className='py-5'>
            <h1>
                Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>
            </h1>
            <h3>
                {getDeveloper?.rol} en {getDeveloper?.lenguage}
            </h3>
        </div>
    );
};

export default Profile;
