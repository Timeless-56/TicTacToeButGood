// This is the mind of the website. DO NOT CHANGE UNLESS YOU KNOW WHAT YOU ARE DOING! 
// timeless5694@gmail.com 
let game = {
    Position: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    Board: ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    AltBoard: ['0', '1', '2', '3', '4', '5', '6', "7", "8"],
    Movelist: [],
    AvailableMoves: [0, 1, 2, 3, 4, 5, 6, 7, 8]
}
let Gamestate = 1;
let ComputerPlay;
let attacker = 0;
let logg = []
const transla = [null, "X", "O"]
let randv;
let Alt = 0
let switchB = function() {
    document.querySelector("#switchInfo").innerHTML = "";
    if (Alt === 0)
        Alt = 1
    else
        Alt = 0
    draw()
}
let PlayR = function() {
    randv = game.Movelist.length
    while(randv === game.Movelist.length)
        play(game.AvailableMoves[Math.floor(Math.random() * (game.AvailableMoves.length + 1))])
}
let play = function(gg){
    if (game.Board[gg] === '  ') {
        game.Position[gg] = Gamestate;
        game.Movelist[game.Movelist.length] = gg;
        if (Gamestate === 1) {
            game.Board[gg] = "X";
            game.AltBoard[gg] = "X";}
        else if (Gamestate === 2) {
            game.Board[gg] = "O";
            game.AltBoard[gg] = "O"}
        winch(Gamestate)
        console.log(game.Movelist.toString() +" - "+game.Position + " - "+ Gamestate.toString() + " - !" + threat(Gamestate))
        logg[logg.length] = (game.Movelist.toString() +" - "+game.Position + " - "+ Gamestate.toString() + " - !" + threat(Gamestate))
        if (!(typeof Gamestate === "string")){
            if (Gamestate === 1)
                Gamestate = 2;
            else if (Gamestate === 2)
                Gamestate = 1;
        }
        draw()
        console.log(Gamestate)
        ComputerFunction()
    }
}
let setComputer = function(ccc){
    ComputerPlay = ccc
    ComputerFunction()
}
let hello = function(deletev){
    if (deletev === "rue") {
        Alt = 0
        draw()
        if (Gamestate !== "undefined")
            document.getElementById("inputid").innerHTML = `${transla[Gamestate.charAt(3)]} WINS!<br><input type="button" onclick="location.reload()" value="Play Again">`;
        else 
            document.getElementById("inputid").innerHTML = 'Draw<br><input type="button" onclick="location.reload()" value="Play Again">';
    }
    if (deletev === "comp"){
        document.querySelector("#computer").innerHTML = ""
    }
}
// used for impossible bot
let threat = function(attacker){
    if (game.Position[4] === attacker) 
        for (let i = 0; i < 9; i++){
            if (game.Position[0 + i] === attacker && game.Position[8 - i] === 0) 
                return 8 - i;
        }
    if (game.Position[0] === attacker) {
        if (game.Position[2] === attacker && game.Position[1] === 0)
            return 1
        else if (game.Position[1] === attacker && game.Position[2] === 0)
            return 2
        else if (game.Position[3] === attacker && game.Position[6] === 0)
            return 6
        else if (game.Position[6] === attacker && game.Position[3] === 0)
            return 3
        else if (game.Position[8] === attacker && game.Position[4] === 0)
            return 4
    }
    if (game.Position[8] === attacker){
        if (game.Position[2] === attacker && game.Position[5] === 0)
            return 5
        else if (game.Position[5] === attacker && game.Position[2] === 0)
            return 2
        else if (game.Position[6] === attacker && game.Position[7] === 0)
            return 7
        else if (game.Position[7] === attacker && game.Position[6] === 0)
            return 6
    }
    if (game.Position[2] === attacker) {
        if (game.Position[1] === attacker && game.Position[0] === 0)
            return 0
        else if (game.Position[5] === attacker && game.Position[8] === 0)
            return 8
        else if (game.Position[6] === attacker && game.Position[4] === 0)
            return 4
    }
    if (game.Position[6] === attacker){
        if (game.Position[3] === attacker && game.Position[0] === 0)
            return 0
        else if (game.Position[7] === attacker && game.Position[8])
            return 8
    }
    return null
}
let winch = function(win) {
    if (game.Position[4] === win){
        for (i=0;i<4;i++) {
            if (game.Position[0+i] === win && game.Position[8-i] === win)
                Gamestate = "win" + win
        }
    }
    if (game.Position[0] === win) {
        if (game.Position[1] === win && game.Position[2] === win) 
            Gamestate = "win" + win
        else if (game.Position[3] === win && game.Position[6] === win)
            Gamestate = "win" + win
    }
    if (game.Position[8] === win) {
        if (game.Position[6] === win && game.Position[7] === win)
            Gamestate = "win" + win
        if (game.Position[5] === win && game.Position[2] === win)
            Gamestate = "win" + win
    }
    if (game.Movelist.length === 9 && !(typeof Gamestate === "string"))
        Gamestate = "undefined"
    if (typeof Gamestate === "string"){
        hello("rue")
        hello("comp")
    }
}
let draw = function(consolev) {
    if (consolev) {
        console.log(`${game.Board[0]}${game.Board[1]}${game.Board[2]}\n${game.Board[3]}${game.Board[4]}${game.Board[5]}\n${game.Board[6]}${game.Board[7]}${game.Board[8]}`)
    } else {
        document.getElementById("save").innerHTML = `${game.Movelist}`;
        // CANVAS DRAWING
        let canvas = document.querySelector('canvas')
        canvas.width = 306*BSC
        canvas.height = 306*BSC
        let c = canvas.getContext("2d")
        // #
        c.fillStyle = "white"
        c.fillRect(0, 0, 306*BSC, 306*BSC)
        c.fillStyle = "black"
        c.fillRect(0, 0, 98*BSC, 98*BSC)
        c.fillRect(104*BSC, 0, 98*BSC, 98*BSC)
        c.fillRect(208*BSC, 0, 98*BSC, 98*BSC)
        c.fillRect(0, 104*BSC, 98*BSC, 98*BSC)
        c.fillRect(104*BSC, 104*BSC, 98*BSC, 98*BSC)
        c.fillRect(208*BSC, 104*BSC, 98*BSC, 98*BSC)
        c.fillRect(0, 208*BSC, 98*BSC, 98*BSC)
        c.fillRect(104*BSC, 208*BSC, 98*BSC, 98*BSC)
        c.fillRect(208*BSC, 208*BSC, 98*BSC, 98*BSC)
        // Board
        let Animatei = (whone, x, y) => {
            if (whone) {
                c.beginPath()
                c.moveTo(x+15*BSC, y+15*BSC)
                c.lineTo(x+85*BSC, y+85*BSC)
                c.strokeStyle = "#ffffff"
                c.lineWidth = 10*BSC
                c.stroke()
                c.beginPath()
                c.moveTo(x+85*BSC, y+15*BSC)
                c.lineTo(x+15*BSC, y+85*BSC)
                c.strokeStyle = "#ffffff"
                c.stroke()
                c.lineWidth = 10*BSC
            }else {
                c.beginPath()
                c.arc(x+50*BSC, y+50*BSC, 35*BSC, 0, Math.PI*2)
                c.strokeStyle = "#ffffff"
                c.lineWidth = 10*BSC
                c.stroke()
            }
        }
        if (Alt === 0) {
            for(i = 0; i<3; i++) {
                for(j = 0; j<3; j++){
                    console.log(j+(i*3));
                    if (game.Position[j+(i*3)] === 1)
                        Animatei(true, j*103*BSC, i*103*BSC)
                    else if (game.Position[j+(i*3)] === 2)
                        Animatei(false, j*103*BSC, i*103*BSC)
                }
            }
        }else if(Alt === 1){
            for(i = 0; i<3; i++) {
                for(j = 0; j<3; j++){
                    console.log(j+(i*3));
                    if (game.Position[j+(i*3)] === 1)
                        Animatei(true, j*103*BSC, i*103*BSC)
                    else if (game.Position[j+(i*3)] === 2)
                        Animatei(false, j*103*BSC, i*103*BSC)
                    else {
                        let pixelmao = 50*BSC
                        c.fillStyle = "white"
                        c.font = `${pixelmao.toString()}px Arial`
                        c.fillText(`${game.AltBoard[j+(i*3)]}`, j*103*BSC+35*BSC, i*103*BSC+65*BSC)
                    }
                }
            }
        }
    }
}
let ComputerFunction = () => {
    if (Gamestate === 1) {
        if (ComputerPlay === 1) {
            // play the computer threat
            if (typeof threat(1) === "number"){ 
                play(threat(1)); return}
            else if (typeof threat(2) === "number") {
                play(threat(2)); return} // play the player threat
            if (game.AvailableMoves.length === 1){
                play(game.AvailableMoves[0]); return} // play the last avaiable move
            if (game.Movelist.length === 0){
                play(2); return} // first move
            else if (game.Movelist[1] !== 4) { // completely losing
                if (game.Movelist[1] === 5 || game.Movelist[1] === 8) {
                    if (game.Movelist.length === 2){
                        play(1); return}
                    else{
                        play(4); return}
                } else if (game.Movelist[1] === 0 || game.Movelist[1] === 1) {
                    if (game.Movelist.length === 2){
                        play(5); return}
                    else{
                        play(4); return}
                } else if (game.Movelist[1] === 6) {
                    if (game.Movelist.length === 2){
                        play(8); return}
                    else{
                        play(0); return} 
                    }else if (game.Movelist[1] === 3) {
                    play(8); return
                } else if (game.Movelist[1] === 7) {
                    play(0); return
                }
            }else { // the right move; 4
                if (game.Movelist.length === 2){
                    play(6); return}
                else
                    if (typeof threat(1) === "number") {
                       play(threat(1)) ; return}
                    else if (typeof threat(2) === "number"){
                        play(threat(2)); return}
            }
        }
    } else if (ComputerPlay === 2){
        if (Gamestate === 2) {
            if (typeof threat(2) === "number") {
                play(threat(2)); return}
            else if (typeof threat(1) === "number"){
                play(threat(1)); return} // play the player threat
            if (game.AvailableMoves.length === 1)
                play(game.AvailableMoves[0])
            if (game.Movelist.length === 1){
                if (game.Movelist[0] !== 4){
                    play(4); return}
                else{
                    play(2);return
                }
            }else{
                if (typeof threat(2) === "number") {
                    play(threat(2)); return
                }
                if (typeof threat(1) === "number") {
                    play(threat(1)); return}
                if (!(typeof threat(2) === "number" || typeof threat(1) === "number")){
                    PlayR(); return}
            }
            
        }
    }
}
let c = document.querySelector("canvas")
let mousex, mousey
function GETMOUSE(rerere) {
    let rect = c.getBoundingClientRect();
    mousex = rerere.clientX - rect.left;
    mousey = rerere.clientY - rect.top;
}
c.addEventListener("mousedown", function(e){GETMOUSE(e); ClickFunction()});
let ClickFunction = () => {
    if(mousex < 99*BSC){
        if (mousey<99*BSC){
            play(0)
        }else if(mousey>207*BSC){
            play(6)
        }else {
            play(3)
        }
    }else if(mousex > 207*BSC){
        if (mousey<99*BSC){
            play(2)
        }else if(mousey>207*BSC){
            play(8)
        }else {
            play(5)
        }
    }else{
        if (mousey<99*BSC){
            play(1)
        }else if(mousey>207*BSC){
            play(7)
        }else {
            play(4)
        }
    }
}//*/
let BS = document.querySelector("#slidervalue")
let BSC = 1;
document.querySelector("#slider").oninput = function(){
    BS.innerHTML = this.value
    BSC = BS.innerHTML/100
    console.log(BSC);
    draw()
}
ComputerFunction()
draw();