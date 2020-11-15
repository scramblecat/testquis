const titleText = document.getElementById('title');
const questionText = document.getElementById('question');
const inputText = document.getElementById('input-text');
const ansBtn = document.getElementById('ans-btn');
const pageBtn = document.getElementById('screen-transition');
const img = document.getElementById('img');
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

let sum2 = localStorage.getItem('mySum2');
let correctAnswer = localStorage.getItem('myCorrect');
let valueText
let myPoint = localStorage.getItem('point');
let myRank = localStorage.getItem('rank');
let answerText;

const questions = [
    {
        question: 'この猫の柄は、なんていう柄でしょうか。カタカナで記述してください。',
        image: '../img/cat1.JPG',
        correct: 'キジトラ',
        explanation: '',
        ansCorrect() { return this.correct }
    },
    {
        question: '二代目将軍の名前はなんでしょう？漢字で記述してください。',
        image: 'img/',
        correct: '徳川秀忠',
        explanation: '初代将軍・家康の三男です。大河ドラマにもなった浅井三姉妹「江」の夫としても有名です。',
        ansCorrect() { return this.correct }
    },
    {
        question: '三代目将軍の名前はなんでしょう？漢字で記述してください。',
        image: 'img/',
        correct: '徳川家光',
        explanation: 'ちなみに15人の徳川将軍のうち、正室の子は家康・家光・慶喜の3人のみであり、なかでも将軍の御内室（御台所）が生んだ将軍は家光のみだそうです。',
        ansCorrect() { return this.correct }
    }
];

function onTop() {
    window.location.href = '../index.html';
}

function setSum() {
    localStorage.setItem('mySum2', sum2);
    localStorage.setItem('myCorrect', correctAnswer);
}

function resetSum() {
    sum2 = 0;
    correctAnswer = 0;
    setSum();
}

function setPoint() {
    localStorage.setItem('point', myPoint);
    localStorage.setItem('rank', myRank);
}

function writeQuestion() {
    titleText.textContent = `第${sum2 + 1}問`;
    img.src = questions[sum2].image;
    questionText.textContent = questions[sum2].question;
}

function rankCheck() {
    if (myPoint >= 100) {
        myRank = 'プラチナ';
    } else if (myPoint >= 60) {
        myRank = 'ゴールド';
    } else if (myPoint >= 30) {
        myRank = 'シルバー';
    } else if (myPoint >= 10) {
        myRank = 'ブロンズ';
    } else {
        myRank = 'ノーマル';
    }
}

function onAnswer() {
    const ansText = document.getElementById('input-text');
    if (ansText.value == '' || ansText.value == null) {
        alert('値を入力してください');
        return
    }
    if (ansText.value == questions[sum2].ansCorrect()) {
        correctSound.currentTime = 0;
        correctSound.play();
        answerText = '正解！';
        correctAnswer++;
        myPoint++;
    } else {
        incorrectSound.currentTime = 0;
        incorrectSound.play();
        answerText = '不正解';
    }

    ansText.value = '';
    swal(answerText, questions[sum2].explanation);
    sum2++;
    setSum();

    if (sum2 === questions.length) {
        if (questions.length === correctAnswer) {
            valueText = 'すばらしい！'
        } else if (correctAnswer / questions.length >= 0.3) {
            valueText = 'まぁまぁ'
        } else {
            valueText = 'ざんねん！'
        }
        rankCheck();
        setPoint();
        pageBtn.style.visibility = "visible";
    } else {
        writeQuestion();
    }
}

function onStart() {
    if (!localStorage.getItem('point')) {
        myPoint = 0;
        myRank = 'ノーマル';
        setPoint();
    }
    if (!localStorage.getItem('mySum2')) {
        resetSum();
    }
    sum2 = parseInt(sum2, 10);

    if (sum2 >= questions.length) {
        sum2 = 0;
    }

    console.log('前回までのスコア：' + localStorage.getItem('point') + 'ランク：' + localStorage.getItem('rank'));
    pageBtn.style.visibility = "hidden";
    writeQuestion();
} 

onStart();