let nn;
let button;
let guess = "";
let knt = 0;
let xx = ["我", "你", "它", "是", "想"];
let aa = ["我", "你", "它"];
let bb = ["是", "想"];
let cc = ["我", "你", "它"];
let dd = ["我", "你", "它"];
let ee = ["是", "想"];
let ff = ["我", "你", "它"];
//*******************************
function setup() {
  randomSeed(2938479)
  nn = ml5.neuralNetwork({ task: "classification", debug: false });
  createTrainingData();
  nn.normalizeData();
  nn.train({ batchSize: 24, epochs: 32 }, finishedTraining);
}
//*******************************
function finishedTraining() {
  button = createButton("Generate Sentences");
  button.mousePressed(check);
}
//*******************************
function check(){
    let s = [];
    append(s, aa[int(random(3))]);
    append(s, bb[int(random(2))]);
    append(s, cc[int(random(3))]);
    append(s, dd[int(random(3))]);
    append(s, ee[int(random(2))]);
    append(s, ff[int(random(3))]);
    createP(makeEnglish(join(s, "")));
    nn.classify(s, function (error, result) {
       createP(result[0].label);
    });
}
//*******************************
function makeEnglish(s){
  s = s.replaceAll('我','I ')
  s = s.replaceAll('你','you ')
  s = s.replaceAll('它','it ')
  s = s.replaceAll('是','be ')
  s = s.replaceAll('想','can think of ')
  return('if '.concat(s))
}
//*******************************
function createTrainingData() {
  let n = 0;
  let words = "";
  for (let i = 0; i < 3000; i++) {
    let s = [];
    for (let i = 0; i < 6; i++) {
      append(s, xx[int(random(5))]);
    }
    let isValid = str(isSyntaxCorrect(s));
    nn.addData(s, [isValid]);
    n++;
  }
  print("all = " + n + " " + "valid = " + knt);
}
//******************************* out of 15,625 permutations
function isSyntaxCorrect(s) {
  let a = s[0];
  let b = s[1];
  let c = s[2];
  let d = s[3];
  let e = s[4];
  let f = s[5];
  if(a=='是' || a== '想')return false; //syntax
  if(b=='我' || b== '你' || b== '它')return false;//syntax
  if(c=='是' || c== '想')return false;//syntax
  if(d=='是' || d== '想')return false; //syntax
  if(e=='我' || e== '你' || e== '它')return false; //syntax
  if(f=='是' || f== '想')return false; //syntax 
  if (((a == c) == d) == f) return false; //all repetitions of the same
  if (b == e) return false; //duplicate verb
  knt++;
  print(join(s, ""))
  return true;
}

/*
initial random seed = 876543210
(so we can replicate the experiment)

Note: I use the following symbols:
"我" = I
"你" = you
"它" = it
"是" = is
"想" = can think

1)
Rules to teach correct the syntax of a sentence-question:
Rule 1:  SVO SVO (S=Subject, V=Verb, O=Object)
Rule 2:  No tautology (S,V,S,V cannot be the same)
Rule 3:  Two verbs (V1 and V2 should be different)

2)
Trained on 3000 randomly generated sentences out of which only 31 are correct (below); everything else is incorrect
我是你它想你 
我想我你是我 
它想你你是它 
它想我它是你 
我是我你想我 
它想我它是我 
它是你你想我 
它是我它想你 
我想它你是你 
我是它你想它 
你是它它想我 
我是你你想我 
我想它我是你 
你是你它想我 
它想你它是它 
你是我你想它 
我想它你是我 
它想它你是我 
它是你你想我 
它想它它是它 
它是你你想它 
你是我我想它 
我想它我是你 
我想它我是我 
我是它我想我 
它想它你是它 
它想你我是它 
它想你我是我 
它想我你是我 
我是你它想你 
你想它你是它 
all = 3000 valid = 31 


3)
Randomly generated sentences that the system say are correct:
你想你我是我 (=if you can think of you I exist)
它想我你是我 (=if it can think of me you are me)
它想你你是你 (=if it can think of you you exist)   !!!!! THIS IS IT
你想你它是你 (=if you can think of me it is you)
我想我它是我 (=if I can think of me it is me)
我是你我想它 (=if I am you you I can think of it)
它想它我是你 (=if it can think of it I am you)
你想我它是我 (=if you can think of me it is me)
你想你你是我 (=if you can think of you you are me)
你想它你是它 (=if you can think of it I am it)
你是你我想它 (=if you can think of you I am it)
它想我你是它 (=if it can think of me you are it)


2938479
all = 3000 valid = 39  1.3%
我是它我想我
你想它你是我
它是我它想它
我想它它是它
它想我我是我
它想你你是你
我是我我想我
If I am it I can think of me 
If you can think of it  you are me 
If it is me it can think of  it  
If I can think of it it exists  
If it can think of me I exist 
If it can think of you you exist 
If I am me I can think of me

if you can think of me you are me
if it is you you can think of you
if it is you you can think of me
if it can think of you you exist
if it is it you can think of me
if I can think of it I am it


//*******************************
function createTrainingData2() {
  let n = 0;
  let words = "";
  for (let a = 0; a < 3; a++)
    for (let b = 0; b < 2; b++)
      for (let c = 0; c < 3; c++)
        for (let d = 0; d < 3; d++)
          for (let e = 0; e < 2; e++)
            for (let f = 0; f < 3; f++) {
              let s = [];
              append(s, aa[a]);
              append(s, bb[b]);
              append(s, cc[c]);
              append(s, dd[d]);
              append(s, ee[e]);
              append(s, ff[f]);
              let isValid = str(isSyntaxCorrect(s));
              nn.addData(s, [isValid]);
              let message = join(s, "");
              words += message + " " + isValid + " | ";
              if (n % 8 == 0) {
                print(words);
                words = "";
              }
              n++;
            }
  print("all = " + n + " " + "valid = " + knt);
}



    // append(s, aa[int(random(3))]);
    // append(s, bb[int(random(2))]);
    // append(s, cc[int(random(3))]);
    // append(s, dd[int(random(3))]);
    // append(s, ee[int(random(2))]);
    // append(s, ff[int(random(3))]);


let aa = ["我", "你", "它"];
let bb = ["是", "想"];
let cc = ["我", "你", "它"];
let dd = ["我", "你", "它"];
let ee = ["是", "想"];
let ff = ["我", "你", "它"];



let inp;

  inp = createInput("");
  inp.position(0, 0);
  inp.size(100);
  inp.input(getInput);
  
  
  //*******************************
function getInput() {
  guess = this.value();
}

    let message = join(s, "");
    words += message + " " + isValid + " | ";
    if (n % 8 == 0) {
      print(words);
      words = "";
    }
    
    
    
    //     generate(evaluate)
//     evaluate(done)
//   }
// }
// //*******************************
// function generate(){
//   let s = [];
//     append(s, aa[int(random(3))]);
//     append(s, bb[int(random(2))]);
//     append(s, cc[int(random(3))]);
//     append(s, dd[int(random(3))]);
//     append(s, ee[int(random(2))]);
//     append(s, ff[int(random(3))]);
//     list += (join(s, ""));
// }
// //*******************************
// function evaluate(){
//    nn.classify(s, function (error, result) {
//        list+=(result[0].label);
//     });
// }
// //*******************************
// function done(){
//   print('done')
// }
*/
