import { useEffect, useState } from "react"
import sportFacade from "../facades/sportFacade"

export default function Sports() {
    const [allSports, setAllSports] = useState([]);

    useEffect(() => {
        sportFacade.getAllSports()
        .then(sports => setAllSports([...sports]))
    }, [])
return (
    <div>
        {allSports.length === 0 ? (
            <div>
                <br /><br />
                <h1>Loading...</h1>
            </div>
        ) : (
        <div className="container" style={{backgroundColor: "white"}}>
            <br />
            <h1>Sports</h1>
            <br />
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
        )}
    </div>
)
}