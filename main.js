function update(car, world) {
    
	var enemies = world.getEnemies(); // Получаем массив всех противников
    var enemiesCount = enemies.length; // Длинна массива - количество противников
    
    if (enemiesCount > 0) {
        // Переменные для поиска ближайшего противника
        var minDist = 9999;
        var minI = 0;
        
        // Ищем ближайшего противника
        for (var i = 0; i < enemiesCount; i++) {
            var e = enemies[i];
            var dist = car.getDistanceTo(e.getX(), e.getY());
            if (minDist > dist && e.getHealth() > 0) { // e.getHealth() > 0 - чтобы не стрелять по мертвым
                minI = i;
                minDist = dist;
            }
        }

        // Целимся и стреляем
        var e = enemies[minI];
        var a = car.getTurretAngleTo(e.getX(), e.getY()); // Получаем угол между вектором вашего дула и вектором из вашего авто в цель
        
        if (Math.abs(a) > 5) { // Если полученный угол больше пяти градусов, то продолжаем целиться
            if (a < 0) {
                car.setTurretAngle(car.getTurretAngle() - 5);
            }
            else {
                car.setTurretAngle(car.getTurretAngle() + 5);
            }
        }
        else { // Если же угол меньше пяти градусов, то стреляем
            car.shoot();
        }
    }

    var bonuses = world.getBonuses(); // Получаем массив всех бонусов
    
    if (bonuses.length) { // Если на поле есть бонусы, то будем двигаться к ним        
     	var angle = car.getAngleTo(bonuses[0].getX(), bonuses[0].getY()); // Получаем угол до бонуса
        car.setWheelAngle(angle); // Задаем соответствующий угол колесам
        car.setSpeed(car.getMaxSpeed()); // Задаем максимальную скорость нашей машине
    }
    else { // Если же бонусов на карте нет, потихоньку отъезжаем назад
        car.setSpeed(-1);
    }
    
    return car;
}
