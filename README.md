# Matrix---path-finding

The problem can be solved with a simple depth-first search algorithm, abstracting the matrix to an undirected graph with connections denoted by 0s.

The general idea is to consider possible paths from a starting point, iterating on until the destination is reached - meaning that the destination is reachable. If all possible paths are exhausted without the destination being reached, return false. The depths first idea comes from the order in which possible paths are resolved - meaning that algorithm goes through the conclusion of 1 possible path before considering the other one.

Represent the matrix as a 2 dimensional array populated with 1s and 0
e.g 
```
[[0,0,0,1,0],
[0,1,1,0,0],
[0,0,0,1,1],
[1,1,0,0,0],
[0,0,0,0,1],]
```
Define type point as being composed of N:int and M:int property
```
Point
	n:int
	m:int
```
Define method to get all valid neighbours of a certain point in the matrix where valid means that the point is not out of bounds and that value contained in the point is 0
```
getNeighbours(matrix:int[][], n:int, m:int):Point[]
```
For the body of the algorithm, it can be done iteratively or recursively. The operation is mostly identical. This example will be done recursively
```
canNavigateTo(matrix:int[][], startN:int, startM:int, destinationN:int, destinationM:int, currPath:Point[]):boolean
	//The base condition
	if startN == destinationN && startM == destinationM 
		return true
	
	//If first recursion, define currPath
	if currPath.isEmpty() 
		currPath = [new Point(startN, startM)]

	//Now go through all valid neighbours of current point
	//If no neighbours exist, path is fully traversed and return ret as false
	boolean ret = false
	for neighbour:Point of getNeighbours
		//Check if point has already been traversed
		if !currPath.contains(neighbour) 
			//Add to path. In a real language, path will need to be copied by value instead of by reference
			Point[] newPath = currPath.push(neighbour)
				//Now run recursion
				ret = canNavigateTo(matrix, neighbour.x, neighbour.y, destinationX, destinationY, newPath)
				//Quit loop and return if ret is true and a path is found
				if ret
					break

	return ret
```
