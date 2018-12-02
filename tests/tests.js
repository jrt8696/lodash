const assert = require('assert');
const mocha = require('mocha');
const dash = require('lodash');
(async() =>{
//#region Setup and teardown
    mocha.before(async function(){
        let array = [];
    });

    mocha.after(async function(){
        array = [];
    });
//#endregion
//#region Math
    mocha.describe('Math Tests',function(){
        mocha.it('Should add the int values correctly', async function(){
            assert.equal(dash.add(0,0),0);
            assert.equal(dash.add(1,1),2);
            assert.equal(dash.add(0,1),1);
            assert.equal(dash.add(-1,-1),-2);
            assert.equal(dash.add(-1,1),0);
            assert.equal(dash.add(.5,.5),1);
        });
        mocha.it('Should subtract the values correctly', async function(){
            assert.equal(dash.subtract(0,0),0);
            assert.equal(dash.subtract(1,1),0);
            assert.equal(dash.subtract(0,1),-1);
            assert.equal(dash.subtract(-1,-1),0);
            assert.equal(dash.subtract(-1,1),-2);
            assert.equal(dash.subtract(.5,.5),0);
        });
        mocha.it('Should round up the numbers to the correct precision', async function(){
            assert.equal(dash.ceil(4.006),5);
            assert.equal(dash.ceil(6.004,2),6.01);
            assert.equal(dash.ceil(6040,-2),6100);
            assert.equal(dash.ceil(0,50),0);
            assert.equal(dash.ceil(-5.3),-5);
        });
        mocha.it('Should divide the first number by the second', async function(){
            assert.equal(dash.divide(6,4),1.5);
            assert.equal(dash.divide(10,1),10);
            assert.equal(dash.divide(-25,-5),5);
            assert.equal(dash.divide(0,5),0);
            //I would have expected it to throw an error, but I guess this is by design.
            assert.equal(dash.divide(5,0),'Infinity');
        });
        mocha.it('Should round down the numbers to the correct precision', async function(){
            assert.equal(dash.floor(4.006),4);
            assert.equal(dash.floor(0.046,2),0.04);
            assert.equal(dash.floor(4060,-2),4000);
            assert.equal(dash.floor(0,50),0);
            assert.equal(dash.floor(-5.3),-6);
        });
        mocha.it('Should return the maximum value of the arrays', async function(){
            array = [4,2,8,6]
            assert.equal(dash.max(array),8);
            array = [];
            assert.equal(dash.max(array),undefined);
            array = [1,1,1,1];
            assert.equal(dash.max(array),1);
            array = [0,1,2,3,4,5,6,7,1,8,9];
            assert.equal(dash.max(array),9);
            array = [0,-2,-3,-1,-5,-20];
            assert.equal(dash.max(array),0);
            array = [{ 'n' : 1}, {'n' : 2}];
            assert.deepEqual(dash.maxBy(array, function(o) {return o.n}),{ 'n':2});
            assert.deepEqual(dash.maxBy(array,'n'),{'n' : 2});
        });
        mocha.it('Should return the minimum value of the arrays', async function(){
            array = [4,2,8,6]
            assert.equal(dash.min(array),2);
            array = [];
            assert.equal(dash.min(array),undefined);
            array = [1,1,1,1];
            assert.equal(dash.min(array),1);
            array = [0,1,2,3,4,5,6,7,1,8,9];
            assert.equal(dash.min(array),0);
            array = [0,-2,-3,-1,-5,-20];
            assert.equal(dash.min(array),-20);
            array = [{ 'n' : 1}, {'n' : 2}];
            assert.deepEqual(dash.minBy(array, function(o) {return o.n}),{ 'n':1});
            assert.deepEqual(dash.minBy(array,'n'),{'n' : 1});
        });
        mocha.it('Should return the mean of the arrays', async function(){
            array = [4,2,8,6];
            assert.equal(dash.mean(array),5);
            array = [1,1,1,1,1];
            assert.equal(dash.mean(array),1);
            array = [-4,-2,-8,-6];
            assert.equal(dash.mean(array),-5);
            array = [0,0,0,0,0,0];
            assert.equal(dash.mean(array),0);
            array = [{ 'n' : 4}, {'n' : 2}, {'n' : 8}, { 'n': 6}];
            assert.deepEqual(dash.meanBy(array,function(o){return o.n}),5);
            assert.deepEqual(dash.meanBy(array,'n'),5);
        });
        mocha.it('Should multiply the numbers correctly', async function(){
            assert.equal(dash.multiply(6,4),24);
            assert.equal(dash.multiply(0,1000),0);
            assert.equal(dash.multiply(-1,1),-1);
            assert.equal(dash.multiply(1000,1000),1000000);
            assert.equal(dash.multiply(.5,2),1);
            assert.equal(dash.multiply(.5,.5),.25);
        });
        mocha.it('Should round the numbers up or down depending on how close they are to the next number by the given precision', async function(){
            assert.equal(dash.round(4.006),4);
            assert.equal(dash.round(4.006,2),4.01);
            assert.equal(dash.round(4060,-2),4100);
            assert.equal(dash.round(0,50),0);
            assert.equal(dash.round(-1.5),-1);
        });
        mocha.it('Should sum up the numbers in the array', async function(){
            array = [4,2,8,6];
            assert.equal(dash.sum(array),20);
            array=[-4,-2,-8,-6];
            assert.equal(dash.sum(array),-20);
            array=[0,0,0,0,0];
            assert.equal(dash.sum(array),0);
            array = [.5,.5];
            assert.equal(dash.sum(array),1);
            array = [{'n': 4},{'n': 2},{'n':8}, {'n' : 6}];
            assert.equal(dash.sumBy(array,function(o){return o.n}),20);
            assert.equal(dash.sumBy(array,'n'),20);
        });
    });
//#endregion

//#region Array
    mocha.describe('Array Tests', function(){
        mocha.it('INSERTIT',async function(){
            assert.equal("something","something");
        });
    });
//#endregion
})();