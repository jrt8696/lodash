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
        mocha.it('Should create an array of elements split into groups with length of given size. If array cant be split evenly, the final chunk will be the remaining elements',async function(){
            array = ['a','b','c','d']
            assert.deepEqual(dash.chunk(array,2),[['a','b'],['c','d']]);
            assert.deepEqual(dash.chunk(array,3),[['a','b','c'],['d']]);
            assert.deepEqual(dash.chunk(array),[['a'],['b'],['c'],['d']]);
            assert.deepEqual(dash.chunk(array,4),[array]);
            assert.deepEqual(dash.chunk(array,-1),[]);
        });
        mocha.it('Should return a new array with false, null,0, empty string, undefined and NaN removed', async function(){
            array = [0,1,false,2,'',3,null,undefined,NaN];
            assert.deepEqual(dash.compact(array),[1,2,3]);
            array = [1,2,3,4,5,6]
            assert.deepEqual(dash.compact(array),array);
        });
        mocha.it('Should combine the given arrays/values', async function(){
            array = [1];
            let otherArray = [2,3,4,5,6,7];
            assert.deepEqual(dash.concat(array,otherArray),[1,2,3,4,5,6,7]);
            otherArray = [2,3,[4]];
            assert.deepEqual(dash.concat(array,otherArray),[1,2,3,[4]]);
            assert.deepEqual(dash.concat(array),array);
            assert.deepEqual(dash.concat(array,2),[1,2]);
        });
        mocha.it('Should return an array of array values not included in the other given array', async function(){
            array = [2,1];
            let otherArray = [2,3];
            let thirdArray =[2,2];
            assert.deepEqual(dash.difference(array,otherArray),[1]);
            assert.deepEqual(dash.difference(array,otherArray,thirdArray),[1]);
            assert.deepEqual(dash.difference(array),array);
            thirdArray = [[2]]
            assert.deepEqual(dash.difference(array,thirdArray),[2,1]);
            array = [2.1,1.2];
            otherArray = [2.3,3.4];
            assert.deepEqual(dash.differenceBy(array,otherArray,Math.floor),[1.2]);
            array = [{'x': 2,'y':2},{'x':1,'y':1}];
            otherArray = [{'x':1,'y':2}]
            assert.deepEqual(dash.differenceWith(array,otherArray,dash.isEqual),[{'x':2,'y':2},{'x':1,'y':1}]);
        });
        mocha.it('Should create a slice of the array with n elements dropped from the beginning', async function(){
            array = [1,2,3,4,5]
            assert.deepEqual(dash.drop(array),[2,3,4,5]);
            assert.deepEqual(dash.drop(array,2),[3,4,5]);
            assert.deepEqual(dash.drop(array,5),[]);
            assert.deepEqual(dash.drop(array,0),array);
            assert.deepEqual(dash.drop(array,-1),array);
        });
        mocha.it('Should create a slice of the array with n elements dropped from the end', async function(){
            array = [1,2,3,4,5]
            assert.deepEqual(dash.dropRight(array),[1,2,3,4]);
            assert.deepEqual(dash.dropRight(array,2),[1,2,3]);
            assert.deepEqual(dash.dropRight(array,5),[]);
            assert.deepEqual(dash.dropRight(array,10),[]);
            assert.deepEqual(dash.dropRight(array,0),array);
            assert.deepEqual(dash.dropRight(array,-1),array);
        });
        mocha.it('Should fill elements of the array with given value from start up to but not including, end.', async function(){
            array = [1,2,3,4]
            assert.deepEqual(dash.fill(array,'a'),['a','a','a','a']);
            assert.deepEqual(dash.fill(Array(4),2),[2,2,2,2]);
            assert.deepEqual(dash.fill(array, '*',1,3),['a','*','*','a']);
        });
        mocha.it('Should return the index of the first element predicate returns truthy for instead of the element itself.', async function(){
            array = [{'user':'barney','active':false},{'user':'fred','active':false},{'user':'pebbles','active':true}]
            assert.equal(dash.findIndex(array,function(o){return o.user == 'barney';}),0);
            assert.equal(dash.findIndex(array,{'user':'fred','active':false}),1);
            assert.equal(dash.findIndex(array,['active',false]),0);
            assert.deepEqual(dash.findIndex(array,'active'),2);
        });
        mocha.it('Should return the index of the last element predicate that returns truthy for instead of the element itself', async function(){
            array = [{'user':'barney','active':false},{'user':'fred','active':false},{'user':'pebbles','active':true}]
            assert.equal(dash.findIndex(array,function(o){return o.user == 'pebbles';}),2);
            assert.equal(dash.findIndex(array,{'user':'barney','active':false}),0);
            assert.equal(dash.findIndex(array,['active',false]),0);
            assert.deepEqual(dash.findIndex(array,'active'),2);
        });
        mocha.it('Should flatten the array either one level deep or all the way depending on if it is flatten or flattenDeep', async function(){
            array = [1,[2,[3,[4],5]]]
            assert.deepEqual(dash.flatten(array),[1,2,[3,[4],5]]);
            assert.deepEqual(dash.flattenDeep(array),[1,2,3,4,5]);
            assert.deepEqual(dash.flattenDeep([]),[]);
            assert.deepEqual(dash.flatten([]),[]);
            assert.deepEqual(dash.flattenDepth(array,1),[ 1, 2, [ 3, [ 4 ], 5 ] ]);
            assert.deepEqual(dash.flattenDepth(array,2),[1,2,3,[4],5]);
            assert.deepEqual(dash.flattenDepth(array,10),[1,2,3,4,5]);
        });
        mocha.it('Should create a key value pair from given input', async function(){
            array = [['a',1],['b',2]];
            assert.deepEqual(dash.fromPairs(array),{'a':1,'b':2});
            array = [[]];
            assert.deepEqual(dash.fromPairs(array),{undefined:undefined});
        });
        mocha.it('Should return the first element of the array', async function(){
            array = [1,2,3];
            assert.equal(dash.head(array),1);
            array = [];
            assert.equal(dash.head(array),undefined);
            array =[{1:'a'},{2:'b'}];
            assert.deepEqual(dash.head(array),{1:'a'});
        });
        mocha.it('Should return the index of the first occurrence of the value given', async function(){
            array = [1,2,1,2];
            assert.equal(dash.indexOf(array,2),1);
            assert.equal(dash.indexOf(array,2,2),3);
            assert.equal(dash.indexOf(array,4),-1);
            array =[];
            assert.equal(dash.indexOf(array,1),-1);
        });
        mocha.it('Should get all but the last element of the array.', async function(){
            array = [1,2,3];
            assert.deepEqual(dash.initial(array),[1,2]);
            array = [1];
            assert.deepEqual(dash.initial(array),[]);
            assert.deepEqual(dash.initial([]),[]);
        });
        mocha.it('Should return an array of values that are in both arrays', async function(){
            array = [2,1];
            let otherArray = [2,3]
            assert.deepEqual(dash.intersection(array,otherArray),[2]);
            array,otherArray = []
            assert.deepEqual(dash.intersection(array,otherArray),[]);
            array = [2.1,1.2];
            otherArray = [2.3,3.4];
            assert.deepEqual(dash.intersectionBy(array,otherArray,Math.floor),[2.1]);
            array = [{'x':1}];
            otherArray = [{'x':2}];
            let thirdArray = [{'x':1}];
            assert.deepEqual(dash.intersectionBy([array,otherArray,thirdArray],'x'),[[{'x':1}]]);
            array = [{'x':1,'y':2},{'x':2,'y':1}];
            otherArray = [{'x':1,'y':1},{'x':1,'y':2}];
            assert.deepEqual(dash.intersectionWith(array,otherArray,dash.isEqual),[{'x':1,'y':2}]);
        });
        mocha.it('Should  convert the given array into a string separated by a given string', async function(){
            array = ['a','b','c'];
            assert.equal(dash.join(array,'~'),'a~b~c');
            assert.equal(dash.join(array),'a,b,c');
            array = [1,2,3];
            assert.equal(dash.join(array,' '),'1 2 3');
            assert.equal(dash.join(array,'test'),'1test2test3');
        });
        mocha.it('Should grab the last element of the array', async function(){
            array = [1,2,3];
            assert.equal(dash.last(array),3);
            array[3];
            assert.equal(dash.last(array),3);
            array = [];
            assert.equal(dash.last(array),undefined);
            array = [{'a':1},{'b':2}];
            assert.deepEqual(dash.last(array),{'b':2});
        });
        mocha.it('Should return the last index in the array of the given value.', async function(){
            array = [1,2,1,2]
            assert.equal(dash.lastIndexOf(array,2),3);
            assert.equal(dash.lastIndexOf(array,2,2),1);
        });
        mocha.it('Should get the element at index n of array. If n is negative, the ', async function(){
            array = ['a','b','c','d'];
            assert.equal(dash.nth(array,1),'b');
            assert.equal(dash.nth(array,-2),'c');
            assert.equal(dash.nth(array,12),undefined);
            array = [[]]
            assert.deepEqual(dash.nth(array,0),[]);
            array = []
            assert.equal(dash.nth(array,1),undefined);
        });
        mocha.it('Should remove all instances of the given value from the array', async function(){
            array = ['a','b','c','a','b','c']
            assert.deepEqual(dash.pull(array,'a'),['b','c','b','c']);
            assert.deepEqual(dash.pull(array,'a','c'),['b','b']);
            assert.deepEqual(dash.pull(array,'d'),array);
            assert.deepEqual(dash.pullAll(array,['a','c']),['b','b']);
            array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
            assert.deepEqual(dash.pullAllBy(array,[{'x':1},{'x':3}],'x'),[{'x':2}]);
            array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
            assert.deepEqual(dash.pullAllWith(array,[{'x':3,'y':4}],dash.isEqual),[{'x':1,'y':2},{'x':5,'y':6}]);
            array = ['a','b','c','d'];
            assert.deepEqual(dash.pullAt(array,[1,3]),['b','d']);
            assert.deepEqual(array,['a','c']);
            array = [1,2,3,4]
            assert.deepEqual(dash.remove(array,(n) =>{
                return n% 2 ==0;
            }),[2,4]);
            assert.deepEqual(array,[1,3]);
        });
        mocha.it('Should reverse the array.', async function(){
            array = [1,2,3]
            assert.deepEqual(dash.reverse(array),[3,2,1]);
            array = [{'a':1},{'b':2}];
            assert.deepEqual(dash.reverse(array),[{'b':2},{'a':1}]);
        });
        mocha.it('Should create a slice of array from start up to, but not including the end', async function(){
            array = [1,2,3,4,5]
            assert.deepEqual(dash.slice(array,2),[3,4,5]);
            assert.deepEqual(dash.slice(array,2,1),[]);
        });
        mocha.it('Should return the index the given value should be inserted into the array to keep it sorted.', async function(){
            array = [30,50]
            assert.equal(dash.sortedIndex(array,40),1);
            array = [{'x':4},{'x':5}];
            assert.equal(dash.sortedIndexBy(array,{'x':4}, function(o){return o.x}),0);
            assert.equal(dash.sortedIndexBy(array, {'x':4},'x'), 0);
            assert.equal(dash.sortedLastIndexBy(array,{'x':4},function(o){return o.x}),1);
            assert.equal(dash.sortedLastIndexBy(array,{'x':4},'x'),1);
            array = [4,5,5,5,6]
            assert.equal(dash.sortedIndexOf(array,5),1);
            assert.equal(dash.sortedIndexBy(array,6),4);
            assert.equal(dash.sortedLastIndexOf(array,5),3);
        });
        mocha.it('Should return a duplicate-free version of the given array.', async function(){
            array = [2,1,2]
            assert.deepEqual(dash.uniq(array),[2,1]);
            assert.deepEqual(dash.sortedUniq(array),[2, 1,2]);
            array = [2.1,1.2,2.3]
            assert.deepEqual(dash.uniqBy(array,Math.floor),[2.1,1.2]);
            assert.deepEqual(dash.sortedUniqBy(array,Math.floor),[2.1,1.2,2.3]);
            array = [{'x':1}, {'x':2},{'x':1}];
            assert.deepEqual(dash.uniqBy(array,'x'),[{'x':1},{'x':2}]);
            array =[{'x':1, 'y': 2},{'x':2,'y':1},{'x':1,'y':2}];
            assert.deepEqual(dash.uniqWith(array,dash.isEqual),[{'x':1,'y':2},{'x':2,'y':1}]);
        });
        mocha.it('Should return all but the first element of the array', async function(){
            array = [1,2,3]
            assert.deepEqual(dash.tail(array),[2,3]);
            array = [{'a':1},{'b':2}];
            assert.deepEqual(dash.tail(array),[{'b':2}]);
            array = [1];
            assert.deepEqual(dash.tail(array),[]);
            array = [];
            assert.deepEqual(dash.tail(array),[]);
        });
        mocha.it('Should return a slice array with n elements taken from the beginning or end depending on funciton.', async function(){
            array = [1,2,3]
            assert.deepEqual(dash.take(array),[1]);
            assert.deepEqual(dash.take(array,2),[1,2]);
            assert.deepEqual(dash.take(array,5),[1,2,3]);
            assert.deepEqual(dash.take(array,0),[]);
            assert.deepEqual(dash.takeRight(array),[3]);
            assert.deepEqual(dash.takeRight(array,5),[1,2,3]);
            assert.deepEqual(dash.takeRight(array,2),[2,3]);
            assert.deepEqual(dash.takeRight(array,0),[]);
            array = [
                { 'user': 'barney',  'active': true },
                { 'user': 'fred',    'active': false },
                { 'user': 'pebbles', 'active': false }
            ]
            assert.deepEqual(dash.takeRightWhile(array,function(o){return !o.active}),[{ user: 'fred', active: false },{ user: 'pebbles', active: false } ]);
            assert.deepEqual(dash.takeRightWhile(array, {'user':'pebbles','active':false}),[{'user':'pebbles','active':false}]);
            assert.deepEqual(dash.takeRightWhile(array,['active',false]),[{ user: 'fred', active: false },{ user: 'pebbles', active: false } ]);
            assert.deepEqual(dash.takeRightWhile(array,'active'),[]);
            array = [
                { 'user': 'barney',  'active': false },
                { 'user': 'fred',    'active': false },
                { 'user': 'pebbles', 'active': true }
              ];
              assert.deepEqual(dash.takeWhile(array,function(o){return !o.active}),[{'user':'barney','active':false},{'user':'fred','active':false}]);
              assert.deepEqual(dash.takeWhile(array,{'user':'barney','active':false}),[{'user':'barney','active':false}]);
              assert.deepEqual(dash.takeWhile(array,['active',false]),[{'user':'barney','active':false},{'user':'fred','active':false}]);
              assert.deepEqual(dash.takeWhile(array,'active'),[]);
        });
        mocha.it('Should create an array of unique values in order from given arrays', async function(){
            array = [2];
            let otherArray = [1,2];
            assert.deepEqual(dash.union(array,otherArray),[2,1]);
            array = [2.1];
            otherArray = [1.2,2.3];
            assert.deepEqual(dash.unionBy(array,otherArray, Math.floor),[2.1,1.2]);
            array = [{'x':1}];
            otherArray = [{'x': 2}];
            let thirdArray = [{'x':1}];
            assert.deepEqual(dash.unionBy(array,otherArray,thirdArray,'x'),[{'x':1}, {'x': 2}]);
            array = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
            otherArray = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
            assert.deepEqual(dash.unionWith(array,otherArray, dash.isEqual),[{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]);
        });
        mocha.it('Should create an array of regrouped elements from their pre-zip configuration', async function(){
            array = [['a', 1, true], ['b', 2, false]];
            assert.deepEqual(dash.unzip(array),[['a', 'b'], [1, 2], [true, false]]);
            array = [[1, 10, 100], [2, 20, 200]];
            assert.deepEqual(dash.unzip(array,dash.add),[ [ 1, 2 ], [ 10, 20 ], [ 100, 200 ] ]);
        });
        mocha.it('Should create an array excluding the given values', async function(){
            array = [2,1,2,3]
            assert.deepEqual(dash.without(array,1,2),[3]);
        });
        mocha.it('Should create an array of unique values that is the symmetric difference of the given arrays', async function(){
            array = [2,1];
            let otherArray = [2,3];
            assert.deepEqual(dash.xor(array,otherArray),[1,3]);
            array = [2.1,1.2];
            otherArray = [2.3,3.4];
            assert.deepEqual(dash.xorBy(array,otherArray,Math.floor),[1.2,3.4]);
            array = [{'x':1}];
            otherArray =  [{'x':2},{'x':1}];
            assert.deepEqual(dash.xorBy(array,otherArray,'x'),[{'x':2}]);
            array = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
            otherArray = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
            assert.deepEqual(dash.xorWith(array,otherArray,dash.isEqual),[{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]);
        });
        mocha.it('Should create an array of grouped elements.', async function(){
            array = ['a','b'];
            let otherArray = [1,2]
            let thirdArray = [true,false]
            assert.deepEqual(dash.zip(array,otherArray,thirdArray),[['a', 1, true], ['b', 2, false]]);
            assert.deepEqual(dash.zipObject(array,otherArray),{'a':1,'b':2});
            array =['a.b[0].c', 'a.b[1].d'];
            otherArray = [1,2];
            assert.deepEqual(dash.zipObjectDeep(array,otherArray),{ 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } });
            array = [1,2];
            otherArray = [10,20];
            thirdArray = [100,200];
            assert.deepEqual(dash.zipWith(array,otherArray,thirdArray,function(a,b,c){return a + b +c;}),[111,222]);
        });
    });
//#endregion
})();