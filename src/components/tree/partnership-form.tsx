"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Person {
  id: string;
  name: string;
  image?: string;
  birthYear?: number;
  gender?: "male" | "female" | "other";
}

interface PartnershipFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  people: Record<string, Person>;
  initialData?: {
    id?: string;
    partners: [string, string];
    marriageYear?: number;
    divorceYear?: number;
  };
  onSave: (data: {
    id?: string;
    partners: [string, string];
    marriageYear?: number;
    divorceYear?: number;
  }) => void;
}

export function PartnershipForm({
  open,
  onOpenChange,
  people,
  initialData = { partners: ["", ""] as [string, string] },
  onSave,
}: PartnershipFormProps) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "marriageYear" || name === "divorceYear"
          ? value === ""
            ? undefined
            : Number.parseInt(value, 10)
          : value,
    });
  };

  const handlePartnerChange = (index: 0 | 1, value: string) => {
    const newPartners = [...formData.partners] as [string, string];
    newPartners[index] = value;
    setFormData({
      ...formData,
      partners: newPartners,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  // Filter out already selected partner from the other dropdown
  // const getAvailablePeople = (excludeId: string) => {
  //   return Object.values(people).filter((person) => person.id !== excludeId);
  // };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData.id ? "Edit" : "Add"} Partnership
          </DialogTitle>
          <DialogDescription>
            {initialData.id
              ? "Update the details of this partnership."
              : "Add a new partnership to your family tree."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="partner1">Partner 1</Label>
              <Select
                value={formData.partners[0]}
                onValueChange={(value) => handlePartnerChange(0, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a person" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(people)
                    .filter((person) => person.id !== formData.partners[1])
                    .map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="partner2">Partner 2</Label>
              <Select
                value={formData.partners[1]}
                onValueChange={(value) => handlePartnerChange(1, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a person" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(people)
                    .filter((person) => person.id !== formData.partners[0])
                    .map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="marriageYear">Marriage Year</Label>
                <Input
                  id="marriageYear"
                  name="marriageYear"
                  type="number"
                  value={formData.marriageYear || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="divorceYear">Divorce Year</Label>
                <Input
                  id="divorceYear"
                  name="divorceYear"
                  type="number"
                  value={formData.divorceYear || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {initialData.id ? "Save Changes" : "Add Partnership"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
