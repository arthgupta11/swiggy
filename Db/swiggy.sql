CREATE TABLE `restraunts` (
  `id` integer PRIMARY KEY NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL,
  `modified_at` timestamp,
  `deleted_at` timestamp,
  `is_deleted` boolean NOT NULL
);

CREATE TABLE `categories` (
  `id` integer PRIMARY KEY NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL,
  `modified_at` timestamp,
  `is_deleted` boolean NOT NULL,
  `deleted_at` timestamp,
  `restraunt_id` integer NOT NULL
);

CREATE TABLE `subcategories` (
  `id` integer PRIMARY KEY NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL,
  `modified_at` timestamp,
  `is_deleted` boolean NOT NULL,
  `restruant_id` integer NOT NULL,
  `deleted_at` timestamp,
  `category_id` integer NOT NULL
);

CREATE TABLE `products` (
  `id` integer PRIMARY KEY NOT NULL,
  `name` varchar(100),
  `price` JSON NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL,
  `modified_at` timestamp,
  `is_deleted` boolean,
  `deleted_at` timestamp,
  `restraunt_id` integer NOT NULL
);

CREATE TABLE `addons` (
  `id` integer PRIMARY KEY NOT NULL,
  `name` varchar(100),
  `price` JSON NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL,
  `modified_at` timestamp,
  `is_deleted` boolean NOT NULL,
  `deleted_at` timestamp,
  `restraunt_id` integer NOT NULL
);

CREATE TABLE `product_addons` (
  `id` integer PRIMARY KEY NOT NULL,
  `product_id` integer NOT NULL,
  `addon_id` integer NOT NULL,
  `created_at` timestamp NOT NULL,
  `modified_at` timestamp,
  `isdeleted` boolean NOT NULL,
  `deleted_at` timestamp,
  `restraunt_id` integer NOT NULL
);

CREATE TABLE `product_categories` (
  `id` integer PRIMARY KEY NOT NULL,
  `product_id` integer NOT NULL,
  `category_id` integer NOT NULL,
  `created_at` timestamp NOT NULL,
  `modified_at` timestamp,
  `is_deleted` boolean NOT NULL,
  `deleted_at` timestamp,
  `restruant_id` integer NOT NULL
);

CREATE TABLE `category_subcategories` (
  `id` integer PRIMARY KEY NOT NULL,
  `category_id` integer NOT NULL,
  `subcategory_id` integer NOT NULL,
  `created_at` timestamp NOT NULL,
  `modified_at` timestamp,
  `is_deleted` boolean NOT NULL,
  `deleted_at` timestamp,
  `restruant_id` integer NOT NULL
);

CREATE TABLE `product_subcategories` (
  `id` integer PRIMARY KEY NOT NULL,
  `product_id` integer NOT NULL,
  `subcategory_id` integer NOT NULL,
  `created_at` timestamp NOT NULL,
  `modified_at` timestamp,
  `is_deleted` boolean NOT NULL,
  `deleted_at` timestamp,
  `restruant_id` integer NOT NULL
);

CREATE TABLE `products_recommended_products` (
  `id` integer PRIMARY KEY NOT NULL,
  `product_id` integer NOT NULL,
  `recommended_productid` integer NOT NULL,
  `deleted_at` timestamp,
  `created_at` timestamp NOT NULL,
  `modified_at` timestamp,
  `is_deleted` boolean NOT NULL,
  `restruant_id` integer NOT NULL
);

ALTER TABLE `categories` ADD FOREIGN KEY (`restraunt_id`) REFERENCES `restraunts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `subcategories` ADD FOREIGN KEY (`restruant_id`) REFERENCES `restraunts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `products` ADD FOREIGN KEY (`restraunt_id`) REFERENCES `restraunts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `addons` ADD FOREIGN KEY (`restraunt_id`) REFERENCES `restraunts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `product_categories` ADD FOREIGN KEY (`restruant_id`) REFERENCES `restraunts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `category_subcategories` ADD FOREIGN KEY (`restruant_id`) REFERENCES `restraunts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `product_subcategories` ADD FOREIGN KEY (`restruant_id`) REFERENCES `restraunts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `products_recommended_products` ADD FOREIGN KEY (`restruant_id`) REFERENCES `restraunts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `product_addons` ADD FOREIGN KEY (`restraunt_id`) REFERENCES `restraunts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `subcategories` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `category_subcategories` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `category_subcategories` ADD FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `product_subcategories` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `product_subcategories` ADD FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `products_recommended_products` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `products_recommended_products` ADD FOREIGN KEY (`recommended_productid`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `product_addons` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `product_addons` ADD FOREIGN KEY (`addon_id`) REFERENCES `addons` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `product_categories` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `product_categories` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
