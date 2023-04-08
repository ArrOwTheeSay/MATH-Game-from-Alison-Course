const gameArea = document.querySelector('.game');
const btn = document.createElement('button');
const btn1 = document.createElement('button');
const output = document.createElement('div');
const answer = document.createElement('input');
const message = document.createElement('div');
output.textContent = "Click the button to start the game";
btn.textContent = "Start Game";
answer.setAttribute('type','number');
answer.setAttribute('max',999);
answer.setAttribute('min',0);
output.classList.add('output');
output.classList.add('message');
answer.classList.add('boxAnswer');
gameArea.append(message);
gameArea.append(output);
gameArea.append(btn);
gameArea.append(btn1);
btn1.style.display = 'none';
const opts = ['*','/','+','-'];
const game = {correct:'',maxValue:10,questions:10,oVals:[0,1,2,3],curQue:0,hiddenVal:3,inplay:false};
const player = {correct:0,incorrect:0};
btn.addEventListener('click',btnCheck);

answer.addEventListener('keypress',(e)=>{
    console.log(e.code);
    console.log(answer.value.length);
    if(answer.value.length >= 0){
        btn.style.display = 'block';
        btn.textContent = 'CHECK';
        game.inplay = true;
    }
    if(e.code == 'Enter'){
        game.inplay = true;
        btnCheck();
    }
})
function btnCheck(){
    scoreBoard();
    btn.style.display = 'none';
    if(game.inplay){
        console.log('CHECK');
        console.log(game.correct);
        if(answer.value == game.correct){
            console.log('correct');
            player.correct++;
        }else{
            console.log('incorrect, the answer is '+game.correct);
            player.incorrect++;
        }
        scoreBoard();
        answer.disabled = true;
        buildQuestion();
    }else{
        game.curQue = 0;
        buildQuestion();
    }
}


function nextQuestion(){
    btn1.style.display = 'none';
}

function scoreBoard(){
    message.innerHTML = `${game.curQue} of ${game.questions} Questions<br>`;
    message.innerHTML = `Correct : (${player.correct}) Incorrect: (${player.incorrect})`;
}

function buildQuestion(){
    scoreBoard();
    console.log(game.curQue + 'of' + game.questions);
    if(game.curQue < game.questions){
        game.curQue++;
        scoreBoard();
        output.innerHTML='';
        let vals = [];
        vals[0] = Math.floor(Math.random()*(game.maxValue+1));
        vals[1] = Math.floor(Math.random()*(game.maxValue+1));
        game.oVals.sort(()=>{return 0.5 - Math.random()});
        if(game.oVals[0] == 1){
            if(vals[0]==0){vals[0]=1};
            let temp = vals[0] * vals[1];
            vals.unshift(temp);
        }else{
            vals[2] = eval(vals[0] + opts[game.oVals[0]] + vals[1]);
        }
        vals[3] = opts[game.oVals[0]];
        let hiddenVal;
        if(game.hiddenVal != 3){
            hiddenVal = game.hiddenVal;
        }else{
            hiddenVal = Math.floor(Math.random()*3);
        }
        answer.value = '';
        answer.disabled = false;
        for(let i=0;i<3;i++){
            if(hiddenVal == i){
                game.correct = vals[i];
                output.append(answer);
            }else{
                maker(vals[i],'box');
            }
            if(i==0){
                console.log(vals[3]);
                let tempSign = game.oVals[0] ==0 ? '&times;' : vals[3];
                maker(tempSign,'boxSign');
            }
            if(i==1){
                maker('=','boxSign');
            }
        }
        answer.focus();
        //vals[hiddenVal] = '__';
        //output.innerHTML = `${vals[0]} ${vals[3]} ${vals[1]} = ${vals[2]} `;
    }
    scoreBoard();
}

function maker(v,cla){
    const temp = document.createElement('div');
    temp.classList.add(cla);
    temp.innerHTML = v;
    output.append(temp);
}