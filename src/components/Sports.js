import { useEffect, useState } from "react";
import sportFacade from "../facades/sportFacade";
import { Modal } from "react-bootstrap";

export default function Sports({roles}) {
    const [allSports, setAllSports] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [sport, setSport] = useState({name: "", description: ""});

    useEffect(() => {
        sportFacade.getAllSports()
        .then(sports => setAllSports([...sports]));
    }, [msg])

    const handleChange = (e) => {
        setSport({ ...sport, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sportFacade.addSport(sport)
        .then(addedSport => {
            setMsg(addedSport.name + " has been added to the database.")
            setError("");
        })
        .catch((promise) => {
            if (promise.fullError) {
                printError(promise, setError);
            } else {
                setError("No response from API.")
            }
        })
    }

    const toggleModal = () => {
        setError("");
        setMsg("")
        setIsOpen(!isOpen);
    }

    return (
    <div>
        <div className="container" style={{backgroundColor: "white"}}>
            <br />
            <h1>Sports</h1>
            <br />
            {roles.includes("admin") && (
                <div>
                    <button className="btn btn-danger" onClick={toggleModal}>
                        Add sport
                    </button>
                    <br /><br />
                </div>
            )}
            <table className="table table-bordered">
                <thead className="thead thead-dark">
                    <tr>
                    <th>Sport</th>
                    <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {allSports.map(sport => {
                        return (
                            <tr key={sport.id}>
                                <td>{sport.name}</td>
                                <td>{sport.description}</td>
                            </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>

        <Modal show={isOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a sport</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style={{textAlign: "center"}}>
            <form onSubmit={handleSubmit}>

            <label>Name</label><br />
            <input
                id="name"
                onChange={handleChange}
            />
            <br />
            <label>Description</label><br />
            <input
                id="description"
                onChange={handleChange}
            />
            <br />
            <br />
                
            <input
            type="submit"
            value="Add"
            className="btn btn-danger">
            </input>
            </form>

            <p style={{color : "green"}}>{msg}</p>
            <p style={{color: "red"}}>{error}</p>
            </div>
        </Modal.Body>
        </Modal>
    </div>
)
}

const printError = (promise, setError) => {
    promise.fullError.then(function (status) {
      setError(`${status.message}`);
    });
  };