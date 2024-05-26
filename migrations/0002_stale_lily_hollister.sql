CREATE TABLE `build` (
	`id` text PRIMARY KEY NOT NULL,
	`projectId` text NOT NULL,
	`platform` text NOT NULL,
	`version` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade
);
