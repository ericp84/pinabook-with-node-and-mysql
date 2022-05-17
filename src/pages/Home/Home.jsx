import React, {useState, useEffect} from 'react';
import {Card} from 'react-bootstrap';
import {connect} from 'react-redux';

const Home = (props) => {
    const [Pins, setPins] = useState([]);
    const [id, setId] = useState()

    let moncul = sessionStorage.getItem("username")
    
    useEffect(()=> {
        const pini = async() => {
            const pinstart = await fetch ('http://192.168.1.105:3000/api/pins')
            const displayPins = await pinstart.json();
            setPins(displayPins);
        }
        pini()
    }, [])

    let pin;
    Pins.length === 0 ? pin = <div className="col-md-6 mx-auto text-center"><p>pas de pins à afficher</p></div> : pin = Pins.map(p => {
        return (
        <Card className="rounded shadow p-3 bg-light rounded" style={{ width: '15rem', margin: 25 }} key={p.id}>
            <Card.Img variant="top" src={p.imageName}  style={{borderBottomRightRadius: "0.25rem", borderBottomLeftRadius: "0.25rem"}}/>
            <Card.Body style={{display: "flex", flexDirection: "column"}}>
            <Card.Title  className='text-truncate' style={{marginLeft: 5}}>{p.title}</Card.Title>
            <Card.Text className='text-muted text-truncate' style={{marginLeft: 5}}>{p.description}</Card.Text>
            <a className="btn btn-success" href={`/pins/${id}`} onClick={()=>{
                setId(p._id)
                // props.addPins(p)
                }}>voir</a>
            </Card.Body>
        </Card>
        )
    })

    return (
        <>
            <h1 className='text-center m-5'>Découvrez les meilleurs pins du monde {moncul} ! 🌎</h1>
                <div className="row">
                    <div className="col-md-8 d-flex justify-content-center w-100 mt-5 flex-wrap">
                        {pin}
                    </div>
                </div>
        </>
    );
};
function mapStateToProps(state) {
    return {
        token: state.token
    }
}
export default connect(
    mapStateToProps,
    null
) (Home);