import joke from "./generate_joke";
import './styles/main.scss';
import logo from './assets/Linewize_byqoria_colour.png';

const logoImg = document.getElementById("logoImg")
logoImg.src=logo

console.log(joke());