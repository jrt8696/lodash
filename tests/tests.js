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
//#region Collection
mocha.describe('Collection tests', function(){
    mocha.it('Should create an object composed of keys genereated from the results of running each element pf collections through the iteratee',async function(){
        array = [6.1,4.2,6.3]
        assert.deepEqual(dash.countBy(array,Math.floor),{'4': 1, '6' : 2});
        array = ['one','two','three'];
        assert.deepEqual(dash.countBy(array,'length'),{'3' : 2, '5': 1});
    });
    mocha.it('Should check if predicate returns truthy for all elements of the collection', async function(){
        array = [true, 1, null, 'yes']
        assert.equal(dash.every(array,Boolean),false);
        array = [
            { 'user': 'barney', 'age': 36, 'active': false },
            { 'user': 'fred',   'age': 40, 'active': false }
          ];
        assert.equal(dash.every(array, {'user':'barney','active':false}),false);
        assert.equal(dash.every(array, ['active',false]),true);
        assert.equal(dash.every(array, 'active'),false);
    });
    mocha.it('Should iterate over the elements and return an array of all elements predicate returns truthy for', async function(){
        array = [
            { 'user': 'barney', 'age': 36, 'active': true },
            { 'user': 'fred',   'age': 40, 'active': false }
          ];
        assert.deepEqual(dash.filter(array, function(o) {return !o.active}),[{'user':'fred','age':40,'active':false}]);
        assert.deepEqual(dash.filter(array,{'age':36, 'active':true}),[{'user':'barney', 'age': 36, 'active':true}]);
        assert.deepEqual(dash.filter(array,['active',false]),[{'user':'fred', 'age':40, 'active':false}]);
        assert.deepEqual(dash.filter(array,'active'),[{'user':'barney','age':36,'active':true}]);
    });
    mocha.it('Should iterate over elements of the collection returning the first element predicate returns truthy for', async function(){
        array = [
            { 'user': 'barney',  'age': 36, 'active': true },
            { 'user': 'fred',    'age': 40, 'active': false },
            { 'user': 'pebbles', 'age': 1,  'active': true }
        ];
        assert.deepEqual(dash.find(array,function(o){return o.age < 40;}),{'user':'barney','age':36,'active':true});
        assert.deepEqual(dash.find(array, {'age':1,'active':true}),{'user':'pebbles', 'age':1,'active':true});
        assert.deepEqual(dash.find(array,['active',false]),{'user':'fred', 'age':40, 'active' :false});
        assert.deepEqual(dash.find(array, 'active'),{'user': 'barney', 'age':36, 'active' : true});
    });
    mocha.it('Should iterate over elements of the collection from right to left and return the first element predicate returns truthy for', async function(){
        array = [1,2,3,4]
        assert.equal(dash.findLast(array,function(n){return n%2==1}),3);
    });
    mocha.it('Should create a flattened array of values by running each element in the collection through iteratee', async function(){
        array = [1,2];
        function duplicate(n){
            return [n,n]
        }
        assert.deepEqual(dash.flatMap(array,duplicate),[1,1,2,2]);
    });
    mocha.it('Should create a flattened array of values by recursively running each element in the collection through iteratee', async function(){
        array = [1,2];
        function duplicate(n){
            return[[[n,n]]];
        }
        assert.deepEqual(dash.flatMapDeep(array,duplicate),[1,1,2,2]);
    });
    mocha.it('Should iterate over elements of collection and invokes iteratee for each element.', async function(){
        array = [1,2]
        let answer = 0;
        dash.forEach(array,function(value){answer +=value});
        assert.equal(answer,3);
        dash.forEach(array,function(value){answer *=value});
        assert.equal(answer,6);
    });
    mocha.it('Should create an object composed of keys generated from the results of running each elmelnt of collections through iteratee.', async function(){
        array = [6.1,4.2,6.3]
        assert.deepEqual(dash.groupBy(array,Math.floor),{'4':[4.2], '6':[6.1,6.3]});
        array = ['one','two','three'];
        assert.deepEqual(dash.groupBy(array,'length'),{'3':['one','two'],'5':['three']});
    });
    mocha.it('Should check and see if the value is in the collection.', async function(){
        array = [1,2,3];
        assert.equal(dash.includes(array,1),true);
        assert.equal(dash.includes(array,1,2),false);
        array = {'a':1,'b':2};
        assert.equal(dash.includes(array,1),true);
        assert.equal(dash.includes('abcd','bc'),true);
    });
    mocha.it('Should invoke the method at path of each element in collection, returning an arrray of the results of each invoked method', async function(){
        array = [5,1,7];
        let otherArray = [3,2,1];
        assert.deepEqual(dash.invokeMap([array,otherArray], 'sort'),[[1,5,7], [1,2,3]]);
        assert.deepEqual(dash.invokeMap([123,456], String.prototype.split,''),[['1','2','3'],['4','5','6']]);
    });
    mocha.it('Should create an object composed of keys generated from the results of running each element through the iteratee', async function(){
        array = [
            { 'dir': 'left', 'code': 97 },
            { 'dir': 'right', 'code': 100 }
          ];
        assert.deepEqual(dash.keyBy(array, function(o){return String.fromCharCode(o.code)}),{ 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } });
        assert.deepEqual(dash.keyBy(array, 'dir'),{ 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } })
    });
    mocha.it('Should create an array of values by running each element in collection through iteratee.', async function(){
        function square(n){
            return n * n;
        }
        assert.deepEqual(dash.map([4,8], square),[16,64]);
        assert.deepEqual(dash.map({'a':4,'b':8},square),[16,64]);
        assert.deepEqual(dash.map([{'user':'barney'},{'user':'fred'}],'user'),['barney','fred']);
    });
    mocha.it('Should sort by allowing specifying the srot orders of the iteratee to sort by', async function(){
        array =  [
            { 'user': 'fred',   'age': 48 },
            { 'user': 'barney', 'age': 34 },
            { 'user': 'fred',   'age': 40 },
            { 'user': 'barney', 'age': 36 }
          ];
        assert.deepEqual(dash.orderBy(array,['user','age'], ['asc','desc']),[{'user':'barney','age':36},{'user':'barney','age':34},{'user':'fred','age':48},{'user':'fred','age':40}]);
    });
    mocha.it('Should reduce collection to a value which is the accumulated result of running each element in collection through iteratee', async function(){
        assert.equal(dash.reduce([1,2],function(sum,n){return sum +n},0),3);
        assert.deepEqual(dash.reduce({'a':1,'b':2,'c':1},function(result,value,key){(result[value] || (result[value]=[])).push(key);return result;},{}),{'1':['a','c'],'2':['b']});
    });
    mocha.it('Should reduce collection like last test escept that it iterates over elements of colelction from right to left', async function(){
        array = [[0, 1], [2, 3], [4, 5]];
        assert.deepEqual(dash.reduceRight(array,function(flattened,other){return flattened.concat(other)},[]),[4,5,2,3,0,1]);
    });
    mocha.it('Should return the elements of collection that predicate does not return truthy for.', async function(){
        array = [
            { 'user': 'barney', 'age': 36, 'active': false },
            { 'user': 'fred',   'age': 40, 'active': true }
          ];
        assert.deepEqual(dash.reject(array,function(o){return !o.active}),[{'user':'fred','age':40,'active':true}]);
        assert.deepEqual(dash.reject(array, {'age':40,'active':true}),[{'user': 'barney', 'age': 36, 'active': false }]);
        assert.deepEqual(dash.reject(array,['active',false]),[{ 'user': 'fred',   'age': 40, 'active': true }]);
        assert.deepEqual(dash.reject(array,'active'),[{ 'user': 'barney', 'age': 36, 'active': false }]);
    });
    mocha.it('Should return a random element from the collection.', async function(){
        array = [1,2,3,4]
        let sample = dash.sample(array);
        assert.equal(true,array.indexOf(sample) !=-1);
    });
    mocha.it('Should get n random elements at unique keys.', async function(){
        array = [1,2,3];
        let sample = dash.sampleSize(array,2);
        for(let index = 0; index<2; index++){
            assert.equal(true,array.indexOf(sample[index] )!=-1);
        }
    });
    mocha.it('Should get the size of collection', async function(){
        assert.equal(dash.size([1,2,3]),3);
        assert.equal(dash.size('pebbles'),7);
        assert.equal(dash.size({'a':1,'b':2}),2);
    });
    mocha.it('Should check if predicate returns truthy for any element of collection', async function(){
        array = [
            { 'user': 'barney', 'active': true },
            { 'user': 'fred',   'active': false }
          ];
        assert.equal(dash.some([null,0,'yes',false]),true);
        assert.equal(dash.some(array,{'user':'barney','active':false}),false);
        assert.equal(dash.some(array,['active',false]),true);
        assert.equal(dash.some(array,'active'),true);
    });
    mocha.it('Should create an array of elements, sorted in ascending order by the results of running each element in a collection through each iteratee.', async function(){
        array  = [
            { 'user': 'fred',   'age': 48 },
            { 'user': 'barney', 'age': 36 },
            { 'user': 'fred',   'age': 40 },
            { 'user': 'barney', 'age': 34 }
          ];
        assert.deepEqual(dash.sortBy(array, [function(o){return o.user;}]),[{'user': 'barney','age':36},{'user':'barney','age':34},{'user':'fred','age':48},{'user':'fred','age':40}]);
    });
});
//#endregion
//#region Date
mocha.describe('Date Test', function(){
    mocha.it('Should return the timestamp of the number of milliseconds that have elapsed since the Unix epoch.',async function(){
        //Within a second is good enough.
        assert.equal(Math.floor(Date.now()/1000) == Math.floor(dash.now() /1000),true);
    });
});

//#endregion
//#region Lang Tests
mocha.describe('Lang tests', function(){
    mocha.it('Should cast value as an array if its not one already',async function(){
        assert.deepEqual(dash.castArray(1),[1]);
        assert.deepEqual(dash.castArray({'a':1}),[{'a':1}]);
        assert.deepEqual(dash.castArray('abc'),['abc']);
        assert.deepEqual(dash.castArray(null),[null]);
        assert.deepEqual(dash.castArray(undefined),[undefined]);
        assert.deepEqual(dash.castArray(),[]);
        array = [1,2,3];
        assert.deepEqual(dash.castArray(array),array);
    });
    mocha.it('Should create a shallow clone of the value', async function(){
        array = [{'a' :1},{'b':2}];
        assert.deepEqual(dash.clone(array),array);
    });
    mocha.it('Should create a deep clone of the value', async function(){
        array = [{'a':1},{'b':2}];
        assert.deepEqual(dash.cloneDeep(array),array);
    });
    mocha.it('Should check if the object conforms to source by invoking the predicate properties of source.', async function(){
        array = {'a':1,'b':2};
        assert.equal(dash.conformsTo(array,{'b':function(n){return n>1;}}),true);
        assert.equal(dash.conformsTo(array, {'b':function(n){return n>2;}}),false);
    });
    mocha.it('Should perform a SameValueZero comparison between two values to determine if they are equivalent.', async function(){
        array = {'a':1};
        let other = {'a':1};
        assert.equal(dash.eq(array,other),false);
        assert.equal(dash.eq(array,array),true);
        assert.equal(dash.eq('a','a'),true);
        assert.equal(dash.eq('a',Object('a')),false);
        assert.equal(dash.eq(NaN,NaN),true);
    });
    mocha.it('Should check if value is greater than other', async function(){
        assert.equal(dash.gt(3,1),true);
        assert.equal(dash.gt(3,3),false);
        assert.equal(dash.gt(1,3),false);
    });
    mocha.it('Should check if value is greater than or equal to other.', async function(){
        assert.equal(dash.gte(3,1),true);
        assert.equal(dash.gte(3,3),true);
        assert.equal(dash.gte(1,3),false);
    });
    mocha.it('Should check if value is likely an  arguments object', async function(){
        assert.equal(dash.isArguments(function(){return arguments;}()),true);
        assert.equal(dash.isArguments([1,2,3]),false);
    });
    mocha.it('Should check if value is classified as an Array object.', async function(){
        assert.equal(dash.isArray([1,2,3]),true);
        assert.equal(dash.isArray('abc'),false);
        assert.equal(dash.isArray(dash.noop),false);
    });
    mocha.it('Should check if the value is classified as an ArrayBuffer object.', async function(){
        assert.equal(dash.isArrayBuffer(new ArrayBuffer(2)),true);
        assert.equal(dash.isArrayBuffer(new Array(2)),false);
    });
    mocha.it('Should check if the value is array-like', async function(){
        assert.equal(dash.isArrayLike([1,2,3]),true);
        assert.equal(dash.isArrayLike('abc'),true);
        assert.equal(dash.isArrayLike(dash.noop),false);
    });
    mocha.it('Should check if the value is array or object like', async function(){
        assert.equal(dash.isArrayLikeObject([1,2,3]),true);
        assert.equal(dash.isArrayLikeObject('abc'),false);
        assert.equal(dash.isArrayLikeObject(dash.noop),false);
    });
    mocha.it('Should check if the value is a boolean primitive object', async function(){
        assert.equal(dash.isBoolean(false),true);
        assert.equal(dash.isBoolean(null),false);
    });
    mocha.it('Should check if the value is a buffer', async function(){
        assert.equal(dash.isBuffer(new Buffer(2)),true);
        assert.equal(dash.isBuffer(new Uint16Array(2)),false);
    });
    mocha.it('Should check if the value is classified as a Date object', async function(){
        assert.equal(dash.isDate(new Date),true);
        assert.equal(dash.isDate('Mon December 3rd 2018'),false);
    });
    mocha.it('Should check if the value is an empty object, collection map, or set.', async function(){
        assert.equal(dash.isEmpty(null),true);
        assert.equal(dash.isEmpty(true), true);
        assert.equal(dash.isEmpty(1),true);
        assert.equal(dash.isEmpty([1,2,3]),false);
        assert.equal(dash.isEmpty({'a':1}),false);
    });
    mocha.it('Should perform a deep comparison between two values to determine if they are equivalent', async function(){
        array = {'a':1};
        let otherArray = {'a':1};
        assert.equal(dash.isEqual(array,otherArray),true);
        function isGreeting(value){
            return /^h(?:i|ello)$/.test(value);
        }
        function customizer(objValue, othValue){
            if(isGreeting(objValue) && isGreeting(othValue)){
                return true;
            }
        }
        array = ['hello','goodbye'];
        otherArray = ['hi','goodbye'];
        assert.equal(dash.isEqualWith(array,otherArray,customizer),true);
    });
    mocha.it('Should check if value is an error.', async function(){
        assert.equal(dash.isError(new Error),true);
        assert.equal(dash.isError(Error),false);
    });
    mocha.it('Should check if value is a finite primitive number.', async function(){
        assert.equal(dash.isFinite(3),true);
        assert.equal(dash.isFinite(Number.MIN_VALUE),true);
        assert.equal(dash.isFinite(Infinity),false);
        assert.equal(dash.isFinite('3'),false);
    });
    mocha.it('Should check if value is classified as a Function object.', async function(){
        assert.equal(dash.isFunction(dash),true);
        assert.equal(dash.isFunction(/abc/),false);
    });
    mocha.it('Should check if value is an integer.', async function(){
        assert.equal(dash.isInteger(3),true);
        assert.equal(dash.isInteger(Number.MIN_VALUE),false);
        assert.equal(dash.isInteger(Infinity),false);
        assert.equal(dash.isInteger('3'),false);
    });
    mocha.it('Should check if value is a valid array-like length.', async function(){
        assert.equal(dash.isLength(3),true);
        assert.equal(dash.isLength(Number.MIN_VALUE),false);
        assert.equal(dash.isLength(Infinity),false);
        assert.equal(dash.isLength('3'),false);
    });
    mocha.it('Should check if value is classifed as a Map object', async function(){
        assert.equal(dash.isMap(new Map),true);
        assert.equal(dash.isMap(new WeakMap),false);
    });
    mocha.it('Should check if the given value is in object.', async function(){
        array = {'a':1, 'b':2}
        assert.equal(dash.isMatch(array,{'b':2}),true);
        assert.equal(dash.isMatch(array,{'b':1}),false);
    });
    mocha.it('Should check if value is NaN', async function(){
        assert.equal(dash.isNaN(NaN),true);
        assert.equal(dash.isNaN(new Number(NaN)),true);
        assert.equal(dash.isNaN(undefined),false);
    });
    mocha.it('Should check if value is a pristine native funciton.', async function(){
        assert.equal(dash.isNative(Array.prototype.push),true);
        assert.equal(dash.isNative(dash),false);
    });
    mocha.it('Should check if value is null or undefined', async function(){
        assert.equal(dash.isNil(null),true);
        assert.equal(dash.isNil(void 0),true);
        assert.equal(dash.isNil(NaN),false);
    });
    mocha.it('Should check if value is null.', async function(){
        assert.equal(dash.isNull(null),true);
        assert.equal(dash.isNull(void 0),false);
    });
    mocha.it('Should check if the value is classified as a Number primitive or object', async function(){
        assert.equal(dash.isNumber(3),true);
        assert.equal(dash.isNumber(Number.MIN_VALUE),true);
        assert.equal(dash.isNumber(Infinity),true);
        assert.equal(dash.isNumber('2'),false);
    });
    mocha.it('Should check if value is the language type of Object.', async function(){
        assert.equal(dash.isObject({}),true);
        assert.equal(dash.isObject([1,2,3]),true);
        assert.equal(dash.isObject(dash.noop),true);
        assert.equal(dash.isObject(null),false);
    });
    mocha.it('Should check if value is object-like.', async function(){
        assert.equal(dash.isObjectLike({}),true);
        assert.equal(dash.isObjectLike([1,3,3]),true);
        assert.equal(dash.isObjectLike(dash.noop),false);
        assert.equal(dash.isObjectLike(null),false);
    });
    mocha.it('Should check if value is a plain object, that is, an object created by the Object constructor or one with [[Prototype]] of null.', async function(){
        function Foo(){
            this.a = 1;
        }
        assert.equal(dash.isPlainObject(new Foo),false);
        assert.equal(dash.isPlainObject([1,2,3]),false);
        assert.equal(dash.isPlainObject({'x':0,'y':0}),true);
        assert.equal(dash.isPlainObject(Object.create(null)),true);
    });
    mocha.it('Should check if value is aclassified as a RegExp object.', async function(){
        assert.equal(dash.isRegExp(/abc/),true);
        assert.equal(dash.isRegExp('/abc/'),false);
    });
    mocha.it('Should check if value is a safe integer.', async function(){
        assert.equal(dash.isSafeInteger(3),true);
        assert.equal(dash.isSafeInteger(Number.MIN_VALUE),false);
        assert.equal(dash.isSafeInteger(Infinity),false);
        assert.equal(dash.isSafeInteger('3'),false);
    });
    mocha.it('Should check if value is classified as a Set object', async function(){
        assert.equal(dash.isSet(new Set),true);
        assert.equal(dash.isSet(new WeakSet),false);
    });
    mocha.it('Should check if value is classified as a String primitive or object', async function(){
        assert.equal(dash.isString('abc'),true);
        assert.equal(dash.isString(1),false);
    });
    mocha.it('Should check if value is classified as a Symbol primitive or object.', async function(){
        assert.equal(dash.isSymbol(Symbol.iterator),true);
        assert.equal(dash.isSymbol('abc'),false);
    });
    mocha.it('Should check if value is classified as a typed array.', async function(){
        assert.equal(dash.isTypedArray(new Uint8Array),true);
        assert.equal(dash.isTypedArray([]),false);
    });
    mocha.it('Should check if value is undefined', async function(){
        assert.equal(dash.isUndefined(void 0),true);
        assert.equal(dash.isUndefined(null),false);
    });
    mocha.it('Should check if value is classified as a WeakMap object.', async function(){
        assert.equal(dash.isWeakMap(new WeakMap),true);
        assert.equal(dash.isWeakMap(new Map),false);
    });
    mocha.it('Should check if value is classified as a WeakSet object', async function(){
        assert.equal(dash.isWeakSet(new WeakSet),true);
        assert.equal(dash.isWeakSet(new Set),false);
    });
    mocha.it('Should check if value is less than other', async function(){
        assert.equal(dash.lt(1,3),true);
        assert.equal(dash.lt(3,3),false);
        assert.equal(dash.lt(3,1),false);
    });
    mocha.it('Should check if value is less than or equal to other.', async function(){
        assert.equal(dash.lte(1,3),true);
        assert.equal(dash.lte(3,3),true);
        assert.equal(dash.lte(3,1),false);
    });
    mocha.it('Should convert value into an array.', async function(){
        assert.deepEqual(dash.toArray({'a':1, 'b':2}),[1,2]);
        assert.deepEqual(dash.toArray('abc'),['a','b','c']);
        assert.deepEqual(dash.toArray(1),[]);
        assert.deepEqual(dash.toArray(null),[]);
    });
    mocha.it('Should convert value to a finite number', async function(){
        assert.equal(dash.toFinite(3.2),3.2);
        assert.equal(dash.toFinite(Number.MIN_VALUE),5e-324);
        assert.equal(dash.toFinite(Infinity),1.7976931348623157e+308);
        assert.equal(dash.toFinite('3.2'),3.2);
    });
    mocha.it('Should convert value to an integer', async function(){
        assert.equal(dash.toInteger(3.2),3);
        assert.equal(dash.toInteger(Number.MIN_VALUE),0);
        assert.equal(dash.toInteger(Infinity),1.7976931348623157e+308);
        assert.equal(dash.toInteger('3.2'),3);
    });
    mocha.it('Should convert value to an integer suitable for use as the length of an array-like object', async function(){
        assert.equal(dash.toLength(3.2),3);
        assert.equal(dash.toLength(Number.MIN_VALUE),0);
        assert.equal(dash.toLength(Infinity),4294967295);
        assert.equal(dash.toLength('3.2'),3);
    });
    mocha.it('Should convert value to a number.', async function(){
        assert.equal(dash.toNumber(3.2),3.2);
        assert.equal(dash.toNumber(Number.MIN_VALUE),5e-324);
        assert.equal(dash.toNumber(Infinity),Infinity);
        assert.equal(dash.toNumber('3.2'),3.2);
    });
    mocha.it('Should convert value to a plain object flattening inherited enumerable string keyed properties of value to own properties of the plain object', async function(){
        function Foo(){
            this.b = 2;
        }
        Foo.prototype.c=3;
        assert.deepEqual(dash.assign({'a':1},new Foo),{'a' : 1, 'b':2});
        assert.deepEqual(dash.assign({'a':1}, dash.toPlainObject(new Foo)),{'a':1, 'b' :2,'c':3});
    });
    mocha.it('Should convert value to a safe integer.', async function(){
        assert.equal(dash.toSafeInteger(3.2),3);
        assert.equal(dash.toSafeInteger(Number.MIN_VALUE),0);
        assert.equal(dash.toSafeInteger(Infinity),9007199254740991);
        assert.equal(dash.toSafeInteger('3.2'),3);
    });
    mocha.it('Should convert value to a tring', async function(){
        assert.equal(dash.toString(null),'');
        assert.equal(dash.toString(-0),'-0');
        assert.equal(dash.toString([1,2,3]),'1,2,3');
    });
});

//#endregion
//#region Number Test
mocha.describe('Number tests', function(){
    mocha.it('Should clamp number within the inclusive lower and upper bounds.',async function(){
        assert.equal(dash.clamp(-10,-5,5),-5);
        assert.equal(dash.clamp(10,-5,5),5);
    });
    mocha.it('Should check if n is between start and up to, but not including, end', async function(){
        assert.equal(dash.inRange(3,2,4),true);
        assert.equal(dash.inRange(4,8),true);
        assert.equal(dash.inRange(4,2),false);
        assert.equal(dash.inRange(2,2),false);
        assert.equal(dash.inRange(1.2,2),true);
        assert.equal(dash.inRange(5.2,4),false);
        assert.equal(dash.inRange(-3,-2,-6),true);
    });
    mocha.it('Should produce a random number between the inclusive lower and upper bounds', async function(){
        let rand = dash.random(0,5);
        assert.equal(rand >=0 && rand<=5,true);
        rand = dash.random(5);
        assert.equal(rand >=0 && rand<=5,true);
    });
});
//#endregion
//#region Object Tests
mocha.describe('Object Tests', function(){
    mocha.it('Should assign own enumerable string keyed properties of source objects to the destination object',async function(){
        function Foo(){
            this.a =1;
        }
        function Bar(){
            this.c = 3;
        }
        Foo.prototype.b = 2;
        Bar.prototype.d = 4;
        assert.deepEqual(dash.assign({'a':0},new Foo, new Bar),{'a':1,'c':3});
    });
    mocha.it('Should assign and iterate over own and inherited source properties', async function(){
        function Foo(){
            this.a =1;
        }
        function Bar(){
            this.c = 3;
        }
        Foo.prototype.b = 2;
        Bar.prototype.d =4;
        assert.deepEqual(dash.assignIn({'a':0},new Foo, new Bar),{'a':1,'b':2,'c':3,'d':4});
    });
    mocha.it('Should assign and iterate over own and inherited source properties with  a customizer which is invoked to produce the assigned values.', async function(){
        function customizer(objValue, srcValue){
            return dash.isUndefined(objValue) ? srcValue :objValue;
        }
        let defaults = dash.partialRight(dash.assignInWith,customizer);
        assert.deepEqual(defaults({'a':1},{'b':2},{'a':3}),{'a':1,'b':2});
    });
    mocha.it('Should assign and iterate over own and inherited source properties with a customizer which is invoked to produce the assigned values.', async function(){
        function customizer(objValue, srcValue){
            return dash.isUndefined(objValue) ? srcValue: objValue;
        }
        let defaults = dash.partialRight(dash.assignWith,customizer);
        assert.deepEqual(defaults({'a':1}, {'b':2}, {'a':3}),{'a':1,'b':2});
    });
    mocha.it('Should create an array of values corresponding to paths of object.', async function(){
        array = {'a': [{'b':{'c':3}},4]};
        assert.deepEqual(dash.at(array,['a[0].b.c','a[1]']),[3,4]);
    });
    mocha.it('Should create an object that inherits from the prototype object.', async function(){
        function Shape(){
            this.x = 0;
            this.y = 0;
        }
        function Circle(){
            Shape.call(this);
        }
        Circle.prototype = dash.create(Shape.prototype,{
            'constructor' : Circle
        });
        let circle = new Circle;
        assert.deepEqual(circle instanceof Circle,true);
        assert.equal(circle instanceof Shape,true);
    });
    mocha.it('Should assign own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to undefined.', async function(){
        assert.deepEqual(dash.defaults({'a':1},{'b':2}, {'a':3}),{'a':1,'b':2});
    });
    mocha.it('Should assign own and inherited enumerable string keyed properties of source objects to the destination onject recursively.', async function(){
        assert.deepEqual(dash.defaultsDeep({'a':{'b':2}},{'a':{'b':1,'c':3}}),{'a':{'b':2,'c':3}});
    });
    mocha.it('Should return the key of the first element predicate returns truthy instead of the element itself', async function(){
        array = {
            'barney':  { 'age': 36, 'active': true },
            'fred':    { 'age': 40, 'active': false },
            'pebbles': { 'age': 1,  'active': true }
          };
        assert.deepEqual(dash.findKey(array, function(o){return o.age <40;}),'barney');
        assert.equal(dash.findKey(array, {'age':1,'active':true}),'pebbles');
        assert.equal(dash.findKey(array,['active',false]),'fred');
        assert.equal(dash.findKey(array,'active'),'barney');
    });
    mocha.it('Should return the key of the last element predicate returns truthy instead of the element itself.', async function(){
        array  = {
            'barney':  { 'age': 36, 'active': true },
            'fred':    { 'age': 40, 'active': false },
            'pebbles': { 'age': 1,  'active': true }
          };
        assert.deepEqual(dash.findLastKey(array,function(o){return o.age <40}),'pebbles');
        assert.equal(dash.findLastKey(array,{'age':36,'active':true}),'barney');
        assert.equal(dash.findLastKey(array,['active',false]),'fred');
        assert.equal(dash.findLastKey(array, 'active'),'pebbles');
    });
    mocha.it('Should create an array of function property names from own enumerable properties of object.', async function(){
        function Foo(){
            this.a = dash.constant('a');
            this.b = dash.constant('b');
        }
        Foo.prototype.c = dash.constant('c');
        assert.deepEqual(dash.functions(new Foo),['a','b']);
        assert.deepEqual(dash.functionsIn(new Foo),['a','b','c']);
    });
    mocha.it('Should get the value at path of object', async function(){
        array = { 'a':[{'b':{'c':3}}]};
        assert.deepEqual(dash.get(array,'a[0].b.c'),3);
        assert.equal(dash.get(array, ['a','0','b','c']),3);
        assert.equal(dash.get(array,'a.b.c','default'),'default');
    });
    mocha.it('Should check if path is a direct property of object.', async function(){
        array = {'a':{'b':2}};
        let otherArray = dash.create({'a':dash.create({'b':2})});
        assert.deepEqual(dash.has(array,'a'),true);
        assert.equal(dash.has(array,'a.b'),true);
        assert.equal(dash.has(array,['a','b']),true);
        assert.equal(dash.has(otherArray,'a'),false);
    });
    mocha.it('Should check ifpath is a direct or inherited property of object', async function(){
        array = dash.create({'a':dash.create({'b':2})});
        assert.deepEqual(dash.hasIn(array, 'a'),true);
        assert.equal(dash.hasIn(array,'a.b'),true);
        assert.equal(dash.hasIn(array,['a','b']),true);
        assert.equal(dash.hasIn(array,'b'),false);
    });
    mocha.it('Should create an object composed of the inverted keys and values of given object.', async function(){
        array = {'a':1,'b':2,'c':1};
        assert.deepEqual(dash.invert(array),{'1':'c','2':'b'});
    });
    mocha.it('Should create an object of the inverted keys and values of given object generated from the results of running each element of object through iteratee.', async function(){
        array = {'a':1,'b':2,'c':1};
        assert.deepEqual(dash.invertBy(array),{'1':['a','c'],'2':['b']});
        assert.deepEqual(dash.invertBy(array,function(value){return 'group' + value;}),{'group1':['a','c'],'group2':['b']});
    });
    mocha.it('Should invoke the method at path of object.', async function(){
        array = {'a':[{'b':{'c':[1,2,3,4]}}]};
        assert.deepEqual(dash.invoke(array,'a[0].b.c.slice',1,3),[2,3]);
    });
    mocha.it('Should create an array of the own enumerable property names of object.', async function(){
        function Foo(){
            this.a = 1;
            this.b =2;
        }
        Foo.prototype.c = 3;
        assert.deepEqual(dash.keys(new Foo),['a','b']);
        assert.deepEqual(dash.keys('hi'),['0','1']);
    });
    mocha.it('Should create an array of the own and inherited enumerable property names of object.', async function(){
        function Foo(){
            this.a = 1;
            this.b = 2;
        }
        Foo.prototype.c = 3;
        assert.deepEqual(dash.keysIn(new Foo),['a','b','c']);
    });
    mocha.it('Should create an object with the same values as object and keys gereated by running each own enumerable string keyed property of object through iteratee.', async function(){
        assert.deepEqual(dash.mapKeys({'a':1,'b':2},function(value,key){return key +value}),{'a1':1,'b2':2});
    });
    mocha.it('Should create an object with the same keys as object and values generated by running each own enumerable string keyed property of object though iteratee.', async function(){
        array = {
            'fred':    { 'user': 'fred',    'age': 40 },
            'pebbles': { 'user': 'pebbles', 'age': 1 }
          };
        assert.deepEqual(dash.mapValues(array, function(o) {return o.age}),{'fred':40,'pebbles':1});
        assert.deepEqual(dash.mapValues(array,'age'),{'fred':40,'pebbles':1});
    });
    mocha.it('Should recursively merge own and inherited enumerable string keyed properties of source objects into the destination object.', async function(){
        array = {
            'a': [{ 'b': 2 }, { 'd': 4 }]
          };
          let other = {
            'a': [{ 'c': 3 }, { 'e': 5 }]
          };
        assert.deepEqual(dash.merge(array,other),{'a':[{'b':2,'c':3},{'d':4,'e':5}]});
    });
    mocha.it('Should accept customizer which is invoked to produce the merged values of the destination and source properties', async function(){
        function customizer(objValue, srcValue){
            if(dash.isArray(objValue)){
                return objValue.concat(srcValue);
            }
        }
        array = {'a':[1],'b':[2]};
        let other = {'a':[3],'b':[4]};
        assert.deepEqual(dash.mergeWith(array,other,customizer),{'a':[1,3],'b':[2,4]});
    });
    mocha.it('Should create an object composed of the own and inherited enumerable property paths of object that are not omitted.', async function(){
        array = {'a':1,'b':'2','c':3};
        assert.deepEqual(dash.omit(array,['a','c']),{'b':'2'});
    });
    mocha.it('Should create an object composed of the own and inherited enumerable string keyed properties of object composed of the own and inherited enumerable string keyed properties of object hta predicate doesnt return truthy for.', async function(){
        array = {'a':1,'b':'2','c':3};
        assert.deepEqual(dash.omitBy(array, dash.isNumber),{'b':'2'});
    });
    mocha.it('Should create an object composed of the picked object properties.', async function(){
        array = {'a':1,'b':'2','c':3};
        assert.deepEqual(dash.pick(array,['a','c']),{'a':1,'c':3});
    });
    mocha.it('Should create an object composed of the object properties predicate returns truthy for.', async function(){
        array = {'a':1,'b':'2','c':3};
        assert.deepEqual(dash.pickBy(array,dash.isNumber),{'a':1,'c':3});
    });
    mocha.it('Should act like .get except that if the resolved value is a function it is invoked with the this binding of its parent object and its result is returned.', async function(){
        array = { 'a': [{ 'b': { 'c1': 3, 'c2': dash.constant(4) } }] };
        assert.deepEqual(dash.result(array, 'a[0].b.c1'),3);
        assert.equal(dash.result(array,'a[0].b.c2'),4);
        assert.equal(dash.result(array,'a[0].b.c3','default'),'default');
        assert.equal(dash.result(array,'a[0].b.c3',dash.constant('default')),'default');
    });
    mocha.it('Should set the value at path of object.', async function(){
        array = { 'a': [{ 'b': { 'c': 3 } }] };
        dash.set(array,'a[0].b.c',4)
        assert.deepEqual(array.a[0].b.c,4);
        dash.set(array,['x','0','y','z'],5);
        assert.equal(array.x[0].y.z,5);
    });
    mocha.it('Should set the value at path of object and accept customizer which is invoked to produce the objects of path.', async function(){
        let object ={}
        assert.deepEqual(dash.setWith(object,'[0][1]','a',Object),{'0':{'1':'a'}});
    });
    mocha.it('Should create an array of own enumerable string keyed-value pairs for object which can be conusmed by fromPairs', async function(){
        function Foo(){
            this.a = 1;
            this.b = 2;
        }
        Foo.prototype.c = 3;
        assert.deepEqual(dash.toPairs(new Foo),[['a',1],['b',2]]);
    });
    mocha.it('Should create an array of own and inherted enumerable string keyed-value pairs for object which can be consumed by fromPairs, If object is a map or set, its entries are returned.', async function(){
        function Foo(){
            this.a = 1;
            this.b = 2;
        }
        Foo.prototype.c = 3;
        assert.deepEqual(dash.toPairsIn(new Foo),[['a',1],['b',2],['c',3]]);
    });
    mocha.it('Should transform object to a new accumulator object which is the result of running each of its own enumerable string keyed properties through iteratee.', async function(){
        let valueOne = dash.transform([2,3,4],function(result, n){
            result.push(n *=n);
            return n% 2 ==0;
        }, []);
        assert.deepEqual(valueOne,[4,9]);
        let valueTwo = dash.transform({'a':1,'b':2,'c':1},function(result,value,key){
        (result[value] || (result[value] =[])).push(key);
        },{});
        assert.deepEqual({'1':['a','c'],'2':['b']},valueTwo);
    });
    mocha.it('Should remove the property at path of object.', async function(){
        array = { 'a': [{ 'b': { 'c': 7 } }] };
        assert.deepEqual(dash.unset(array, 'a[0].b.c'),true);
        assert.deepEqual(array,{'a':[{'b':{}}]});
        assert.equal(dash.unset(array,['a','0','b','c']),true);
        assert.deepEqual(array,{'a':[{'b':{}}]});
    });
    mocha.it('Should accept updater to produce the value to set.', async function(){
        array = { 'a': [{ 'b': { 'c': 3 } }] };
        dash.update(array,'a[0].b.c',function(n){return n*n;});
        assert.deepEqual(array.a[0].b.c,9);
        dash.update(array,'x[0].y.z',function(n){return n? n+1:0;});
        assert.equal(array.x[0].y.z,0);
    });
    mocha.it('Should accept customizer which is invoked to produce the objects of path.', async function(){
        let object = {};
        assert.deepEqual(dash.updateWith(object,'[0][1]',dash.constant('a'),Object),{'0':{'1':'a'}});
    });
    mocha.it('Should create an array of the own enumerable string keyed property values of object.', async function(){
        function Foo(){
            this.a =1;
            this.b =2;
        }
        Foo.prototype.c=3;
        assert.deepEqual(dash.values(new Foo),[1,2]);
        assert.deepEqual(dash.values('hi'),['h','i']);
    });
    mocha.it('Should create an array of teh own and inherited enumerable string keyed property values of object.', async function(){
        function Foo(){
            this.a =1;
            this.b = 2;
        }
        Foo.prototype.c = 3;
        assert.deepEqual(dash.valuesIn(new Foo),[1,2,3]);
    });
});
//#endregion
//#region Seq tests
mocha.describe('Seq tests', function(){
    mocha.it('Should create a lodash wrapper instance that wraps value with explicit method chain sequences enabled.',async function(){
        array = [
            { 'user': 'barney',  'age': 36 },
            { 'user': 'fred',    'age': 40 },
            { 'user': 'pebbles', 'age': 1 }
        ];
        let youngest = dash.chain(array)
                .sortBy('age')
                .map(function(o){
                    return o.user + ' is ' + o.age;
                })
                .head()
                .value();
        assert.equal(youngest,'pebbles is 1');
    });
    mocha.it('Should invoke interceptor and return value.', async function(){
        assert.deepEqual(dash([1,2,3]).tap(function(array){
            array.pop();
        }).reverse().value(),[2,1]);
    });
    mocha.it('Should return the result of interceptor.', async function(){
        assert.deepEqual(dash(' abc ').chain().trim().thru(function(value){
            return [value];
        }).value(),['abc']);
    });
    mocha.it('Should enable the wrapper to be iterable', async function(){
        let wrapped = dash([1,2]);
        wrapped[Symbol.iterator]() === wrapped;
        assert.deepEqual(Array.from(wrapped),[1,2]);
    });
    mocha.it('Should be the wrapper version of dash.at', async function(){
        array = { 'a': [{ 'b': { 'c': 3 } }, 4] };
        assert.deepEqual(dash(array).at(['a[0].b.c','a[1]']).value(),[3,4]);
    });
    mocha.it('Should create a lodash wrapper instance with explicit method chain sequences enabled.', async function(){
        array= [
            { 'user': 'barney', 'age': 36 },
            { 'user': 'fred',   'age': 40 }
        ];
        
        assert.deepEqual(dash(array).head(),{'user':'barney','age':36});
        assert.deepEqual(dash(array).chain().head().pick('user').value(),{'user':'barney'});
    });
    mocha.it('Should execute the chain sequence and return the wrapped result.', async function(){
        array =[1,2];
        let wrapped = dash(array).push(3);
        assert.deepEqual(array,[1,2]);
        wrapped = wrapped.commit();
        assert.deepEqual(array,[1,2,3]);
        assert.equal(wrapped.last(),3);
        assert.deepEqual(array,[1,2,3]);
    });
    mocha.it('Should get the next value on a wrapped object following the iterator protocol.', async function(){
        let wrapped = dash([1,2]);
        assert.deepEqual(wrapped.next(),{'done':false,'value':1});
        assert.deepEqual(wrapped.next(),{'done':false,'value':2});
        assert.deepEqual(wrapped.next(),{'done':true,'value':undefined});
    });
    mocha.it('Should create a clone of the chain sequence planting value as the wrapped value.', async function(){
        function square(n){
            return n*n;
        }
        let wrapped = dash([1,2]).map(square);
        let other = wrapped.plant([3,4]);
        assert.deepEqual(other.value(),[9,16]);
        assert.deepEqual(wrapped.value(),[1,4]);
    });
    mocha.it('Should be the wrapper version of reverse.', async function(){
        array =[1,2,3];
        assert.deepEqual(dash(array).reverse().value(),[3,2,1]);
        assert.deepEqual(array,[3,2,1]);
    });
    mocha.it('Should execute the chain sequence to resolve the unwrapped value.', async function(){
        assert.deepEqual(dash([1,2,3]).value(),[1,2,3]);
    });
});

//#endregion
//#region String tests
mocha.describe('String tests', function(){
    mocha.it('Should convert the string to camel case.',async function(){
        assert.equal(dash.camelCase('Foo Bar'),'fooBar');
        assert.equal(dash.camelCase('--foo-bar--'),'fooBar');
        assert.equal(dash.camelCase('__FOO_BAR__'),'fooBar');
    });
    mocha.it('Should convert the first character of string to uppper case and the remaining to lower case.', async function(){
    assert.deepEqual(dash.capitalize('FRED'),'Fred');
    });
    mocha.it('Should deburr the string by converting Latin-1 Supplement and Latin Extended-A letters to basic latin letters.', async function(){
        assert.deepEqual(dash.deburr('déjà vu'),'deja vu');
    });
    mocha.it('Should check if string ends with the given target string.', async function(){
        assert.deepEqual(dash.endsWith('abc','c'),true);
        assert.equal(dash.endsWith('abc','b'),false);
        assert.equal(dash.endsWith('abc','b',2),true);
    });
    mocha.it('Should Convert characters &, <, >, , in string to their corresponding HTML entities.', async function(){
        assert.deepEqual(dash.escape('fred, barney, & pebbles'),'fred, barney, &amp; pebbles');
    });
    mocha.it('Should escape the RegExp special characters', async function(){
        assert.deepEqual(dash.escapeRegExp('[lodash](https://lodash.com/'),'\\[lodash\\]\\(https://lodash\\.com/');
    });
    mocha.it('Should convert string to kebab case', async function(){
        assert.deepEqual(dash.kebabCase('Foo Bar'),'foo-bar');
        assert.equal(dash.kebabCase('fooBar'),'foo-bar');
        assert.equal(dash.kebabCase('__FOO_BAR___'),'foo-bar');
    });
    mocha.it('Should convert string, as space separated words, to lower case.', async function(){
        assert.deepEqual(dash.lowerCase('--Foo-Bar--'),'foo bar');
        assert.equal(dash.lowerCase('fooBar'),'foo bar');
        assert.equal(dash.lowerCase('__FOO_BAR__'),'foo bar');
    });
    mocha.it('Should converts the first character of string to lower case', async function(){
        assert.deepEqual(dash.lowerFirst('Fred'),'fred');
        assert.equal(dash.lowerFirst('FRED'),'fRED');
    });
    mocha.it('Should string on the left and right sides if its shorter than length.', async function(){
        assert.deepEqual(dash.pad('abc',8),'  abc   ');
        assert.equal(dash.pad('abc',8,'_-'),'_-abc_-_');
        assert.equal(dash.pad('abc',3),'abc');
    });
    mocha.it('Should pad string on the right side if its shorter than length.', async function(){
        assert.deepEqual(dash.padEnd('abc',6),'abc   ');
        assert.equal(dash.padEnd('abc',6,'_-'),'abc_-_');
        assert.equal(dash.padEnd('abc',3),'abc');
    });
    mocha.it('Should pad string on the left side if its shorter than length', async function(){
        assert.deepEqual(dash.padStart('abc',6),'   abc');
        assert.equal(dash.padStart('abc',6,'_-'),'_-_abc');
        assert.equal(dash.padStart('abc',3),'abc');
    });
    mocha.it('Should convert string to an integer of teh specified radix', async function(){
        assert.deepEqual(dash.parseInt('08'),8);
        assert.deepEqual(dash.map(['6','08','10'],dash.parseInt),[6,8,10]);
    });
    mocha.it('Should repeat the given string n times.', async function(){
        assert.deepEqual(dash.repeat('*',3),'***');
        assert.equal(dash.repeat('abc',2),'abcabc');
        assert.equal(dash.repeat('abc',0),'');
    });
    mocha.it('Should replace matches for pattern in string with replacement.', async function(){
        assert.deepEqual(dash.replace('Hi Fred','Fred','Barney'),'Hi Barney');
    });
    mocha.it('Should convert string to snake case.', async function(){
        assert.deepEqual(dash.snakeCase('Foo Bar'),'foo_bar');
        assert.equal(dash.snakeCase('fooBar'),'foo_bar');
        assert.equal(dash.snakeCase('--FOO-BAR--'),'foo_bar');
    });
    mocha.it('Should split string by separator.', async function(){
        assert.deepEqual(dash.split('a-b-c','-',2),['a','b']);
    });
    mocha.it('Should convert string to start case.', async function(){
        assert.deepEqual(dash.startCase('--foo-bar--'),'Foo Bar');
        assert.equal(dash.startCase('fooBar'),'Foo Bar');
        assert.equal(dash.startCase('__FOO_BAR__'),'FOO BAR');
    });
    mocha.it('Should check if string starts with the given target string.', async function(){
        assert.deepEqual(dash.startsWith('abc','a'),true);
        assert.equal(dash.startsWith('abc','b'),false);
        assert.equal(dash.startsWith('abc','b',1),true);
    });
    mocha.it('Should convert string as a whole to lower case.', async function(){
        assert.deepEqual(dash.toLower('--Foo-Bar--'),'--foo-bar--');
        assert.equal(dash.toLower('fooBar'),'foobar');
        assert.equal(dash.toLower('__FOO_BAR__'),'__foo_bar__');
    });
    mocha.it('Should convert string, as a whole, to upper case.', async function(){
        assert.deepEqual(dash.toUpper('--foo-bar--'),'--FOO-BAR--');
        assert.equal(dash.toUpper('fooBar'),'FOOBAR');
        assert.equal(dash.toUpper('__foo_bar__'),'__FOO_BAR__');
    });
    mocha.it('Should remove leading and trailing whitespace or specified characters from string.', async function(){
        assert.deepEqual(dash.trim('  abc  '),'abc');
        assert.equal(dash.trim('-_-abc-_-','_-'),'abc');
        assert.deepEqual(dash.map(['  foo  ','  bar  '],dash.trim),['foo','bar']);
    });
    mocha.it('Should remove trailing whitespace or specified characters from string.', async function(){
        assert.deepEqual(dash.trimEnd('  abc  '),'  abc');
        assert.equal(dash.trimEnd('-_abc-_-','_-'),'-_abc');
    });
    mocha.it('Should remove leading whitespace or specified characters from string.', async function(){
        assert.deepEqual(dash.trimStart('  abc  '),'abc  ');
        assert.equal(dash.trimStart('-_-abc-_-','_-'),'abc-_-');
    });
    mocha.it('Should truncate string if its longer than the given maximum string length.', async function(){
        assert.deepEqual(dash.truncate('hi-diddly-ho there, neighborino'),'hi-diddly-ho there, neighbo...');
        assert.equal(dash.truncate('hi-diddly-ho there, neighborino',{
            'length':24,
            'separator':' '
        }),'hi-diddly-ho there,...');
        assert.equal(dash.truncate('hi-diddly-ho there, neighborino',{
            'length' : 24,
            'separator' : /,? +/
        }),'hi-diddly-ho there...');
    });
    mocha.it('Should convert the HTML entities like &amp; to their corresponding characters.', async function(){
        assert.deepEqual(dash.unescape('fred, barney, &amp; pebbles'),'fred, barney, & pebbles');
    });
    mocha.it('Should convert string, as space separated words, to upper case.', async function(){
        assert.deepEqual(dash.upperCase('--foo-bar'),'FOO BAR');
        assert.equal(dash.upperCase('fooBar'),'FOO BAR');
        assert.equal(dash.upperCase('__foo_bar___'),'FOO BAR');
    });
    mocha.it('Should convert the first character of string to upper case.', async function(){
        assert.deepEqual(dash.upperFirst('fred'),'Fred');
        assert.equal(dash.upperFirst('FRED'),'FRED');
    });
    mocha.it('Should split string into an array of its own words', async function(){
        assert.deepEqual(dash.words('fred, barney, & pebbles'),['fred','barney','pebbles']);
        assert.deepEqual(dash.words('fred, barney, & pebbles', /[^, ]+/g),['fred','barney','&','pebbles']);
    });
});

//#endregion
//#region Util tests
mocha.describe('Util tests', function(){
    mocha.it('Should attempt to invoke func, returning either the result or the caught error.',async function(){
        let elements = dash.attempt(function(selector){
            return document.querySelectorAll(selector);
        },'>_>');
        if(dash.isError(elements)){
            elements =[];
        }
        assert.deepEqual(elements,[]);
    });
    mocha.it('Should create a function that iterates over pairs and invokes the corresponding function of the first predicate to return truthy.', async function(){
        var func = dash.cond([
            [dash.matches({ 'a': 1 }),           dash.constant('matches A')],
            [dash.conforms({ 'b': dash.isNumber }), dash.constant('matches B')],
            [dash.stubTrue,                      dash.constant('no match')]
          ]);
        assert.deepEqual(func({ 'a' :1,'b':2}),'matches A');
        assert.equal(func({'a':0,'b':1}),'matches B');
        assert.equal(func({'a':'1','b':'2'}),'no match');
    });
    mocha.it('Should create a function that invokes the predicate properties of source with the corresponding property values of a given object.', async function(){
        array = [
            { 'a': 2, 'b': 1 },
            { 'a': 1, 'b': 2 }
          ];
        assert.deepEqual(dash.filter(array,dash.conforms({'b':function(n){return n>1;}})),[{'a':1,'b':2}]);
    });
    mocha.it('Should creates a function that returns a value.', async function(){
        array = dash.times(2, dash.constant({'a':1}));
        assert.deepEqual(array,[{'a':1},{'a':1}]);
        assert.deepEqual(array[0],array[1]);
    });
    mocha.it('Should check value to determine whether a dufault value should be returned in its place.', async function(){
        assert.deepEqual(dash.defaultTo(1,10),1);
        assert.equal(dash.defaultTo(undefined,10),10);
    });
    mocha.it('Should create a function that returns the result of invoking the given functions with the this binding of the created function.', async function(){
        function square(n){
            return n * n;
        }
        let addSquare = dash.flow([dash.add, square]);
        assert.deepEqual(addSquare(1,2),9);
    });
    mocha.it('Shouldcreate a function that invokes the given functions from right to left. ', async function(){
        function square(n){
            return n*n;
        }
        let addSquare = dash.flowRight([square,dash.add]);
        assert.deepEqual(addSquare(1,2),9);
    });
    mocha.it('Should return the first argument it recieves.', async function(){
        array = {'a':1};
        assert.deepEqual(dash.identity(array),array);
    });
    mocha.it('Should create a function that invokes func with the arguments of the created function.', async function(){
        array = [
            { 'user': 'barney', 'age': 36, 'active': true },
            { 'user': 'fred',   'age': 40, 'active': false }
          ];
        assert.deepEqual(dash.filter(array,dash.iteratee({'user':'barney','active':true})),[{'user':'barney','age':36,'active':true}]);
        assert.deepEqual(dash.filter(array, dash.iteratee(['user','fred'])),[{'user':'fred','age':40,'active':false}]);
        assert.deepEqual(dash.filter(array,dash.iteratee('user')),[{'user':'barney','age':36,'active':true},{'user':'fred','age': 40, 'active':false}]);
        dash.iteratee = dash.wrap(dash.iteratee, function(iteratee, func){
            return !dash.isRegExp(func) ? iteratee(func) : function(string){
                return func.test(string);
            };
        });
        assert.deepEqual(dash.filter(['abc','def'],/ef/),['def']);
    });
    mocha.it('Should create a function that performs a partial deep comparison between a given object and source, returning true if the given has equivalent propert values.', async function(){
        array = [
            { 'a': 1, 'b': 2, 'c': 3 },
            { 'a': 4, 'b': 5, 'c': 6 }
          ];
        assert.deepEqual(dash.filter(array,dash.matches({'a':4,'c':6})),[{'a':4,'b':5,'c':6}]);
    });
    mocha.it('Should create a function that performs a partial deep comparison between the value at path of a given object to srcValue.', async function(){
        array = [
            { 'a': 1, 'b': 2, 'c': 3 },
            { 'a': 4, 'b': 5, 'c': 6 }
          ];
        assert.deepEqual(dash.find(array,dash.matchesProperty('a',4)),{'a':4,'b':5,'c':6});
    });
    mocha.it('Should create a function that invokes the method at path of a given object.', async function(){
        array = [
            { 'a': { 'b': dash.constant(2) } },
            { 'a': { 'b': dash.constant(1) } }
          ];
        assert.deepEqual(dash.map(array, dash.method('a.b')),[2,1]);
        assert.deepEqual(dash.map(array,dash.method(['a','b'])),[2,1]);
    });
    mocha.it('Should create a function that invokes the method at a given path of object.', async function(){
        array = dash.times(3, dash.constant),
    object = { 'a': array, 'b': array, 'c': array };
        assert.deepEqual(dash.map(['a[2]','c[0]'], dash.methodOf(object)),[2,0]);
        assert.deepEqual(dash.map([['a','2'],['c','0']],dash.methodOf(object)),[2,0]);
    });
    mocha.it('Should adds all own enumerable string keyed function properties of a source object to the destination object.', async function(){
        function vowels(string){
            return dash.filter(string,function(v){
                return /[aeiou]/i.test(v);
            });
        }
        dash.mixin({'vowels':vowels});
        assert.deepEqual(dash.vowels('fred'),['e']);
        assert.deepEqual(dash('fred').vowels().value(),['e']);
        dash.mixin({'vowels':vowels},{'chain':false});
        assert.deepEqual(dash('fred').vowels(),['e']);
    });
    mocha.it('Should revert the variable to its previous value and returns a reference to teh lodash function', async function(){
        let lodash = dash.noConflict();
        assert.deepEqual(dash.noConflict,lodash.noConflict);
    });
    mocha.it('Should returns undefined.', async function(){
        assert.deepEqual(dash.noop(),undefined);
    });
    mocha.it('Should create a function that gets the argument at index n.', async function(){
        let func = dash.nthArg(1);
        assert.deepEqual(func('a','b','c','d'),'b');
        func = dash.nthArg(-2);
        assert.deepEqual(func('a','b','c','d'),'c');
    });
    mocha.it('Should create a function that invokes iteratees with the arguments it recieves and returns their results.', async function(){
        let func = dash.over([Math.max, Math.min]);
        assert.deepEqual(func(1,2,3,4),[4,1]);
    });
    mocha.it('Should create a function that checks if all of the predicates return truthy when invoked with the arguments it receives.', async function(){
        let func = dash.overEvery([Boolean,isFinite]);
        assert.deepEqual(func('1'),true);
        assert.equal(func(null),false);
        assert.equal(func(NaN),false);
    });
    mocha.it('Should create a function that checks if any of the predicates return truthy when invoked with the arguments it recieves.', async function(){
        let func = dash.overSome([Boolean, isFinite]);
        assert.deepEqual(func('1'),true);
        assert.equal(func(null),true);
        assert.equal(func(NaN),false);
    });
    mocha.it('Should create a function that returns the value at path of a given object. ', async function(){
        array = [
            { 'a': { 'b': 2 } },
            { 'a': { 'b': 1 } }
          ];
        assert.deepEqual(dash.map(array,dash.property('a.b')),[2,1]);
        assert.deepEqual(dash.map(dash.sortBy(array,dash.property(['a','b'])),'a.b'),[1,2]);
    });
    mocha.it('Should create a function that returns the value at a given path of object.', async function(){
        array = [0, 1, 2],
        object = { 'a': array, 'b': array, 'c': array }
        assert.deepEqual(dash.map(['a[2]','c[0]'],dash.propertyOf(object)),[2,0]);
        assert.deepEqual(dash.map([['a','2'],['c','0']],dash.propertyOf(object)),[2,0]);
    });
    mocha.it('Should create an array of numbers progressing from start up to, but not including, end.', async function(){
        assert.deepEqual(dash.range(4),[0,1,2,3]);
        assert.deepEqual(dash.range(-4),[0,-1,-2,-3]);
        assert.deepEqual(dash.range(1,5),[1,2,3,4]);
        assert.deepEqual(dash.range(0,20,5),[0,5,10,15]);
        assert.deepEqual(dash.range(0,-4,-1),[0,-1,-2,-3]);
        assert.deepEqual(dash.range(1,4,0),[1,1,1]);
        assert.deepEqual(dash.range(0),[]);
    });
    mocha.it('Should populate values in descending order.', async function(){
        assert.deepEqual(dash.rangeRight(4),[3,2,1,0]);
        assert.deepEqual(dash.rangeRight(-4),[-3,-2,-1,0]);
        assert.deepEqual(dash.rangeRight(1,5),[4,3,2,1]);
        assert.deepEqual(dash.rangeRight(0,20,5),[15,10,5,0]);
        assert.deepEqual(dash.rangeRight(0,-4,-1),[-3,-2,-1,0]);
        assert.deepEqual(dash.rangeRight(1,4,0),[1,1,1]);
        assert.deepEqual(dash.rangeRight(0),[]);
    });
    mocha.it('Should return a new empty array.', async function(){
        array = dash.times(2, dash.stubArray);
        assert.deepEqual(array,[[],[]]);
        assert.deepEqual(array[0],array[1]);
    });
    mocha.it('Should return false', async function(){
        assert.deepEqual(dash.times(2,dash.stubFalse),[false,false]);
    });
    mocha.it('Should return a new empty object.', async function(){
        let array = dash.times(2,dash.stubObject);
        assert.deepEqual(array,[{},{}]);
        assert.deepEqual(array[0],array[1]);
    });
    mocha.it('Should return an empty string.', async function(){
        assert.deepEqual(dash.times(2,dash.stubString),['','']);
    });
    mocha.it('Should return true.', async function(){
        assert.deepEqual(dash.times(2,dash.stubTrue),[true,true]);
    });
    mocha.it('Should invoke the iteratee n times, returning an array of the results of each invocation.', async function(){
        assert.deepEqual(dash.times(3, String),['0','1','2']);
        assert.deepEqual(dash.times(4,dash.constant(0)),[0,0,0,0]);
    });
    mocha.it('Should convert value to a property path array.', async function(){
        assert.deepEqual(dash.toPath('a.b.c'),['a','b','c']);
        assert.deepEqual(dash.toPath('a[0].b.c'),['a','0','b','c']);
    });
    mocha.it('Should Generates a unique ID. If prefix is given, the ID is a appended to it.', async function(){
        assert.deepEqual(dash.uniqueId('contact_'),'contact_1');
        assert.equal(dash.uniqueId(),'2');
    });
});
//#endregion
})();