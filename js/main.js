const titleText = document.getElementById('title');
const questionText = document.getElementById('question');
const ansBtn1 = document.getElementById('ans-btn1');
const ansBtn2 = document.getElementById('ans-btn2');
const ansBtn3 = document.getElementById('ans-btn3');
const ansBtn4 = document.getElementById('ans-btn4');
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');
const img = document.getElementById('img');
const pageBtn = document.getElementById('screen-transition');

let sum = localStorage.getItem('mySum');
let correctAnswer = localStorage.getItem('myCorrect');
let valueText;
let myPoint = localStorage.getItem('point');
let score;
let myRank = localStorage.getItem('rank');
let answerText;

const questions = [
    {
        question: 'JIS配列のキーボードで「A」と同じキーにあるひらがなは？',
        answer1: 'た',
        answer2: 'と',
        answer3: 'ち',
        answer4: 'ぬ',
        image: '../img/computer_keyboard_black.png',
        correct: 3,
        explanation: '「ち」です。'
    },
    {
        question: 'スマホのキーボードの「は」の左はどの文字でしょう。',
        answer1: 'ふ',
        answer2: 'ほ',
        answer3: 'ひ',
        answer4: 'へ',
        image: '../img/スマホ.PNG',
        correct: 4,
        explanation: '左がひ、上がふ、下がほ、です。',
    },
    {
        question: '[http://www.tlt.co.jp/tlt/]このウェブアドレスはどこの会社のホームページに飛ぶ？',
        answer1: '京セラ',
        answer2: '東芝ライテック',
        answer3: 'シャープ',
        answer4: 'NECパーソナルコンピュータ',
        image: '../img/https.PNG',
        correct: 2,
        explanation: 'これは、広告ではありません。'
    },
    {
        question: 'iPadOSの2020年9月7日現在の最新バージョンは？',
        answer1: '13.7',
        answer2: '12.4.6',
        answer3: '12.3',
        answer4: '13.4.8',
        image: '../img/iPad.png',
        correct: 1,
        explanation: 'iOSも多分番号は一緒だと思います。'
    },
    {
        question: '次の中の和製英語は？',
        answer1: 'ホワイトボード',
        answer2: 'バージョンアップ',
        answer3: 'フォーク',
        answer4: 'ケーキ',
        image: '../img/01MIL37089.png',
        correct: 2,
        explanation: '英語では、Update（アップデート）といいまます。'
    },
    {
        question: '存在しない企業はどれ？',
        answer1: 'ZEPEAL',
        answer2: 'ELSONIC',
        answer3: 'エムアンドエイチ',
        answer4: 'KUXD',
        image: '../img/01CLP10504.png',
        correct: 4,
        explanation: '　　'
    },
];

function onPagek2() {
    window.location.href = '../html/page2.html';
}
function onTop() {
    window.location.href = '../index.html';
}

function setSum() {
    localStorage.setItem('mySum', sum);
    localStorage.setItem('myCorrect',correctAnswer);
}

function resetSum() {
    sum = 0;
    correctAnswer = 0;
    setSum();
}

function setPoint() {
    localStorage.setItem('point',myPoint);
    localStorage.setItem('rank',myRank);
}
function writeQuestion() {
    titleText.textContent = `第${sum + 1}門`;
    questionText.textContent = questions[sum].question;
    img.src = questions[sum].image;
    ansBtn1.textContent = questions[sum].answer1;
    ansBtn2.textContent = questions[sum].answer2;
    ansBtn3.textContent = questions[sum].answer3;
    ansBtn4.textContent = questions[sum].answer4;
}

function rankCheck() {
    if (myPoint >= 100) {
        myRank = 'プラチナ';
    }else if (myPoint >= 60) {
        myRank = 'ゴールド';
    }else if (myPoint >= 30) {
        myRank = 'シルバー';
    }else if (myPoint >= 10) {
        myRank = 'ブロンズ';
    }else {
        myRank = 'ノーマル';
    }
}
function onAnswer(ans) {
    if (ans === questions[sum].correct) {
        correctSound.currentTime = 0;
        correctSound.play();
        answerText = '正解!!';
        correctAnswer++;
        score++;
        myPoint++;
    } else {
        incorrectSound.currentTime = 0;
        incorrectSound.play();
        answerText = '不正解';
    }
    swal(answerText,questions[sum].explanation);
    sum++;
    setSum();

    if (sum === questions.length) {
        if (questions.length === correctAnswer) {
            valueText = 'すばらしい！'
        } else if (correctAnswer / questions.length >= 0.3) {
            valueText = 'まぁまぁ'
        } else {
            valueText = 'ざんねん！'
        }
        rankCheck();
        setPoint();

        localStorage.setItem('score', score);
        ansBtn1.style.visibility = "hidden";
        ansBtn2.style.visibility = "hidden";
        ansBtn3.style.visibility = "hidden";
        ansBtn4.style.visibility = "hidden";
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
    if (!localStorage.getItem('mySum')) {
        resetSum();
    }
    sum = parseInt(sum, 10);

    if (sum >= questions.length) {
        sum = 0;
    }

    writeQuestion();
    console.log('前回までのスコア:' + localStorage.getItem('point') + 'ランク:' + localStorage.getItem('rank'));
    pageBtn.style.visibility = "hidden";
}
onStart();