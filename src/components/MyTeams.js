import { useEffect, useState } from "react";
import sportFacade from "../facades/sportFacade";

export default function MyTeams({roles}) {
    const [player, setPlayer] = useState({});
    const [coach, setCoach] = useState({});
    console.log(player);

    useEffect(() => {
        if(roles.includes("player")) {
            sportFacade.getPlayerByUsername(localStorage.getItem("user"))
            .then(playerFromDb => setPlayer({...playerFromDb}));
        } else if(roles.includes("coach")) {
            sportFacade.getCoachByUsername(localStorage.getItem("user"))
            .then(coachFromDb => setCoach({...coachFromDb}));
        }
    }, [])

    return (
    <div>
        <h1>My Teams</h1>
        <div className="container">
        {typeof player.name !== "undefined" && (
            <div>
                <h3>About you</h3>
                <table className="table table-bordered" style={{marginBottom: "50px"}}>
                <thead className="thead thead-dark">
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Age</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                        <td>{player.id}</td>
                        <td>{player.name}</td>
                        <td>{player.email}</td>
                        <td>{player.phone}</td>
                        <td>{player.age}</td>
                        </tr>
                    </tbody>
                </table>

                <h3>The teams you are playing for</h3>
                <table className="table table-bordered">
                <thead className="thead thead-dark">
                    <tr>
                    <th>Has paid fee</th>
                    <th>Date joined</th>
                    <th>Team name</th>
                    </tr>
                </thead>
                    <tbody>
                        {player.memberInfoDTOs.map(memberInfo => {
                            return (
                                <tr key={memberInfo.sportTeamName}>
                                    <td>{memberInfo.paid.toString()}</td>
                                    <td>{memberInfo.dateJoined}</td>
                                    <td>{memberInfo.sportTeamName}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )}
        {typeof coach.name !== "undefined" && (
            <div>
                <h3>About you</h3>
                <table className="table table-bordered" style={{marginBottom: "50px"}}>
                <thead className="thead thead-dark">
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                        <td>{coach.id}</td>
                        <td>{coach.name}</td>
                        <td>{coach.email}</td>
                        <td>{coach.phone}</td>
                        </tr>
                    </tbody>
                </table>

                <h3>The teams you are coaching</h3>
                <table className="table table-bordered">
                <thead className="thead thead-dark">
                    <tr>
                    <th>Sport</th>
                    <th>Team name</th>
                    <th>Description</th>
                    <th>Price per year</th>
                    <th>Minimum age</th>
                    <th>Maximum age</th>
                    </tr>
                </thead>
                    <tbody>
                        {coach.sportTeams.map(sportTeam => {
                            return (
                                <tr key={sportTeam.id}>
                                <td>{sportTeam.sport.name}</td>
                                <td>{sportTeam.teamName}</td>
                                <td>{sportTeam.description}</td>
                                <td>{sportTeam.pricePerYear} DKK</td>
                                <td>{sportTeam.minAge}</td>
                                <td>{sportTeam.maxAge}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )}
        </div>
    </div>
    );
}