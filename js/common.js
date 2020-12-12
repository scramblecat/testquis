const createBtn = document.getElementById('create-btn');
const userName = document.getElementById('user-name');
const myRank = document.getElementById('my-rank');
const myScore = document.getElementById('my-score');

var userAgent = window.navigator.userAgent.toLowerCase();
    
var cosoleText = document.getElementById('console_log');
if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
    //IE向けの記述
    cosoleText.textContent = "IEは、使えません";
    console.log('IEは、使えません');

}else if(userAgent.indexOf('chrome') != -1) {
    //Google Chrome向けの記述  
    cosoleText.textContent = "Chrome";
    console.log('chrome');
};

function setUserName() {
    let myName = prompt('あなたの名前を入力してください(ニックネームも可）');
    localStorage.setItem('user-name', myName);
    userName.textContent = myName;

    if (myName == '' || myName == null) {
        myName = '名無しさん';
    }
}

myRank.textContent = 'ランク：' + localStorage.getItem('rank');
myScore.textContent = 'ポイント：' + localStorage.getItem('point');

if (!localStorage.getItem('user-name')) {
    setUserName();
} else {
    userName.textContent = localStorage.getItem('user-name');
}

const btn = document.querySelector('.btn-menu');
const nav = document.querySelector('nav');

btn.addEventListener('click', function() {
  nav.classList.toggle('open-menu')
});

createBtn.onclick = function() {
    alert('この機能はまだ使えません。');
};
