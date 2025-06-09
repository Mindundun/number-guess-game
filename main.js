//랜덤 번호 지정
//user가 번호를 입력 후 Go버튼 클릭
//만약 유저가 랜덤번호를 맞추면 맞췄습니다팝업
//랜덤번호가 유저번호보다 크면 업!
//랜덤번호가 유저번호보다 작으면 다운!
//Reset버튼을 누르면 게임이 리셋된다.
//다섯번의 기회를 다 소모하면 게임이 끝남(더이상 추측불가, 버튼 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다(기회 소모X)
//유저가 이미 입력한 숫자를 또 입력하면 알려준다(기회 소모X)

let computerNum = 0;
let playButton = document.getElementById("playButton")//document = index.html
let userInput = document.getElementById("userInput");
let resultArea = document.getElementById("resultArea");
let resetButton = document.getElementById("resetButton");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chanceArea");
let history = [];

playButton.addEventListener("click", play);//playButton클릭 시 play라는 함수를 변수화하여 이벤트 실행
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){userInput.value=""});

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100) + 1; //Math.random()는 0~1사이의 숫자를 반환
    console.log(computerNum);
}

function play(){ //위에서 이 함수를 변수처럼 넘김
    let userValue = userInput.value;

    if(userValue < 1 || userValue > 100){
        resultArea.textContent="1과 100사이 숫자를 입력해 주세요.";
        return;//이후의 로직 수행하지 않음
    } 

    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
        return;
    }
    chances --;
    chanceArea.textContent =`남은기회 : ${chances}번`;
    if(userValue < computerNum){
        resultArea.textContent = "Up!";
    }else if(userValue > computerNum){
        resultArea.textContent = "Down!";
    }else{
        resultArea.textContent = "맞췄습니다!!";
        gameOver = true;
    }
    
    history.push(userValue);
    console.log(history);

    if(chances < 1){
        gameOver = true;
    }
    if(gameOver == true){
        playButton.disabled = true;
    }
}

function reset(){
    //userinput창 clear
    userInput.value = "";
    //새로운 번호 생성
    pickRandomNum();
    //결과창 reset
    resultArea.textContent = "결과값이 여기에 나옵니다!";
    //기회 5번 제공 후 play
    chances = 5;
    chanceArea.textContent =`남은기회 : ${chances}번`;
    playButton.disabled = false;
    //입력되었던 숫자들 클리어
    history = [];
    //게임 오버 값 클리어
    gameOver = false;
    play();
}

pickRandomNum();