let olddate,oldmemory,oldpoints,newpoints;
let notebg,font,paperplane;
let sel,s,button,update,like,dislike,liketext,disliketext;
var isFresh = true;


function preload(){
  let notebgpath = chrome.runtime.getURL('image/notebg.png');
    notebg = loadImage(notebgpath);
  let paperplanepath = chrome.runtime.getURL('image/pp.png');
    paperplane = loadImage(paperplanepath);
  let Pathfont = chrome.runtime.getURL('font/Comic Sans MS.ttf');
  font = loadFont(Pathfont);
}

function setup() {
  createCanvas(1000,600);
  image(notebg,200,0,800,600);
  sel = createSelect();
  textSize(15);
  textFont(font);
  fill(0);
  s = 'How many points do you give to this memory?';
  text(s,330,430);
  sel.position(700, 417);
  sel.option('0');
  sel.option('1');
  sel.option('2');
  sel.option('3');
  sel.option('4');
  sel.option('5');
  sel.option('6');
  sel.option('7');
  sel.option('8');
  sel.option('9');
  sel.option('10');
  sel.selected('5');
  sel.changed(mySelectEvent);
  btn = document.getElementById("btn");
  btn.addEventListener('click',function(event){
    //record();
    recordTest();
    //effect();
  });
}

function mySelectEvent() {
  oldpoints = sel.value();
  console.log("select points!"+oldpoints);
}

//only for test by cp
function recordTest(){
  console.log("submit!")
  sqlTest();
  fetchNotes();
}

function record() {
  console.log("submit!")
  sqlTest();
  fetchNotes();
  sel.remove();
  clear();
  document.getElementById("btn").remove();
  document.getElementById("enterdate").remove();
  document.getElementById("writememory").remove();

   button = createButton('recall');
   button.position(520, 460);
   button.mousePressed(recall);
}


function effect() {
  image(paperplane,200,0,800,600);
  paperplane.play();
}

function fetchNotes(){
olddate = document.getElementById('enterdate');
oldmemory = document.getElementById('writememory');
}

function recall(){
  button.remove();

  createCanvas(1000,600);
  image(notebg,200,0,800,600);
  textSize(15);
  textFont(font);
  fill(0);
  liketext = 'Still want to remember it?';
  like = createCheckbox(' ',false);
  text(liketext,330,430);
  disliketext = 'Do not want to remember it?'
  dislike = createCheckbox(' ',false);
  text(disliketext,630,430);
  like.position(300, 417);
  dislike.position(600,417);
  like.changed(likeevent);
  dislike.changed(dislikeevent);

  update = createButton('Update');
  update.position(520, 460);
  update.mousePressed(clearagain);

}

function clearagain(){
  update.remove();
  clear();
  like.remove();
  dislike.remove();
  effect();
}

function likeevent(){
  newpoints = oldpoints+1;
}

function dislikeevent(){
  newpoints = oldpoints-1;
}

//sqlite part
function errorHandler(transaction, error)
{
    // error.message is a human-readable string.
    // error.code is a numeric error code
    //alert('Oops.  Error was '+error.message+' (Code '+error.code+')');
    console.log('Oops.  Error was '+error.message+' (Code '+error.code+')');
 
    // Handle errors here
    var we_think_this_error_is_fatal = true;
    if (we_think_this_error_is_fatal) return true;
    return false;
}
 
function dataHandler(transaction, results)
{
    // Handle the results
    var string = "Green shirt list contains the following people:\n\n";
    for (var i=0; i<results.rows.length; i++) {
        // Each row is a standard JavaScript array indexed by
        // column names.
        var row = results.rows.item(i);
        string = string + row['name'] + " (ID "+row['id']+")\n";
    }
    console.log(string);
    // alert(string);
}


function nullDataHandler(transaction, results) { 
  console.log("sql error");
}
 
function createTables(db)
{
    db.transaction(
        function (transaction) {
 
            /* The first query causes the transaction to (intentionally) fail if the table exists. */
            transaction.executeSql('CREATE TABLE idea(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT "Be happy", score int NOT NULL DEFAULT 5, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP);', [], nullDataHandler, errorHandler);
            /* These insertions will be skipped if the table already exists. */
            transaction.executeSql('insert into idea (name, score) VALUES ("work", 1);', [], nullDataHandler, errorHandler);
            transaction.executeSql('insert into idea (name, score) VALUES ("sleep", 1);', [], nullDataHandler, errorHandler);
            transaction.executeSql('insert into idea (name, score) VALUES ("eat", 2);', [], nullDataHandler, errorHandler);
            transaction.executeSql('insert into idea (name, score) VALUES ("skate", 3);', [], nullDataHandler, errorHandler);
        }
    );
}

function sqlTest(){
  console.log("begin sql test");
  var shortName = 'mydatabase';
  var version = '1.0';
  var displayName = 'My Important Database';
  var maxSize = 65536; // in bytes
  var db = openDatabase(shortName, version, displayName, maxSize);
  if(isFresh){
    console.log("create database");
    createTables(db);
    isFresh = false;
  }
  
  db.transaction(
    function (transaction) {
        transaction.executeSql("SELECT * from idea where score=1;",
            [], // array of values for the ? placeholders
            dataHandler, errorHandler);
    }
);
}

// // chrome.storage.sync.set({key: value}, function() {
// //   console.log('Value is set to ' + value);
// // });
//
// // chrome.storage.sync.get(['key'], function(result) {
// //   console.log('Value currently is ' + result.key);
// // });
