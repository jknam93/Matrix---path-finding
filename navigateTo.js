

//Directions allowed to travel
const VECTOR_LIST = [
	[ 0,-1], //Up
	[-1, 0], [1,0], //Left, right
	[ 0, 1] //Down
]


//Get a list of traversible neighbours
function getNeighbours(matrix, startX, startY) {
	var ret = [];
	for (var vector of VECTOR_LIST){
		var xVector = vector[0];
		var yVector = vector[1];

		var x = startX + xVector;
		var y = startY + yVector;
		//Make sure new neighbour is within bounds of matrix
		if ( y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length &&matrix[y][x] === 0){
			var point = {x:x, y:y}
			ret.push(point);
		}
	}
	return ret;
}

//Check if point is explored or not
function isExplored(path, x, y){
	for (var point of path){
		if (point.x === x && point.y === y) {
			return true;
		}
	}
	return false;
}

//Determine if a certain point in a matrix can navigate to a target point
function canNavigateTo(matrix, startX, startY, targetX, targetY, currPath){
	if (startX === targetX && startY === targetY){
		return true; //Target reached
	}

	var ret = false;
	if (currPath=== undefined){ //if first iteration, create a new path
		currPath = [{x:startX,y:startY}];
	}
	//Get neighbours, filter out any points that are already explored
	var neighbourList = getNeighbours(matrix, startX, startY);
	neighbourList = neighbourList.filter(point=>!isExplored(currPath, point.x, point.y));	
	
	//Go through list of neighbours and 
	var i;
	for ( i = 0; i!== neighbourList.length && ret===false; i++){
		var neighbour = neighbourList[i];
		var newPath = [...currPath]; //Create copy by value
		newPath.push(neighbour);
		ret = canNavigateTo(matrix, neighbour.x, neighbour.y, 
							targetX, targetY, newPath);
	}
	return ret;
}

function clickHander(){
	var startX = +document.getElementById('startX').value;
	var startY = +document.getElementById('startY').value;
	var endX = +document.getElementById('endX').value;
	var endY = +document.getElementById('endY').value;
	var matrix = eval(document.getElementById('matrix').value);
	alert(canNavigateTo(matrix,startX,startY,endX,endY));
}

//Testing scenario 1 - can navigate
var matrix = [
	[0,0,0,1,0],
	[0,1,1,0,0],
	[0,0,0,1,1],
	[1,1,0,0,0],
	[0,0,0,0,1],
]
console.assert(canNavigateTo(matrix,1,0,4,3));

//Testing scenario 2 - can navigate
var matrix = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[1,1,1,1,1],
	[0,0,0,0,0],
	[0,0,0,0,0],
]
console.assert(canNavigateTo(matrix,0,0,4,1));

//Testing scenario 3 - can navigate
var matrix = [
	[0,1,0,0,0],
	[0,1,0,0,0],
	[0,1,0,0,0],
	[0,1,0,0,0],
	[0,1,0,0,0],
]
console.assert(canNavigateTo(matrix,0,1,0,4));

//Testing scenario 4 - can navigate
var matrix = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[1,1,1,1,1],
	[0,0,0,0,0],
	[0,0,0,0,0],
]
console.assert(!canNavigateTo(matrix,1,0,4,3));

//Testing scenario 5 - cannot navigate
var matrix = [
	[0,1,0,0,0],
	[0,1,0,0,0],
	[0,1,0,0,0],
	[0,1,0,0,0],
	[0,1,0,0,0],
]
console.assert(!canNavigateTo(matrix,0,1,3,2));

//Testing scenario 6 - cannot navigate
var matrix = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[1,1,1,1,1],
	[0,0,0,0,0],
	[0,0,0,0,0],
]
console.assert(!canNavigateTo(matrix,0,1,4,3));
