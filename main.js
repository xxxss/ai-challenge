function update(car, world) {
    
	var enemies = world.getEnemies(); // Get an array of all opponents
    var enemiesCount = enemies.length; // Array length - the number of opponents
    
    if (enemiesCount > 0) {
        // Variables to find the nearest enemy
        var minDist = 9999;
        var minI = 0;
        
        // Find the nearest enemy
        for (var i = 0; i < enemiesCount; i++) {
            var e = enemies[i];
            var dist = car.getDistanceTo(e.getX(), e.getY());
            if (minDist > dist && e.getHealth() > 0) { // e.getHealth() > 0 - not to shoot at the dead
                minI = i;
                minDist = dist;
            }
        }

        // Aim and shoot
        var e = enemies[minI];
        var a = car.getTurretAngleTo(e.getX(), e.getY()); // Get the angle between the vector and the vector of your muzzle out of your car to the goal
        
        if (Math.abs(a) > 5) { // If the resulting angle of more than five degrees, we continue to aim
            if (a < 0) {
                car.setTurretAngle(car.getTurretAngle() - 5);
            }
            else {
                car.setTurretAngle(car.getTurretAngle() + 5);
            }
        }
        else { // If the angle is less than five degrees, then shoot
            car.shoot();
        }
    }

    var bonuses = world.getBonuses(); // Get an array of all bonuses
    
    if (bonuses.length) { // If the field is the bonus, we will move them
     	var angle = car.getAngleTo(bonuses[0].getX(), bonuses[0].getY()); // Get angle to bonus
        car.setWheelAngle(angle); // Specify the corresponding angle of the wheels
        car.setSpeed(car.getMaxSpeed()); // Specify the maximum speed of our car
    }
    else { // If bonuses not on the map, slowly pulls back
        car.setSpeed(-1);
    }
    
    return car;
}
