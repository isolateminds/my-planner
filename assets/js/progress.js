(() => {
    var quotes = [
        "I have full confidence in myself and my abilities.",
        "No obstacle is too big or too difficult for me",
        "I am committed to improving myself and I am getting better daily.",
        "Today is a new day and it brings with it a new set of opportunities for me to act on."
    ];
    var twoSeconds = 2000;
    var quote = document.getElementById("loading-quotes");
    quote.innerText = randomQuote(quotes);
    setInterval(() => {
        quote.innerText = randomQuote(quotes);
      
    }, twoSeconds);

})();

function randomQuote(quotes) {
    var rand = Math.floor(Math.random() * quotes.length);
    return quotes[rand];
}