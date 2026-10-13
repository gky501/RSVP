CREATE TABLE `employees` (
	`number` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`contact` text NOT NULL,
	`kind` text DEFAULT 'employee' NOT NULL,
	`token` text NOT NULL,
	`plus_one` text DEFAULT '' NOT NULL,
	`status` text,
	`updated` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `employees_token_unique` ON `employees` (`token`);--> statement-breakpoint
CREATE TABLE `lookup_limits` (
	`id` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
