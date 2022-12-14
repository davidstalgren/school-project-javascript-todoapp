import './style/style.scss';

/* // All kod härifrån och ner är bara ett exempel för att komma igång

// I denna utils-fil har vi lagrat funktioner som ofta används, t.ex. en "blanda array"-funktion
import { shuffle } from './utils';

// I denna fil har vi lagrat vår "data", i detta exempel en ofullständig kortlek
import exampleCardDeck from './exampleArray';
 */

const headerDate = document.querySelector('#headerDate');
const headerWeek = document.querySelector('#headerWeek');
let now = new Date()
let day = now.getDate();
let month = now.getMonth() + 1;
let year = now.getFullYear();
let week = getWeek(now)
let today = day + '/' + month + ' - ' + year;

function getWeek(date) {
    let startDate = new Date(date.getFullYear(), 0, 1);
    let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    let weekNumber = Math.ceil(days / 7);
    return weekNumber;
  }

headerDate.innerHTML = today;
headerWeek.innerHTML = 'Week ' + week;

console.log(week)
