import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { user } from "./auth-schema.js";

export const checklistStatusEnum = pgEnum("checklist_status", [
  "ACQUIRED",
  "STILL_NEEDED",
]);

export const clinics = pgTable("clinics", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),

  location: text("location").notNull(),

  contactNumber: text("contact_number").notNull(),

  operatingHours: text("operating_hours").notNull(),

  maternityServices: text("maternity_services").notNull(),

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const pregnancyProfiles = pgTable("pregnancy_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

  location: text("location").notNull(),

  expectedDeliveryDate: date("expected_delivery_date").notNull(),

  nearestClinicId: uuid("nearest_clinic_id")
    .notNull()
    .references(() => clinics.id, {
      onDelete: "restrict",
    }),

  emergencyContactName: text("emergency_contact_name").notNull(),

  emergencyContactPhone: text("emergency_contact_phone").notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const checklistItems = pgTable("checklist_items", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),

  description: text("description"),

  category: text("category"),

  displayOrder: integer("display_order").default(0).notNull(),

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const userChecklistItems = pgTable(
  "user_checklist_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    checklistItemId: uuid("checklist_item_id")
      .notNull()
      .references(() => checklistItems.id, {
        onDelete: "cascade",
      }),

    status: checklistStatusEnum("status")
      .default("STILL_NEEDED")
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("user_checklist_item_unique").on(
      table.userId,
      table.checklistItemId,
    ),
  ],
);