function update (car, world) {

	var enemies = world.getEnemies();
	var e = enemies[0]; // Will aim at the first enemy

	// Get the angle between the vector and the vector of your muzzle out of your car to the goal
	var angle = car.getTurretAngleTo(e.getX(), e.getY());
        
	// If the modulus of the obtained angle greater than 5 degrees, we continue to aim
	if (Math.abs(angle) > 5) {
		if (angle < 0) { 
			// If the angle is negative, then turn the barrel counterclockwise
			car.setTurretAngle(car.getTurretAngle() - 5);
		}
		else { 
			// Otherwise in a clockwise
			car.setTurretAngle(car.getTurretAngle() + 5);
		}
	}

	// For best results, you should increase the accuracy (in our case 5 degrees)
	// And take into account the fact that objects move and shoot at opponents need

	return car;
}
	
