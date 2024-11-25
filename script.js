// Progress Bars
const aliceProBar = document.getElementById('progress-alice');
const bobProBar = document.getElementById('progress-bob');
const charlieProBar = document.getElementById('progress-charlie');

// Vote Buttons
const voteAlice = document.getElementById('vote1');
const voteBob = document.getElementById('vote2');
const voteCharlie = document.getElementById('vote3');

// Reset
const resetBtn = document.getElementById('reset');

const candidates = [
    { name: "Alice", votes: 0 },
    { name: "Bob", votes: 0 },
    { name: "Charlie", votes: 0 }
];

// Tracks the Progress of votes
const updateProgressBars = () => {
    const maxVotes = 10;

    // Calculates the percentage of votes and updates progress bar width
    candidates.forEach(candidate => {
        const percentage = Math.min((candidate.votes / maxVotes) * 100, 100);

        if(candidate.name === "Alice") aliceProBar.style.width = `${percentage}%`;
        if(candidate.name === "Bob") bobProBar.style.width = `${percentage}%`;
        if(candidate.name === "Charlie") charlieProBar.style.width = `${percentage}%`;
    });
};

// Updates the leaderboard based on leading votes 
const updateLeaderboard = () => {
    candidates.sort((a, b) => b.votes - a.votes);

    // Implements the name of candidates, the amount of votes and their progess bar
    leaderboard.innerHTML = candidates
        .map(candidate => 
            `<div>
                <p>${candidate.name}: ${candidate.votes}</p>
                <div style="width: 100%; background: #eee; height: 20px; border-radius: 10px; margin-top: 5px;">

                    <div style="width: ${candidate.name === "Alice" ? aliceProBar.style.width : candidate.name === "Bob" ? bobProBar.style.width : charlieProBar.style.width};
                    background: ${candidate.name === "Alice" ? "#4caf50" : candidate.name === "Bob" ? "#2b16a1" : "#944612"}; 
                    height: 100%; border-radius: 10px;"></div>
                </div>
            </div>`)
        .join('');
};

// Declares a winner
const declareWinner = () => {
    updateProgressBars();
    updateLeaderboard();

    // Check if any candidate has reached 10 votes
    const winningCandidate = candidates.find(candidate => candidate.votes === 10);

    if(winningCandidate) {
        alert(`${winningCandidate.name} won the vote!`);
        
        voteAlice.disabled = true;
        voteBob.disabled = true;
        voteCharlie.disabled = true;

        console.log(`Vote Over. ${winningCandidate.name} Won.`)
    }
};

voteAlice.addEventListener('click', () => {
    candidates[0].votes++;
    declareWinner();
});

voteBob.addEventListener('click', () => {
    candidates[1].votes++;
    declareWinner();
});

voteCharlie.addEventListener('click', () => {
    candidates[2].votes++;
    declareWinner();
});

resetBtn.addEventListener('click', () => {
    candidates.forEach(candidate => candidate.votes = 0);

    aliceProBar.style.width = '0%';
    bobProBar.style.width = '0%';
    charlieProBar.style.width = '0%';

    voteAlice.disabled = false;
    voteBob.disabled = false;
    voteCharlie.disabled = false;

    updateLeaderboard();
});