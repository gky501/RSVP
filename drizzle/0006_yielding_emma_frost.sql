ALTER TABLE `employees` ADD `age_confirmed` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `employees` ADD `age_confirmed_by` text;--> statement-breakpoint
ALTER TABLE `employees` ADD `age_confirmed_at` text;