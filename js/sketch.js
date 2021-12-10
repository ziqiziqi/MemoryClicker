var olddate,oldmemory,oldpoints,newpoints;
var notebg,font,paperplane,showStage;
var thedate,sel,s,update,like,dislike,likeText,dislikeText,question;

var isFresh = true;
var maxN = 5;
var db, submitted, btn_submit, btn_rescore;
var thisID, thisContent, thisDate, thisScore;
var value;
var timeLimit =  10*  1000;

function setDate(){
  let date = new Date();
  d = date.getTime();
  localStorage.lastDate = d;
}

function getDate(){
  if(localStorage.lastDate){
    console.log(localStorage.lastDate);
    return localStorage.lastDate;
  }else{
    return 0;
  }
}

function checkSubmit(){
  var currentDate = new Date();
  var during = currentDate.getTime() - getDate();
  console.log(during);
  if(during > timeLimit){
    localStorage.liked = 0;
    return false;
  }else{
    return true;
  }
}

function clearScreen(){
  console.log("clear");
  //sel.remove();
  sel.style.display = 'none';
  notebg.style.display = 'none';
  oldmemory.style.display = 'none';
  question.style.display = 'none';
  btn_submit.style.display = 'none';
  thedate.style.display = 'none';
}

function initElements(){
  oldmemory = document.getElementById('writememory');
  btn_submit = document.getElementById("btn");
  db = connectDatabase();
  createTables(db);
  thedate = document.getElementById('thedate');
  datenow = new Date();
  thedate.innerHTML = datenow.toLocaleDateString();
  sel = document.getElementById('sel');
  value = sel.options[sel.selectedIndex].value;
  question = document.getElementById('question');

  // var btn_sql = createButton('debug');
  // btn_sql.position(520, 660);
  // btn_sql.mousePressed(sqlTest);
  if(localStorage.lastIdea == null){
    localStorage.lastIdea = "Your Idea today";
  }
  if(localStorage.lastID == null){
    localStorage.lastID = 0;
  }
}


function setup(){
  initElements();
  submitted = checkSubmit();
  if(submitted){
    // show
    showContent(false,null);
  }else{
    // to submit
    showSubmit();
  }
}


function showContent(fromsubmit, content){
  console.log("show content");
  if(fromsubmit){
    // sel.remove();
    // thedate.remove();\
    setDate();
    thisDate = localStorage.lastDateShow;
  }else{
    thisID = localStorage.lastID;
    thisContent = localStorage.lastContent;
    thisDate = localStorage.lastDateShow;
    thisScore = localStorage.lastScore;
  }
  // thedate = document.getElementById('thedate');
  // sel = document.getElementById('sel');
  // sel.remove();
  // thedate.remove();
  clearScreen();
  createCanvas(1000,600);
  image(showStage,width/7,0,width*0.8,height);
  textSize(15);
  textFont(font);

  text(thisDate, width*0.3,height*0.3);
  if(content == null){
    contentText = localStorage.lastIdea;
    thisID = localStorage.lastID;
  }
  else{
    contentText = content;
  }
  console.log(content);
  text(contentText,width*0.3,height*0.34);
  liketext = 'Still want to remember it?';
  like = createCheckbox(' ',false);
  text(liketext,width*0.53,height*0.60);
  disliketext = 'Do not want to remember it?'
  dislike = createCheckbox(' ',false);
  text(disliketext,width*0.53,height*0.65);
  like.position(width*0.5, height*0.66);
  dislike.position(width*0.5,height*0.71);

  console.log(localStorage.liked);
  if(localStorage.liked ==0){
    btn_rescore = createButton('confirm');
    btn_rescore.position(520, 460);
    btn_rescore.mousePressed(recall);
  }
}


function preload(){
  console.log("preload");
  let sSpath = chrome.runtime.getURL('image/showStage.png');
    showStage = loadImage(sSpath);
    notebg = document.getElementById('notebg');
  let paperplanepath = chrome.runtime.getURL('image/pp.png');
    paperplane = loadImage(paperplanepath);
  let Pathfont = chrome.runtime.getURL('font/Comic Sans MS.ttf');
  font = loadFont(Pathfont);
}

function showSubmit() {
  console.log("showSubmit");
  localStorage.liked = 0;
  createCanvas(1000,600);
  // image(notebg,width/5,0,width*0.8,height);
  // sel.changed(mySelectEvent);
  //btn_submit.addEventListener('click',function(event){
  let getVar = variable => getComputedStyle(btn_submit).getPropertyValue(variable);
  btn_submit.addEventListener('click', e=>{
    if(!btn_submit.classList.contains('active')) {

      btn_submit.classList.add('active');

      gsap.to(btn_submit, {
          keyframes: [{
              '--left-wing-first-x': 50,
              '--left-wing-first-y': 100,
              '--right-wing-second-x': 50,
              '--right-wing-second-y': 100,
              duration: .2,
              onComplete() {
                  gsap.set(btn_submit, {
                      '--left-wing-first-y': 0,
                      '--left-wing-second-x': 40,
                      '--left-wing-second-y': 100,
                      '--left-wing-third-x': 0,
                      '--left-wing-third-y': 100,
                      '--left-body-third-x': 40,
                      '--right-wing-first-x': 50,
                      '--right-wing-first-y': 0,
                      '--right-wing-second-x': 60,
                      '--right-wing-second-y': 100,
                      '--right-wing-third-x': 100,
                      '--right-wing-third-y': 100,
                      '--right-body-third-x': 60
                  })
              }
          }, {
              '--left-wing-third-x': 20,
              '--left-wing-third-y': 90,
              '--left-wing-second-y': 90,
              '--left-body-third-y': 90,
              '--right-wing-third-x': 80,
              '--right-wing-third-y': 90,
              '--right-body-third-y': 90,
              '--right-wing-second-y': 90,
              duration: .2
          }, {
              '--rotate': 50,
              '--left-wing-third-y': 95,
              '--left-wing-third-x': 27,
              '--right-body-third-x': 45,
              '--right-wing-second-x': 45,
              '--right-wing-third-x': 60,
              '--right-wing-third-y': 83,
              duration: .25
          }, {
              '--rotate': 55,
              '--plane-x': -8,
              '--plane-y': 24,
              duration: .2
          }, {
              '--rotate': 40,
              '--plane-x': 45,
              '--plane-y': -180,
              '--plane-opacity': 0,
              duration: .3,
              onComplete() {
                  setTimeout(() => {
                      // btn_submit.removeAttribute('style');
                      gsap.fromTo(btn_submit, {
                          // opacity: 0,
                          // y: -8
                      }, {
                          opacity: 1,
                          y: 0,
                          // clearProps: true,
                          duration: .25,
                          onComplete() {
                              // btn_submit.classList.remove('active');
                              record();
                              // btn_submit.remove();

                          }
                      })
                  }, 2000)
              }
          }]
      })

      gsap.to(btn_submit, {
          keyframes: [{
              '--text-opacity': 0,
              '--border-radius': 0,
              '--left-wing-background': getVar('--primary-darkest'),
              '--right-wing-background': getVar('--primary-darkest'),
              duration: .1
          }, {
              '--left-wing-background': getVar('--primary'),
              '--right-wing-background': getVar('--primary'),
              duration: .1
          }, {
              '--left-body-background': getVar('--primary-dark'),
              '--right-body-background': getVar('--primary-darkest'),
              duration: .4
          }, {
              '--success-opacity': 1,
              '--success-scale': 1,
              duration: .5,
              delay: .5
          }]
      })

  }

});

}


//function mySelectEvent() {
//  oldpoints = sel.value();
//  console.log("select points!"+oldpoints);
//}

function record() {
  console.log("submit!")
  fetchNotes();
}

function fetchNotes(){
addContent(oldmemory.innerText, sel.value);
sqlTest();
}

function recall(){
  btn_rescore.remove();
  localStorage.liked = 1;
  if(like.checked())
  {
    likeEvent(thisID);
  }
  else if(dislike.checked()){
    dislikeEvent(thisID);
  }
}


function likeEvent(id){
  // newpoints = oldpoints++;
  updateScore(id,1);
}


function dislikeEvent(id){
  // newpoints = oldpoints--;
  updateScore(id,-1);
}

//sql part
function errorHandler(transaction, error)
{
    //alert('Oops.  Error was '+error.message+' (Code '+error.code+')');
    console.log('Oops.  Error was '+error.message+' (Code '+error.code+')');
    // Handle errors here
    return false;
}

function chooseDataHandler(transaction, results)
{
    // Handle the results
    var l = results.rows.length;
    var ids = [];
    var contents = [];
    var dates = [];
    var staris = [0];
    for (let i=0; i<l; i++) {
        let row = results.rows.item(i);
        console.log(row);
        ids.push(row['id']);
        contents.push(row['name']);
        dates.push(row['date']);
        staris.push(staris[staris.length-1] + row['score']);
        // string = string + row['name'] + " ID "+row['id']+ " Score "+ row['score'] + "\n";
    }
    // console.log(string);

    var choose = Math.floor((Math.random() * staris[l-1])+1);
    console.log(staris);
    console.log(choose);
    console.log(contents);
    var i;
    for(i =1;i<=l;i++){
      if(choose<=staris[i]){
        thisID = ids[i-1];
        break;
      }
    }
    console.log(i+" "+contents[i]+" get idea");
    localStorage.lastIdea = contents[i-1];
    localStorage.lastID = thisID;
    localStorage.lastDateShow = dates[i-1];
    localStorage.lastScore = results.rows.item(i-1)['score'];
    showContent(true, contents[i-1]);
}

function dataHandler(transaction, results)
{
    // Handle the results
    var string = "Green shirt list contains the following people:\n\n";
    for (var i=0; i<results.rows.length; i++) {
        var row = results.rows.item(i);
        string = string + row['name'] + " ID "+row['id']+ " Score "+ row['score'] + "\n";
    }
    console.log(string);
    if(results.rows.length > maxN){
      autoRemove();
    }
    else{
      getIdea();
    }
}


function nullDataHandler(transaction, results) {
  console.log("null data sql error");
}

//demo database init
function createTables(db)
{
    db.transaction(
        function (transaction) {
            /* The first query causes the transaction to (intentionally) fail if the table exists. */
            transaction.executeSql('CREATE TABLE idea(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT "Be happy", score int NOT NULL DEFAULT 5, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP);', [], nullDataHandler, errorHandler);
            /* These insertions will be skipped if the table already exists. */
            transaction.executeSql('insert into idea (name, score) VALUES ("sleep", 1);', [], nullDataHandler, errorHandler);
        }
    );
}

function connectDatabase(){
  var shortName = 'mydatabase';
  var version = '1.0';
  var displayName = 'My Important Database';
  var maxSize = 65536; // in bytes
  var db = openDatabase(shortName, version, displayName, maxSize);
  return db;
}

function sqlTest(){
  console.log("begin sql test");
  db.transaction(
    function (transaction) {
        transaction.executeSql("SELECT * from idea", [], dataHandler, errorHandler);
    }
);
}

//add item into database
function addContent(name,score){
  console.log(`try to add content ${name} ${score}`)
  db.transaction(
    function (transaction) {
      transaction.executeSql(`insert into idea (name, score) VALUES ("${name}", ${score});`, [], nullDataHandler, errorHandler);
    }
);
  db.transaction(
    function(transaction){
      transaction.executeSql(`select last_insert_rowid() from idea`, [], getLastDataHandler, errorHandler);
    }
  )
  shrink();
}

//get last insert id
function getLastDataHandler(transaction, results){
  thisID = results.rows.item(0)["last_insert_rowid()"];
  console.log(thisID);
}
//auto remove least score item when it is full
function autoRemove(){
  console.log("auto remove");
  db.transaction(
    function (transaction){
      transaction.executeSql("SELECT * from idea order by score asc",
      [],
      dataRemoveHandler,errorHandler);
    }
  );
}

function dataRemoveHandler(transaction, results)
{
    // Handle the results
    var string = "rm:\n\n";
    var id=0;
    for (var i=0; i<1; i++) {
        var row = results.rows.item(i);
        string = string + row['name'] + " ID "+row['id']+ " Score "+ row['score'] + "\n";
        id = row['id'];
    }
    console.log(string);
    deleteID(id);

    if(id == thisID){
      alert("Insert Error, this idea is weaker than any others!");
    }
    else{
      getIdea();
    //  //showContent(true);
    }

    // alert(string);
}

function deleteID(id){
  console.log(`try to delete content ${id}`)
  db.transaction(
    function (transaction) {
      transaction.executeSql(`delete from idea where ID = ${id};`, [], nullDataHandler, errorHandler);
    }
);
}

function updateScore(id,s){
console.log(`try to update ${id} with score ${s}`);
db.transaction(
  function (transaction) {
    transaction.executeSql(`update idea set score = score+${s} where ID = ${id};`, [], nullDataHandler, errorHandler);
  }
);
}

function getIdea(){
  db.transaction(
    function (transaction) {
        transaction.executeSql("SELECT * from idea", [], chooseDataHandler, errorHandler);
    }
);
}

function shrink(){
  var i= -0.01;
  db.transaction(
    function (transaction) {
      transaction.executeSql(`update idea set score = score+${i};`, [], nullDataHandler, errorHandler);
    }
  );
}
