const btn = document.querySelector('.btn-open');
const form = document.querySelector('.fact-form');
const factsList = document.querySelector('.facts-list');

require('dotenv').config();
const supabaseKey = process.env.SUPABASE_KEY;

const initialFacts = [
  {
    text: 'React is being developed by Meta (formerly facebook)',
    source: 'https://opensource.fb.com/',
    category: 'technology',
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2015,
  },
  {
    text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
    source: 'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
    category: 'technology',
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2015,
  }
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// Create DOM elements: Render facts in list
factsList.innerHTML = '';

loadFacts();
async function loadFacts() {
  const res = await fetch('https://iiiudsurjuqeoysyuiug.supabase.co/rest/v1/facts',
    {
      headers: {
        apikey: supabaseKey,
        authorization: `Bearer ${supabaseKey}`,
      }
    });

  const data = await res.json();
  createFactsList(data);
}

function createFactsList(dataArray) {
  const htmlArr = dataArray.map((fact) => `<li class="fact">
    <p>${fact.text}
      <a class="source" href="${fact.source}" target="_blank">(Source)</a>
    </p>
    <span class="tag" style="background-color: ${CATEGORIES.find((cat) => cat.name === fact.category).color}">${fact.category}</span>
    <div class="vote-buttons">
      <button>👍 ${fact.votesInteresting}</button>
      <button>🤯 ${fact.votesMindblowing}</button>
      <button>⛔️ ${fact.votesFalse}</button>
    </div>
  </li>`);

  const html = htmlArr.join('');
  factsList.insertAdjacentHTML('afterbegin', html);
}

// Toggle form visibility
btn.addEventListener('click', function () {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden');
    btn.textContent = 'Close';
  } else {
    form.classList.add('hidden');
    btn.textContent = 'Share a fact';
  }
});

let votesInteresting = 23;
let votesMindblowing = 5;
const text = 'Lisbon is the capital of Portugal';