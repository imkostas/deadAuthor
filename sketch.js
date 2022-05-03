let nn;
let xx = ["我", "你", "它", "是", "想"];
//*******************************
function setup() {
  randomSeed(893298);
  nn = ml5.neuralNetwork({ task: "classification", debug: true });
  createTrainingData();
  nn.normalizeData();
  nn.train({ batchSize: 24, epochs: 32 }, finishedTraining);
}
//******************************* out of 15,625 permutations
function createTrainingData() {
  for (let i = 0; i < 3000; i++) {
    let s = [];
    for (let i = 0; i < 6; i++) s.push(xx[int(random(xx.length))]);
    let isValid = str(isSyntaxCorrect(s));
    nn.addData(s, [isValid]);
  }
  print(kk +' valid out of 3000');
}
let kk = 0;
//******************************* 
function isSyntaxCorrect(s) {
  if (s[0] == "是" || s[0] == "想") return false; //syntax
  if (s[1] == "我" || s[1] == "你" || s[1] == "它") return false; //syntax
  if (s[2] == "是" || s[2] == "想") return false; //syntax
  if (s[3] == "是" || s[3] == "想") return false; //syntax
  if (s[4] == "我" || s[4] == "你" || s[4] == "它") return false; //syntax
  if (s[5] == "是" || s[5] == "想") return false; //syntax
  if (((s[0] == s[2]) == s[3]) == s[5]) return false; //all repetitions of the same
  if (s[1] == s[4]) return false; //duplicate verb
  kk++;
  return true;
}
//*******************************
function finishedTraining() {
  for (let i = 0; i < 600; i++) {
    let s = [];
    for (let i = 0; i < 6; i++) s.push(xx[int(random(xx.length))]);
    nn.classify(s, function (error, result) {
      if (result[0].label == "true") print(join(s, ""));
    });
  }
}
