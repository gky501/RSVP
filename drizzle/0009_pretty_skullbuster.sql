ALTER TABLE `song_suggestions` ADD `status` text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `song_suggestions` ADD `reviewed_by` text;--> statement-breakpoint
ALTER TABLE `song_suggestions` ADD `reviewed_at` text;