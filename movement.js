function update (car, world) {

	var point = { x: 900, y: 30 }; // Coordinates our goal (where we want to arrive)

	// Get the angle between the direction of our cars and the vector from the center of our car to the goal
	var angle = car.getAngleTo(point.x, point.y);

	// Turn the wheel on the angle
	car.setWheelAngle(angle);
	// Do not pay attention to the fact that the angle can be greater than 20 or less than 20 degrees
	// Machine turns to the maximum possible angle, if it exceeds the allowable

	// Set the maximum speed of our car
	car.setSpeed(car.getMaxSpeed());

	// While driving must be considered hedges and field boundaries
	// Otherwise you can rest against the wall

	return car;
}
