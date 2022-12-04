var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
var dino = {
    x: 10,
    y: 400,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
dino.draw();
//캐릭터 그리기 끝

//장해물 그리기
class Cactus {
    constructor() {
        this.x = 2500;
        this.y = 400;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
var cactus = new Cactus();
cactus.draw();
//장해물 그리기 끝

//장해물, 스코어 함수
var timer = 0;
var cactuses = [];
var animation = 0;
var score = 0;
var randonfps = 25;
//점프기능
var space = false;
var spacetimer = 0;
var a1 = false;
var d = false;
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && spacetimer == 0) {
        space = true;
    }
})
//점프기능 끝
//fps 함수 코드
function rand(fi, se) {
    var eunza = Math.round(Math.random());
    if(eunza == 1){
        return fi;
    }
    if(eunza == 0){
        return se;
    }
}
function a() {
    animation = requestAnimationFrame(a)
    timer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);//쓸때없이 있는 복사본 지우기
    //랜덤프레임마다 장해물 뽑기
    if (timer % randonfps === 0) {
        var cactus = new Cactus();
        cactuses.push(cactus);
        randonfps = rand(85, 100);
    }
    //랜덤프레임마다 장해물 뽑기 끝
    if (timer > 250) {
        score++;
        document.getElementById("span").innerHTML = '점수:' + score;//점수 표기
    }

    cactuses.forEach((a, i, o) => {
        if (a.x < -20) { o.splice(i, 1); }//복사본의 x좌표가 -20보다 작다면 지워버리기
        a.x -= 10;//복사본 나오는 속도조정
        crash(dino, a)
        a.draw();
    })
    dino.draw();
    if (space == true) {
        dino.y -= 15;//점프 속도
        spacetimer++;
    }

    if (space == false) {
        if (dino.y < 401) { dino.y += 10; }
    }

    if (spacetimer >= 15) {
        space = false;
        spacetimer = 0;
    }

    if (dino.y < 179) {
        dino.y = 400;
    }
}
a();
//장해물, 스코어 함수 끝

//충돌판정
function crash(dino, cactus) {
    var jux = cactus.x - (dino.x + dino.width);
    var juy = cactus.y - (dino.y + dino.height);
    if (jux < 0 && juy < 0) {
        cancelAnimationFrame(animation);
        eve();
    }
}
//충돌파정 함수 끝

//충돌 이벤트 함수
function eve() {
    const canvas = document.getElementById('canvas');
    canvas.style.display = 'none';
    const img = document.getElementById('img');
    img.style.display = 'block';
}