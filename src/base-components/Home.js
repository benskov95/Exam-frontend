import { API_URL } from "../utils/settings";

export let URL = API_URL;

export default function Home() {

  return (
    <div>
      <h1>Welcome to the sport club!</h1>
      <p>Log in or register to become a player or coach and join teams!</p>
      <img src="https://www.adexchanger.com/wp-content/uploads/2020/04/sports-marketing-1.jpg"></img>
    </div>
  );
}
