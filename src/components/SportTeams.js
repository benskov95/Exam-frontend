import { useEffect, useState } from "react";
import sportFacade from "../facades/sportFacade";

export default function SportTeams({roles}) {
    const [allSportTeams, setAllSportTeams] = useState([]);
    console.log(allSportTeams)

    useEffect(() => {
        sportFacade.getAllSportTeams()
        .then(sportTeams => setAllSportTeams([...sportTeams]));
    }, [])

    return (
        <div>
            <br />
            <h1>Sport Teams</h1>
            <br />
            <div className="container" style={{backgroundColor: "white"}}>
            <table className="table table-bordered">
                <thead className="thead thead-dark">
                    <tr>
                    <th>Team name</th>
                    <th>Sport</th>
                    <th>Description</th>
                    <th>Price per year</th>
                    <th>Minimum age</th>
                    <th>Maximum age</th>
                    <th>Number of players</th>
                    <th>Number of coaches</th>
                    </tr>
                </thead>
            <tbody>
            {allSportTeams.map(sportTeam => {
                return (
                    <tr key={sportTeam.id}>
                        <td>{sportTeam.teamName}</td>
                        <td>{sportTeam.sport.name}</td>
                        <td>{sportTeam.description}</td>
                        <td>{sportTeam.pricePerYear} DKK</td>
                        <td>{sportTeam.minAge}</td>
                        <td>{sportTeam.maxAge}</td>
                        <td>{sportTeam.players.length}</td>
                        <td>{sportTeam.coaches.length}</td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            </div>
        </div>
    )
}