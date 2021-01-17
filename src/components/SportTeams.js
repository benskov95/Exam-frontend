import { useEffect, useState } from "react";
import sportFacade from "../facades/sportFacade";
import { Modal } from "react-bootstrap";

export default function SportTeams({roles}) {
    const [allSportTeams, setAllSportTeams] = useState([]);
    const [allSports, setAllSports] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    let initialState =   
    {sportId: 0, teamName: "", description: "", 
    pricePerYear: "", minAge: "", maxAge: "", players: [], 
    coaches: []}
    const [sportTeam, setSportTeam] = useState(initialState);

    useEffect(() => {
        sportFacade.getAllSportTeams()
        .then(sportTeams => setAllSportTeams([...sportTeams]));
        sportFacade.getAllSports()
        .then(sports => setAllSports([...sports]));
    }, [msg])

    const handleChange = (e) => {
        setSportTeam({ ...sportTeam, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let team = {...sportTeam};
        delete team.sportId;
        team["sport"] = {id: parseInt(sportTeam.sportId)};
        team.pricePerYear = parseFloat(team.pricePerYear);
        
        if (!isEdit) {
        sportFacade.addSportTeam(team)
        .then(addedSportTeam => {
            setMsg(addedSportTeam.teamName + " has been added to the database.")
            setError("");
        })
        .catch((promise) => {
            if (promise.fullError) {
                printError(promise, setError);
            } else {
                setError("No response from API.")
            }
        })
    } else {
        if (typeof sportTeam.sportId === "undefined") {
            team.sport.id = sportTeam.sport.id;
        } else {
            team.sport.id = parseInt(sportTeam.sportId);
        }
        sportFacade.editSportTeam(team, parseInt(team.id))
        .then(editedTeam => {
            setMsg(editedTeam.teamName + " has been edited.")
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
        setError("");
        setMsg("")
        setIsOpen(!isOpen);
        if (typeof e !== "undefined" && e.target.id === "add") {
            setIsEdit(false);
            setSportTeam({...initialState});
        }
    }

    const deleteTeam = (e) => {
        e.preventDefault();
        sportFacade.deleteSportTeam(parseInt(e.target.id))
        .then(deletedTeam => setMsg(`${deletedTeam.teamName} has been deleted.`))
        .catch((promise) => {
            if (promise.fullError) {
                printError(promise, setError);
            } else {
                setError("No response from API.")
            }
        })
        setTimeout(() => {
            setMsg("");
        }, 8000);
    }

    const editTeam = (e) => {
        setIsEdit(true);
        toggleModal();

        sportFacade.getSportTeamById(parseInt(e.target.id))
        .then(team => setSportTeam({...team}))
    }

    return (
        <div>
            <br />
            <h1>Sport Teams</h1>
            <br />
            {roles.includes("admin") && (
                <div>
                <button className="btn btn-danger" id="add" onClick={toggleModal}>
                    Add sport team
                </button>
                <br /><br />
                </div>
            )}
            <p style={{color: "green"}}>{msg}</p>
            <div className="container" style={{backgroundColor: "white"}}>
            <table className="table table-bordered">
                <thead className="thead thead-dark">
                    <tr>
                    <th>Sport</th>
                    <th>Team name</th>
                    <th>Description</th>
                    <th>Price per year</th>
                    <th>Minimum age</th>
                    <th>Maximum age</th>
                    <th>Number of players</th>
                    <th>Number of coaches</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
            <tbody>
            {allSportTeams.map(sportTeam => {
                return (
                    <tr key={sportTeam.id}>
                        <td>{sportTeam.sport.name}</td>
                        <td>{sportTeam.teamName}</td>
                        <td>{sportTeam.description}</td>
                        <td>{sportTeam.pricePerYear} DKK</td>
                        <td>{sportTeam.minAge}</td>
                        <td>{sportTeam.maxAge}</td>
                        <td>{sportTeam.players.length}</td>
                        <td>{sportTeam.coaches.length}</td>
                        <td>{roles.includes("admin") ? 
                        (<button 
                        className="btn btn-danger" 
                        onClick={deleteTeam} 
                        id={sportTeam.id}>Delete</button>) : ""}
                        </td>
                        <td>{roles.includes("admin") ?
                         (<button 
                         className="btn btn-danger"
                         onClick={editTeam}
                         id={sportTeam.id}>Edit</button>) : ""}
                        </td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            </div>

        <Modal show={isOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit a sport team" : "Add a sport"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style={{textAlign: "center"}}>
            <form onSubmit={handleSubmit}>

            <label>{isEdit ? 
            `Select a sport (current: )` 
            : "Select a sport"}
            </label><br />
            <select 
            onChange={handleChange}
            id="sportId"
            className="form-control" 
            style={{width: "210px", marginLeft: "130px"}}> 
                {allSports.map(sport => {
                    return (
                        <option 
                        key={sport.id}
                        value={sport.id}
                        >
                            {sport.name}
                        </option>
                    )
                })}
            </select>
            <br />

            <label>Team name</label><br />
            <input
                id="teamName"
                value={sportTeam.teamName}
                onChange={handleChange}
            />
            <br />
            <label>Description</label><br />
            <input
                id="description"
                value={sportTeam.description}
                onChange={handleChange}
            />
            <br />
            <label>Price per year</label><br />
            <input
                id="pricePerYear"
                value={sportTeam.pricePerYear}
                onChange={handleChange}
            />
            <br />
            <label>Minimum age</label><br />
            <input
                id="minAge"
                value={sportTeam.minAge}
                onChange={handleChange}
            />
            <br />
            <label>Maximum age</label><br />
            <input
                id="maxAge"
                value={sportTeam.maxAge}
                onChange={handleChange}
            />
            <br />
            <br />
                
            <input
            type="submit"
            value={isEdit ? "Edit" : "Add"}
            className="btn btn-danger">
            </input>
            </form>

            <br />
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