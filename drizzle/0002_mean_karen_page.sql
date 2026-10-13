CREATE TABLE `organizers` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`salt` text NOT NULL,
	`password_hash` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organizers_username_unique` ON `organizers` (`username`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`hash` text PRIMARY KEY NOT NULL,
	`organizer_id` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ticket_sales` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_number` text NOT NULL,
	`phase` text NOT NULL,
	`quantity` integer NOT NULL,
	`price_cents` integer NOT NULL,
	`payment_method` text NOT NULL,
	`organizer_name` text NOT NULL,
	`organizer_id` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `employees` ADD `checked_in` text;--> statement-breakpoint
ALTER TABLE `employees` ADD `checked_in_by` text;--> statement-breakpoint
ALTER TABLE `employees` ADD `id_verified` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `employees` ADD `plus_one_birthday` text;--> statement-breakpoint
ALTER TABLE `employees` ADD `plus_one_id_verified` integer DEFAULT 0 NOT NULL;