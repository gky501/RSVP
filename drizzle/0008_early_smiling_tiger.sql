CREATE TABLE `song_suggestions` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_number` text NOT NULL,
	`title` text NOT NULL,
	`artist` text NOT NULL,
	`album` text NOT NULL,
	`url` text NOT NULL,
	`source` text NOT NULL,
	`song_key` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `song_per_invitation` ON `song_suggestions` (`employee_number`,`song_key`);