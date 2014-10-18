xfunction update(car, world) {

        // Begin with the second parameter world 
        // This property contains all the information about the game world
	world.getTick();	// Current tick (time)
	// Each tick is called the update function of each player
	world.getWidth();	// Width of the playing field
	world.getHeight();	// height
	world.getType(); 	// Type of game: 
	// EDITOR - if the code is run in the editor on the site 
	// SIMPLE -  the usual battle 
	// MINI_TOURNAMENT -  game mini-tournament

	var bullets = world.getBullets();	// Array with all the bullets on the field
	
	for (var i = 0; i < bullets.length; i++) {
		var bullet = bullets[i];

		bullet.getId();		// Id player who fired that bullet
		// Bullets do not cause damage to your car
		bullet.getBulletId(); 	// Unique id bullets
		bullet.getX();
		bullet.getY(); 		// Coordinates bullets
		bullet.getAngle(); 	// Angle at which the bullet flies
		bullet.getPower();	// Damage that it will cause in the case of contact
		bullet.getSpeed();	// Linear velocity
		bullet.getType();	// type of bullet(SIMPLE, PREMIUM, FREEZING)

		var speed = bullet.getSpeed(); // Linear velocity
		speed.getX(); // offset along the X axis
		speed.getY(); // offset along the Y axis

		// Helper methods
		bullet.getDistanceTo(X, Y); // Returns the distance from the projectile to the desired point
		bullet.getAngleTo(X, Y); // Returns the angle between the direction of the projectile and the vector from the center to the specified point

	}

	var enemies = world.getEnemies();	// Array with all the other players on the field

	for (var i = 0; i < enemies.length; i++) {
		var enemy = enemies[i];

		enemy.getId();			// Id player who drives a car
		enemy.getX();
		enemy.getY(); 			// Coordinates of the vehicle
		enemy.getAngle(); 		// His angle
		enemy.getHealth(); 		// the number of lives
		enemy.getWidth();		// Width of the machine
		enemy.getHeight();		// Vehicle height (length)
		enemy.getMaxSpeed();		// Top speed (pixels / tick)
		enemy.getSimpleShotPower();	// Damage from usual bullet
		enemy.getSimpleRechargeTime();	// Cooldown usual Weapons 
		// That is so much time after the shot to be recharged weapons
		enemy.getPremiumShotPower();	// Bonus Damage when fired improved bullet
		enemy.getPremiumShotCount();	// Number of improved bullet
		enemy.getPremiumRechargeTime();	// Cooldown powerful weapons
		enemy.getFreezingShotPower();	// Damage of freezing bullet
		enemy.getFreezingShotCount();	// Number of freeze bullet
		enemy.getFreezingRechargeTime(); // Cooldown freezing weapon
		enemy.getRechargeTime();	// Number of ticks remaining until the end of the recharge guns
		enemy.getTurretAngle();		// Angle of the barrel relative to the nose of car [-180, 180], 枪口相对于车鼻子的角度
		enemy.getSpeed();		// Linear velocity

		var speed = enemy.getSpeed(); // Linear velocity
		speed.getX(); // X-axis offset
		speed.getY(); // the Y axis offset

		// Helper methods
		enemy.getDistanceTo(X, Y); // Returns the distance from the enemy to the desired point
		enemy.getTurretAngleTo(X, Y); // Returns the angle between the muzzle of the enemy and the vector from the center of his car to the specified location
		enemy.getAngleTo(X, Y); // Returns the angle between the direction of the enemy machine and the vector from the center of his car to the specified location

	}

	var bonuses = world.getBonuses();	// Array with bonuses, 加血包

	for (var i = 0; i < bonuses.length; i++) {
		var bonus = bonuses[i];

		bonus.getX();
		bonus.getY(); 	// Coordinates bonus
		bonus.getType(); // Type of bonus
		// if (bonus.getType() == 1) +100 lives
		// if (bonus.getType() == 2) +3 Premium bullet

		// helper methods
		bonus.getDistanceTo(X, Y); // returns the length of the bonus to the desired point

	}

	return car;
}
