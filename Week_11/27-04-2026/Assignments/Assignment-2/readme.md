Question 1 – Maximum Passengers
Problem Statement -: 
A taxi can take multiple passengers to the railway station at the same time.On the way back to the starting point,the taxi driver may pick up additional passengers for his next trip to the airport.A map of passenger location has been created,represented as a square matrix.
The Matrix is filled with cells,and each cell will have an initial value as follows:
•	A value greater than or equal to zero represents a path.
•	A value equal to 1 represents a passenger.
•	A value equal to -1 represents an obstruction.
The rules of motion of taxi are as follows:
•	The Taxi driver starts at (0,0) and the railway station is at (n-1,n-1).Movement towards the railway station is right or down,through valid path cells.
•	After reaching (n-1,n-1) the taxi driver travels back to (0,0) by travelling left or up through valid path cells.
•	When passing through a path cell containing a passenger,the passenger is picked up.once the rider is picked up the cell becomes an empty path cell. 
•	If there is no valid path between (0,0) and (n-1,n-1),then no passenger can be picked.
•	The goal is to collect as many passengers as possible so that the driver can maximize his earnings.
For example consider the following grid,
           0      1
          -1     0
Start at top left corner.Move right one collecting a passenger. Move down one to the destination.Cell (1,0) is blocked,So the return path is the reverse of the path to the airport.All Paths have been explored and one passenger is collected.
 
Returns:
Int : maximum number of passengers that can be collected.




Question 2 – Minimum streets lights
Problem Statement -: Street Lights are installed at every position along a 1-D road of length n. Locations[] (an array) represents the coverage limit of these lights. The ith light has a coverage limit of locations[i] that can range from the position max((i – locations[i]), 1) to min((i + locations[i]), n ) (Closed intervals). Initially all the lights are switched off. Find the minimum number of fountains that must be switched on to cover the road.
Example
n = 3
locations[] = {0, 2, 13}then
For position 1: locations[1] = 0, max((1 – 0),
1) to mini (1+0), 3) gives range = 1 to 1
For position 2: locations[2] = 2, max((2-2),
1) to min( (2+2), 3) gives range = 1 to 3
For position 3: locations[3] = 1, max( (3-1),
1) to min( (3+1), 3) gives range = 2 to 3
For the entire length of this road to be covered, only the light at position 2 needs to be activated.
Returns:
int : the minimum number of street lights that must be activated
Constraints :
•	1<_n<_ 10^5
•	 O<_locations[i] <_ mini (n,100) (where 1 <_1<_10^5)

