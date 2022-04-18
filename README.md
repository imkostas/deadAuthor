# DeadAuthor
based on Roland Barthes "The Death of the Author"

The code here is a proof of concept for a paper written by authors Filippo Fabrocini and Kostas Terzidis for the journal artificial intelligence and society.

It is basically a classification neural net work used to train the system to recognize syntactically correct present simple first conditional conditional clauses. The steps are as follows:
1. we type a random seed number.
2. we generate 3000 random sentences based on the structure of a hypothetical conditional clause
that is, "If" + Subject + Verb + Object + "," + Subject + Verb + Object
In our case, we use the  words “I”, “you”, “exists”, “can think of”, “it” (or we use the Chinese characters 我", "你", "它", "是", "想" for simplicity).
3. we train the system using these 3000 random sentences. The result is 39 tagged as correct sentences and 2,961 as incorrect
4. We test the system by generating new sentences and asking the system to tell us if it's correct syntactically or not
5. Finally, we observe the output sentences and evaluate them

The results are:

if you can think of me you are me
if it is you you can think of you
if it is you you can think of me
if it can think of you you exist
if it is it you can think of me
if I can think of it I am it



 
