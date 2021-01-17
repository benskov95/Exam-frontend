import { URL } from "../base-components/Home";
import apiFacade, { handleHttpErrors } from "./apiFacade";

const sportFacade = () => {

    const getAllSports = () => {
        return fetch(URL + "/api/sport", 
        apiFacade.makeOptions("GET"))
        .then(handleHttpErrors);
    }

    const addSport = (sport) => {
        return fetch(URL + "/api/sport", 
        apiFacade.makeOptions("POST", true, sport))
        .then(handleHttpErrors);
    }

    const getAllSportTeams = () => {
        return fetch(URL + "/api/sport/team", 
        apiFacade.makeOptions("GET"))
        .then(handleHttpErrors);
    }

    const addSportTeam = (sportTeam) => {
        return fetch(URL + "/api/sport/team", 
        apiFacade.makeOptions("POST", true, sportTeam))
        .then(handleHttpErrors);
    }

    const editSportTeam = (sportTeam, id) => {
        return fetch(URL + `/api/sport/team/${id}`, 
        apiFacade.makeOptions("PUT", true, sportTeam))
        .then(handleHttpErrors);
    }

    const deleteSportTeam = (id) => {
        return fetch(URL + `api/sport/team/${id}`,
        apiFacade.makeOptions("DELETE", true))
        .then(handleHttpErrors);
    }

    const addPlayer = (player, username) => {
        return fetch(URL + `api/sport/player/${username}`, 
        apiFacade.makeOptions("POST", true, player))
        .then(handleHttpErrors);
    }

    const addPlayerToTeam = (player, teamId) => {
        return fetch(URL + `api/sport/team/${teamId}/player`, 
        apiFacade.makeOptions("POST", true, player))
        .then(handleHttpErrors)
    }

    const addCoach = (coach, username) => {
        return fetch(URL + `api/sport/coach/${username}`, 
        apiFacade.makeOptions("POST", true, coach))
        .then(handleHttpErrors);
    }

    const addCoachToTeam = (coach, teamId) => {
        return fetch(URL + `api/sport/team/${teamId}/coach`,
        apiFacade.makeOptions("POST", true, coach))
        .then(handleHttpErrors);
    }

    return {
        getAllSports,
        addSport,
        getAllSportTeams,
        addSportTeam,
        editSportTeam,
        deleteSportTeam,
        addPlayer,
        addPlayerToTeam,
        addCoach,
        addCoachToTeam
    }
}
  
  const facade = sportFacade();
  export default facade;