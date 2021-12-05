let table,diary,slider,points,newpoints;
var memories;
let notebg,font;
let sel;


function preload(){
  let notebgpath = chrome.runtime.getURL('image/notebg.png');
    notebg = loadImage(notebgpath);
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
  let s = 'How many points do you give to this memory?';
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
  });
}

function mySelectEvent() {
  points = sel.value();
  console.log("select points!"+points);
}


// function keyIsPressed(Enter){
//   record();
// }

function record() {
  console.log("submit!")
  fetchNotes();
  // console.log(memories);
}

function fetchNotes(){
  document.querySelector('.pages-holder').innerHTML='';
  chrome.runtime.sendMessage({command:"fetchNotes",data:{}},(response)=>{
    memories = response.data;
    // var nav = '<ul>';
    // window.memories = [];
    // for(const nodeId in memories){
    //   nav += '<li data-noteId="'+nodeId'">'+notes[nodeId].icon+''+notes[nodeId].title+'</li>';
    // }
    // nav += '</ul>';
    // document.querySelector('.pages-holder').innerHTML = nav;
  });
}


//   removeElements();
//
//   let newRow = table.addRow();
//   let d = day();
//   let m = month();
//   let y = year();
//   newRow.setString('date', d +'/' +m +'/'+y);
//   newRow.setString('memory', memories);
//   newRow.setString('point', points);
//
// //   for (let r = 0; r < table.getRowCount(); r++)
// //   for (let c = 0; c < table.getColumnCount(); c++) {
// //       print(table.getString(r, c));
// // }
//
//   recall();
//
// }
//
// function recall(){
//
//   fill(10);
//   textSize(25);
//   // textFont(font);
//
//   let pastdate = table.getColumn('date');
//   let pastmemory = table.getColumn('memory');
//
//   print(pastmemory);
//   text(pastdate,0,10);
//   text(pastmemory,0,50);
//
// }
//
// // chrome.storage.sync.set({key: value}, function() {
// //   console.log('Value is set to ' + value);
// // });
//
// // chrome.storage.sync.get(['key'], function(result) {
// //   console.log('Value currently is ' + result.key);
// // });
