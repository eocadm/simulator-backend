import { z } from "zod";
import { DateTime, Str, Obj } from "chanfana";

export const EventSchema = z.object({
  name: z.string(),
  value: z.string(),
  color: z.string(),
});

export const EventType = z.enum(["1", "2", "3", "4", "5", "6", "7", "8"]);

export const EVENTS = {
  "1": {
    name: "TA",
    value: "1",
    color: "#C7CEEA",
  },
  "2": {
    name: "만남",
    value: "2",
    color: "#D5AAFF",
  },
  "3": {
    name: "상담",
    value: "3",
    color: "#BAFFC9",
  },
  "4": {
    name: "설계",
    value: "4",
    color: "#FF9AA2",
  },
  "5": {
    name: "계약",
    value: "5",
    color: "#FFB3BA",
  },
  "6": {
    name: "해피콜",
    value: "6",
    color: "#E2F0CB",
  },
  "7": {
    name: "청구",
    value: "7",
    color: "#9AD1D4",
  },
  "8": {
    name: "개인",
    value: "8",
    color: "#F0C2C2",
  },
} as const;

export type Event = z.infer<typeof EventSchema>;
export type EventType = z.infer<typeof EventType>;
