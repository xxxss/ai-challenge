//TODO: find nearest way to target, now the wheel angle is so stupid.
//TODO: found all the factors, conclude a decision of what to do. where to go.
//
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
        //Because wheelangle range is 20, the minimum turning radius is
        //r = L / sin(a)
        // for car length is 60, the min r is 175.42
        //var rad = Math.PI * 20 / 180;
        //var r = car.getHeight() / Math.sin(rad);
        ai.log(angle); 
        //TODO: if angle > 90, roll back, then go
        if (Math.abs(angle) > 80){
            var a = -1 * angle;
            car.setWheelAngle(a);
            car.setSpeed(-0.7 * car.getMaxSpeed());
        }
        else {
            car.setSpeed(car.getMaxSpeed()); // Specify the maximum speed of our car
        }
    }
    else { // If bonuses not on the map, slowly pulls back
        car.setSpeed(-1);
    }
    
    return car;
}

function findWhoTargetMe(enemies) {
    //Calc min distance of each enemy, if I am the nearest, I should backoff;
    var enemiesCount = enemies.length;
    var enemiesTargetMe = {};
    if (enemiesCount > 0) {
        for (var i = 0; i < enemiesCount; i++) {
            var e = enemies[i];
            if (e.getHealth() < 0) {
                continue;
            }
            var minDistance = 9999;
            var dist = car.getDistanceTo(e.getX(), e.getY());
            for (var j = 0; j < enemiesCount; j++) {
                if (i == j) {
                    continue;
                }
                var e2 = enemies[j];
                if (e2.getHealth() < 0) {
                    continue;
                }
                var d = distance(e.getX(), e.getY(), e2.getX(), e.getY());
                if (minDistance > d) {
                    minDistance = d;
                }
            }
            if (dist <= minDistance){
                // I am the nearest enemy of enemy[i], I should backoff;
                enemiesTargetMe[e.getId()] = dist;
            }
        }
    }
    return enemiesTargetMe;
};

function distance(x1, y1, x2, y2) {
    var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return d;
}
