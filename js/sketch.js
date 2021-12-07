var olddate,oldmemory,oldpoints,newpoints;
var notebg,font,paperplane;
var sel,s,update,like,dislike,likeText,dislikeText;

var isFresh = true;
var maxN = 5;
var thisID, db, submitted, btn_submit, btn_rescore;

function setDate(){
  let date = new Date();
  d = date.getTime();
  localStorage.lastDate = d;
}

function getDate(){
  if(localStorage.lastDate){
    return localStorage.lastDate;
  }else{
    return 0;
  }

}

function checkSubmit(){
  var currentDate = new Date();
  var during = currentDate.getTime() - getDate();
  console.log(during);
  //if(during>24*3600*1000){
  if(during>5000){
    return false;
  }else{
    return true;
  }
}

function clearScreen(){
  console.log("clear");
  //sel.remove();
  btn_submit.remove();
  oldmemory.remove();
}

function initElements(){
  oldmemory = document.getElementById('writememory');
  btn_submit = document.getElementById("btn");
  db = connectDatabase();

  var btn_sql = createButton('debug');
  btn_sql.position(520, 660);
  btn_sql.mousePressed(sqlTest); 

}

function showContent(playEffect){
  if(playEffect){
    sel.remove();
    setDate();
    //effect();
  }
  clearScreen();
  createCanvas(1000,600);
  image(notebg,width/5,0,width*0.8,height);
  textSize(15);
  textFont(font);
  contentText = 'Idea Here';
  text(contentText,width*0.5,height*0.3); 
  liketext = 'Still want to remember it?';
  like = createCheckbox(' ',false);
  text(liketext,width*0.33,height*0.65);
  disliketext = 'Do not want to remember it?'
  dislike = createCheckbox(' ',false);
  text(disliketext,width*0.63,height*0.65);
  like.position(width*0.3, height*0.71);
  dislike.position(width*0.6,height*0.71);
  
  //change happens when clicking button rather than checking the box
  //like.changed(likeEvent);
  //dislike.changed(dislikeEvent); 

  btn_rescore = createButton('confirm');
  btn_rescore.position(520, 460);
  btn_rescore.mousePressed(recall); 
}

function setup(){
  initElements();
  submitted = checkSubmit();
  if(submitted){
    // show
    showContent(false);
  }else{
    // to submit
    showSubmit();
  }
  
}
function preload(){
  console.log("preload");
  let notebgpath = chrome.runtime.getURL('image/notebg.png');
    notebg = loadImage(notebgpath);
  let paperplanepath = chrome.runtime.getURL('image/pp.png');
    paperplane = loadImage(paperplanepath);
  let Pathfont = chrome.runtime.getURL('font/Comic Sans MS.ttf');
  font = loadFont(Pathfont);
}

function showSubmit() {
  console.log("showSubmit");
  createCanvas(1000,600);
  image(notebg,width/5,0,width*0.8,height);
  sel = createSelect();
  textSize(15);
  textFont(font);
  fill(0);
  s = 'How many points do you give to this memory?';
  text(s,width*0.33,height*0.65);
  sel.position(width*0.7, height*0.71);
  for(i=0;i<=10;i++){
    sel.option(i);
  }

  sel.selected(5);
  //sel.changed(mySelectEvent);
  btn_submit.addEventListener('click',function(event){
    record();
    //recordTest();
    //effect();
  });
}

//function mySelectEvent() {
//  oldpoints = sel.value();
//  console.log("select points!"+oldpoints);
//}

function record() {
  console.log("submit!")
  fetchNotes();
  showContent(true);
}


function effect() {
  image(paperplane,200,0,800,600);
  paperplane.play();
}

function fetchNotes(){
addContent(oldmemory.innerText, sel.value());
sqlTest();
}

function recall(){
  btn_rescore.remove();
  if(like.checked)
  {
    likeEvent(thisID);
  }
  else if(dislike.checked){
    dislikeEvent(thisID);
  }
}

//TBD
function likeEvent(id){
  // newpoints = oldpoints++;
  updateScore(id,1);
}

//TBD
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
      showContent(true);
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
  //if(isFresh){
  //  console.log("create database");
  //  createTables(db);
  //  isFresh = false;
  //}
  db.transaction(
    function (transaction) {
        transaction.executeSql("SELECT * from idea",
            [], // array of values for the ? placeholders
            dataHandler, errorHandler);
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
      showContent(true);
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

}