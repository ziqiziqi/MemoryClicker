let olddate,oldmemory,oldpoints,newpoints;
let notebg,font,paperplane;
let sel,s,button,update,like,dislike,liketext,disliketext;


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
    record();
    //effect();
  });
}

function mySelectEvent() {
  oldpoints = sel.value();
  console.log("select points!"+oldpoints);
}


function record() {
  console.log("submit!")
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

// // chrome.storage.sync.set({key: value}, function() {
// //   console.log('Value is set to ' + value);
// // });
//
// // chrome.storage.sync.get(['key'], function(result) {
// //   console.log('Value currently is ' + result.key);
// // });
