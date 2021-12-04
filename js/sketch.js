let table,diary,slider,points,memories,newpoints;
let vars = {};
// function preload(){
//   table = loadTable(url,'csv','header');
//   // let backgroundpath = chrome.runtime.getURL('image/shu.jpeg');
//   // let backgroundpic = loadImage(backgroundpath);
// }

let sel;

function setup() {
  textAlign(CENTER);
  sel = createSelect();
  sel.position(width/2, height/2+100);
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
  sel.selected('0');
  sel.changed(mySelectEvent);

  addNote();
}

function mySelectEvent() {
  points = sel.value();
}

function addNote(){
  notes = createInput();
  notes.position(width/2,height/2);
  memories = notes.value();
}

function keyIsPressed(Enter){
  record();
}

function record() {
  memories = notes.value();
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
