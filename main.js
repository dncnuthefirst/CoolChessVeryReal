var abChess = {};
var config = {
    clickable: false,
    draggable: false
};
var gamePGN = document.getElementById("game-code");
var promotions = ["b", "n", "q", "r"];
abChess = new AbChess("chessboard", config);
abChess.setFEN();

function chooseRandom(array) {
    var random = Math.floor(Math.random() * array.length);
    return array[random];
}

function playRandomMove(index) {
    var legalMoves = abChess.getLegalMoves(index);
    var move = chooseRandom(legalMoves);
    var promotion = chooseRandom(promotions);
    abChess.play(move.start, move.end, promotion);
    index += 1;
    if (abChess.is50Moves(index) ||
        abChess.isCheckmate(index) ||
        abChess.isInsufficientMaterial(index) ||
        abChess.isStalemate(index)) {
        document.getElementById("Hmm").textContent = "GGs. Refresh to try again i guess"
        return;
    }
    timeout = setTimeout(function () {
        playRandomMove(index);
    }, 300);
}

setTimeout(function () {
    playRandomMove(0);
}, 3000);