import { useState } from "react";
import sportFacade from "../facades/sportFacade";
import { Modal } from "react-bootstrap";

export default function ChooseRole({roles}) {
    const [player, setPlayer] = useState({name: "", email: "", phone: "", age: 0});
    const [coach, setCoach] = useState({name: "", email: "", phone: ""});
    const [isOpen, setIsOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [isPlayer, setIsPlayer] = useState(false);
    let username = localStorage.getItem("user");
    
    const handleChange = (e) => {
        if (isPlayer) {
            setPlayer({...player, [e.target.id]: e.target.value});
        } else {
            setCoach({...coach, [e.target.id]: e.target.value});
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isPlayer) {
            sportFacade.addPlayer(player, username)
            .then(addedPlayer => {
                setMsg(`Congratulations, ${addedPlayer.name}. You're now registered as a player and can join teams! Please log out and back in again to update your account.`)
                setError("");
                setIsPlayer(false);
            })
            .catch((promise) => {
                if (promise.fullError) {
                    printError(promise, setError);
                } else {
                    setError("No response from API.")
                }
            })
        } else {
            sportFacade.addCoach(coach, username)
            .then(addedCoach => {
                setMsg(`Congratulations, ${addedCoach.name}. You're now registered as a coach and can join teams! Please log out and back in again to update your account.`)
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
    }

    const toggleModal = (e) => {
        if (typeof e !== "undefined") {
            if (e.target.id === "player") {
                setIsPlayer(true);
            } else {
                setIsPlayer(false);
            }
        }
        if (roles.includes("player") || roles.includes("coach")) {
            setError("You've already chosen your role!");
        } else {
            setIsOpen(!isOpen);
            setError("");
            setMsg("")
        }
    }

    return (
        <div>
            <h1>What do you want to be?</h1>
            <img style={{marginTop: "20px", marginBottom: "20px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB6oeyCE6R1BMge_T8XcnrD9dA7rox5wupxA&usqp=CAU" />
            <br />
            <p style={{color: "red"}}>{error}</p>
            <button 
            className="btn btn-danger"
            id="player" 
            style={{marginRight: "10px"}}
            onClick={toggleModal}>Player</button>
            <button 
            className="btn btn-danger"
            id="coach"
            onClick={toggleModal}>Coach</button>

<       Modal show={isOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter information about yourself</Modal.Title>
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
            <label>Email</label><br />
            <input
                id="email"
                onChange={handleChange}
            />
            <br />
            <label>Phone</label><br />
            <input
                id="phone"
                onChange={handleChange}
            />
            <br />
            {isPlayer && (
                <div>
                <label>Age</label><br />
                <input
                    id="age"
                    onChange={handleChange}
                />
                <br />
                </div>
            )}
            <br />
                
            <input
            type="submit"
            value="Confirm"
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