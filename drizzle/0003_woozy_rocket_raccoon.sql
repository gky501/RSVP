PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ticket_sales` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_number` text NOT NULL,
	`phase` text NOT NULL,
	`quantity` integer NOT NULL,
	`price_cents` integer,
	`payment_method` text NOT NULL,
	`organizer_name` text NOT NULL,
	`organizer_id` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_ticket_sales`("id", "employee_number", "phase", "quantity", "price_cents", "payment_method", "organizer_name", "organizer_id", "created") SELECT "id", "employee_number", "phase", "quantity", "price_cents", "payment_method", "organizer_name", "organizer_id", "created" FROM `ticket_sales`;--> statement-breakpoint
DROP TABLE `ticket_sales`;--> statement-breakpoint
ALTER TABLE `__new_ticket_sales` RENAME TO `ticket_sales`;--> statement-breakpoint
PRAGMA foreign_keys=ON;