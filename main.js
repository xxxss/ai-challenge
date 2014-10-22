//TODO: find nearest way to target, now the wheel angle is so stupid.
//TODO: found all the factors, conclude a decision of what to do. where to go.
//
function update(car, world) {
    
	var enemies = world.getEnemies(); // Get an array of all opponents
    var enemiesCount = enemies.length; // Array length - the number of opponents
    var blindZone = getBlindZone(car, world);
    
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
        if (Math.abs(a) >= 10) {
            if (a < 0) {
                car.setTurretAngle(car.getTurretAngle() - 10);
            }
            else {
                car.setTurretAngle(car.getTurretAngle() + 10);
            }
        }
        else if (Math.abs(a) > 1) { // If the resulting angle of more than five degrees, we continue to aim
                car.setTurretAngle(car.getTurretAngle() + a);
        }
        else { // If the angle is less than five degrees, then shoot
	        var freezingShotCount = car.getFreezingShotCount();
	        var premiumShotCount = car.getPremiumShotCount();
             if (premiumShotCount > 0) {
                ai.log(car.getPremiumShotPower());
                car.shoot("PREMIUM");
            } else {
                car.shoot();
            }
        }
    }

    var bonuses = world.getBonuses(); // Get an array of all bonuses
    
    if (bonuses.length) { // If the field is the bonus, we will move them
        var minDist2 = 9999;
        var minI2 = 0;
        for (var i = 0; i < bonuses.length; i++) {
            var b = bonuses[i];
            if (inBlindZone(b.getX(), b.getY(), blindZone)) {
                continue;
            }
            var dist = car.getDistanceTo(b.getX(), b.getY());
            if (minDist2 > dist) {
                minI2 = i;
                minDist2 = dist;
            }
        }
     	var angle = car.getAngleTo(bonuses[minI2].getX(), bonuses[minI2].getY()); // Get angle to bonus
        car.setWheelAngle(angle); // Specify the corresponding angle of the wheels
        car.setSpeed(car.getMaxSpeed()); // Specify the maximum speed of our car
        //Because wheelangle range is 20, the minimum turning radius is
        //r = L / sin(a)
        // for car length is 60, the min r is 175.42
        //var rad = Math.PI * 20 / 180;
        //var r = car.getHeight() / Math.sin(rad);
        // if angle > 90, roll back, then go
        //if (Math.abs(angle) > 90){
        //    var a = -1 * angle;
        //    car.setWheelAngle(a);
        //    car.setSpeed(-0.7 * car.getMaxSpeed());
        //}
        //else {
        //    car.setSpeed(car.getMaxSpeed()); // Specify the maximum speed of our car
        //}
        //TODO: there is space between blindzone 
    }
    else { // If bonuses not on the map, slowly pulls back
        var hostileEnemies = findWhoTargetMe(car, enemies);
        if (hostileEnemies.length > 0){
            var target = findSafePlace(car, hostileEnemies);
            ai.log("target place:" + target.x + ", " + target.y); 
            if (car.getWidth() < target.x < world.getWidth() && car.getWidth() < target.y < world.getHeight()){
                var angle = car.getAngleTo(target.x, target.y); 
                car.setWheelAngle(angle); 
                if (Math.abs(angle) > 80){
                    var a = -1 * angle;
                    car.setWheelAngle(a);
                    car.setSpeed(-0.7 * car.getMaxSpeed());

                }
                else {
                    car.setSpeed(car.getMaxSpeed()); // Specify the maximum speed of our car
                }
            }
            else {
                car.setSpeed(-1);
            }
        }
        else {
            car.setSpeed(-1);
        }
    }
    
    return car;
}

function distance(x1, y1, x2, y2) {
    var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return d;
}

function findWhoTargetMe(car, enemies) {
    //Calc min distance of each enemy, if I am the nearest, I should backoff;
    var enemiesCount = enemies.length;
    var enemiesTargetMe = [];
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
                ai.log("dist:" + dist + ", " + minDistance)
                // I am the nearest enemy of enemy[i], I should backoff;
                enemiesTargetMe.push(e);
            }
        }
    }
    return enemiesTargetMe;
};

function findWay(car, world, x, y) {
    //
}

function inBlindZone(x, y, zone) {
    if (distance(x, y, zone.leftCenter.x, zone.leftCenter.y) <= zone.r) {
        return true;
    }
    else if (distance(x, y, zone.rightCenter.x, zone.rightCenter.y) <= zone.r) {
        return true;
    }
    return false;
}
function getBlindZone(car, world) {
    //in the left and right side of the vehicle, there is a cycle it can't reach.
    var height = car.getHeight();
    var rad = angleToRad(20);
    // minimum turning radius
    // TODO: add half of the car's width;
    var r = height / Math.sin(rad); 
    var carAngle = car.getAngle();
    var leftRAngle = (carAngle - 90 + 360) % 360;
    var rightRAngle = (carAngle + 90) % 360;
    //IMPORTANT: car's angle is not start from x axes, so minus 90 degree.
    leftRAngle = (leftRAngle - 90 + 360) % 360;
    rightRAngle = (rightRAngle - 90 + 360) % 360;
    var leftRVector = {};
    leftRVector.y = r * Math.sin(angleToRad(leftRAngle));
    leftRVector.x = r * Math.cos(angleToRad(leftRAngle));
    var rightRVector = {};
    rightRVector.y = r * Math.sin(angleToRad(rightRAngle));
    rightRVector.x = r * Math.cos(angleToRad(rightRAngle));
    var leftCycleCenter = {};
    leftCycleCenter.x = car.getX() + leftRVector.x;
    leftCycleCenter.y = car.getY() + leftRVector.y;
    var rightCycleCenter = {};
    rightCycleCenter.x = car.getX() + rightRVector.x;
    rightCycleCenter.y = car.getY() + rightRVector.y;
    var twoCycle = {};
    twoCycle.leftCenter = leftCycleCenter;
    twoCycle.rightCenter = rightCycleCenter;
    twoCycle.r = r;
    return twoCycle;
}

function angleToRad(angle){
    var rad = angle * Math.PI / 180;
    return rad;
}

function radToAngle(rad){
    var angle = rad * 180 / Math.PI;
    return angle;
}

function findSafePlace(car, enemies) {
    //if I am in some enemies 'nearest targets', find a direction to go out.
    //TODO: mind the wall.
    var vectors = [];
    for (var i = 0; i < enemies.length; i++) {
        var e = enemies[i];
        var vector = {};
        vector.x = car.getX() - e.getX();
        vector.y = car.getY() - e.getY();
        vectors.push(vector);
    }
    var runawayvector = synthesisVectors(vectors);
    var target = {};
    if (runawayvector) {
        target.x = car.getX() + runawayvector.x;
        target.y = car.getY() + runawayvector.y;
    }
    return target;
}

function synthesisVectors(vectors) {
    // AB + BC = AC
    // A(x1,y1)，B(x2,y2), C(x3,y3)
    // AB+BC=(x2-x1,y2-y1)+(x3-x2,y3-y2)=(x2-x1+x3-x2,y2-y1+y3-y2)=(x3-x1,y3-y1)=AC
    // for closer enemy, farther we should go. so change length of vector
    var result;
    if (vectors.length > 0) {
        result = vectors[0];
    }
    if (vectors.length > 1) {
        for (var i = 1; i < vectors.length; i++) {
            var m1 = Math.sqrt(Math.pow(result.x, 2) + Math.pow(result.y, 2));
            var m2 = Math.sqrt(Math.pow(vectors[i].x, 2) + Math.pow(vectors[i].y, 2));
            var fix_x1 = result.x * m2 / m1;
            var fix_y1 = result.y * m2 / m1;
            var fix_x2 = vectors[i].x * m1 / m2;
            var fix_y2 = vectors[i].y * m1 / m2;
            result.x = fix_x1 + fix_x2;
            result.y = fix_y1 + fix_y2;
        };
    }
    return result;
}


