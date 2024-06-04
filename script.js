const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const sameTagBtn = document.getElementById('same-tag');
const sameAuthorBtn = document.getElementById('same-author');
const loader = document.getElementById('loader');
const themeSwitchWrapper = document.getElementById('theme-switch-wrapper');

let apiQuotes = [];
let currentQuote = {};

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    themeSwitchWrapper.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
    themeSwitchWrapper.hidden = false;

}

// Get new quote by same author
function newQuoteSameAuthor(){
    // creates new array of quotes, matching author to current author
    const filteredQuoteArray = apiQuotes.filter(item => item.author === currentQuote.author);
    selectRandomQuote(filteredQuoteArray);
}

// Get new quote with same tag
function newQuoteSameTag() {
    // creates new array of quotes, matching tag to current tag
    const filteredQuoteArray = apiQuotes.filter(item => item.tag === currentQuote.tag);
    selectRandomQuote(filteredQuoteArray);
}

// FUTURE: save quotes in local array
function saveQuote() {}

// Selects New Quote and Updates DOM
function selectRandomQuote(filteredQuoteArray = []) {
    showLoadingSpinner();
    let quotePosition;
    let quote;

    // check to see if a filtered array is passed to select a quote with the same author or tag
    if (filteredQuoteArray.length !== 0 ) {
        quotePosition = Math.floor(Math.random() * filteredQuoteArray.length);
        quote = filteredQuoteArray[quotePosition];
    } else {
        quotePosition = Math.floor(Math.random() * apiQuotes.length);
        quote = apiQuotes[quotePosition];
    }

    
    // Check if author field is blank and replace it with 'Unknown' if so
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote')
    }

    // Set quote, hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
    
    currentQuote = quote;
}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        // response won't be populated until fetch is complete; that's what 'await' does
        const response = await fetch(apiUrl);
        // global variable
        apiQuotes = await response.json();
        selectRandomQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    // use `` to pass variable into url
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', () => selectRandomQuote());
sameTagBtn.addEventListener('click', newQuoteSameTag);
sameAuthorBtn.addEventListener('click', newQuoteSameAuthor);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();