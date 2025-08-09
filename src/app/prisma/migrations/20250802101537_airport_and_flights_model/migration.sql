-- CreateTable
CREATE TABLE `Airport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `airport_name` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `arrival_airport_id` INTEGER NOT NULL,
    `departure_airport_id` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `total_seats` INTEGER NOT NULL,
    `avaliable_seats` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_arrival_airport_id_fkey` FOREIGN KEY (`arrival_airport_id`) REFERENCES `Airport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_departure_airport_id_fkey` FOREIGN KEY (`departure_airport_id`) REFERENCES `Airport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
