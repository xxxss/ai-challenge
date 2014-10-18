function update(car, world) {

	// Methods below repeat method enemy vehicle
	car.getId();
	car.getX();
	car.getY();
	car.getAngle();
	car.getWidth();
	car.getHeight();
	car.getHealth();
	car.getSpeed();
	car.getMaxSpeed();
	car.getSimpleShotPower();
	car.getSimpleRechargeTime();
	car.getPremiumShotPower();
	car.getPremiumRechargeTime();
	car.getPremiumShotCount();
	car.getFreezingShotPower();
	car.getFreezingShotCount();
	car.getFreezingRechargeTime();
	car.getRechargeTime();
	car.getTurretAngle();
	
	var speed = car.getSpeed(); // Linear velocity
	speed.getX();  //offset of the X axis
	speed.getY(); //  offset of the Y axis

	// auxiliary method
	car.getDistanceTo(X, Y); // Returns the distance from you to your target
	car.getTurretAngleTo(X, Y); // Returns the angle between the muzzle of your machine and the vector from the center of the machine to the specified location
	car.getAngleTo(X, Y); // Returns the angle between the direction of your vehicle and the vector from the center of the machine to the specified location

	//management
	car.setSpeed(SPEED);	// Gas pedal :)
	// Car begins to accelerate until it reaches the speed SPEED (pixels / tick)
	// Accelerate can be changed in the interval [-maxSpeed * 0.7; maxSpeed]
	// Negative accelerate - reverse
	// 0.7 in the above formula - is the coefficient differences reverse speeds of the front

	car.setWheelAngle(ANGLE); // Sets the angle of rotation of the wheels relative to the direction of car
	// ANGLE can be changed in the range of [-20; 20] [Left, Right]

	car.shoot(); 		// Call this method to shoot
	car.shoot("PREMIUM");	// premium shot gun
	// If improved missiles not ok, shoot a normal gun
	car.shoot("FREEZING");	// Shot freezing gun
	// Every hit so the projectile takes 100 power from  cars to 200 ticks and causes 10 damage
	// Effect stacks up to 5 times the limit of power reduction - 80
	// Example, a five-freezing effect on a machine with a capacity of 500 to lower it to 80, and not to 0

	// Gun can be rotated 360 degrees
	car.setTurretAngle(TURRET_ANGLE); // Sets the desired angle for the gun
	// It can rotate up to 10 degrees per tick
	// Angle is measured in degrees relative to the nose of car

	car.misc; // Object whose value is transferred from the tick to tick
	// Can calculate some value in one tick, and used in another, keeping in this object
	
	// Example value storage
	car.misc.someVar = someData;

	// Or array
	if (car.misc.someArr == null)
	     car.misc.someArr = [];
	else
	     car.misc.someArr.push(someData);

	return car;
}	
