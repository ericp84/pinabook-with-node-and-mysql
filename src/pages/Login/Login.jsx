import React, {useEffect, useState} from 'react';
// import {Badge} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [errors, setErrors] = useState([]);
    const [userExist, setUserExist] = useState(false);


    const nav = useNavigate();

        const handleLogin = async () => {
            const user = await fetch ('http://192.168.1.105:3000/api/users/log', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `email=${email}&password=${password}`
            })

            const userIn = await user.json();
            console.log(userIn)
            if(userIn) {
                setUserExist(true)
                props.addToken(userIn.token)
                // sessionStorage.setItem("token", userIn.token) 
                // sessionStorage.setItem("username", userIn.firstname)
                // sessionStorage.setItem("date", userIn.registeredAt)
            }
        }
        useEffect(()=> {
        if(userExist) {
            return nav("/")
        }
        }, [nav, userExist])
    return (
        <>
        <h1 className='text-center mt-5'>Connectez vous 😀</h1>
        <div className="row">
            <div className="col-md-6 mx-auto m-5">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Adresse mail 📧</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email"  
                            placeholder="Adresse mail"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-5">
                        <label htmlFor="password">Mot de passe 🔐</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="password" 
                            placeholder="Mot de passe"
                            onChange={(e)=>setPassword(e.target.value)}
                            autoComplete="curent-password"
                        />
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="form-group mb-3 mt-3">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="remember_me" id="remember_me"/>
                                <label htmlFor="remember_me" className="form-check-label">Souvenez vous de moi</label>
                            </div>
                        </div>
                        <a href="/forgot-password">Mot de passe oublié ?</a>
                    </div>
                    <div className="d-grid gap-2">
                        <button  style={{borderRadius: 50}} type="submit" className="btn btn-primary mt-5" onClick={(e)=>handleLogin(e.preventDefault())} >Connexion</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};
function mapDispatchToProps(dispatch) {
    return {
    addToken: function(token) {dispatch({type: "addToken", token: token})}
}
}
export default connect(
    null, 
    mapDispatchToProps
)(Login);