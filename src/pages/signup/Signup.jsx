import React, {useState, useEffect} from 'react';
import {Badge} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'


const Signup = () => {
    const[firstname, setFirstname] = useState('');
    const[lastname, setLastname] = useState('');
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('');
    const[errors, setErrors] = useState([]);
    const [userExist, setUserExist] = useState(false);

    const nav = useNavigate();


    let handleRegister = async () => {
        const user = await fetch('http://192.168.1.105:3000/api/users/', {
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `firstname=${firstname}&lastname=${lastname}&email=${email}&password=${password}`
        })
        const userUp = await user.json();
        console.log(userUp)

        userUp ? setUserExist(true) : setErrors(userUp.error)
    }

    useEffect(()=> {
        if(userExist) {
                return nav("/")
            }
        }, [nav, userExist])
    return (
        <>
            <div className="row">
                <div className="col-md-6 mx-auto m-5">
                    <h1 className='text-center mb-5'>Créez votre compte 🗝️</h1>
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="firstname">Prénom 📛</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="firstname" 
                                    name="firstname"  
                                    placeholder="Prénom"
                                    onChange={(e)=>setFirstname(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="lastname">Nom 📛</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="lastname" 
                                    name="lastname" 
                                    placeholder="Nom"
                                    onChange={(e)=>setLastname(e.target.value)}
                                    />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="email">Adresse mail 📧</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                placeholder="Adresse mail" 
                                autoComplete='username'
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="password">Mot de passe 🔐</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                name="password" 
                                placeholder="Mot de passe" 
                                autoComplete='current-password'
                                onChange={(e)=>setPassword(e.target.value)}
                                />
                        </div>
                        <div className="d-grid gap-2">
                            <button  style={{borderRadius: 50}} type="submit" className="btn btn-success mt-5" onClick={(e)=>handleRegister(e.preventDefault())}>Créer le compte</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;