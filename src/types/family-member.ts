export interface FamilyMember {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  familyId: number;
  gender: string;
  avatar: Image | null;
  born: string;
  died: string | null;
  motherId: number | null;
  fatherId: number | null;
  placeOfBirth: string;
  occupation: string;
  bio: string;
  showInTree: true;
  email: string;
  phone: string;
  // TODO: Add this on the return dto for family tree
  partners: Partner[];
  images: Image[];
  createdAt: string;
  children: (FamilyMember | Partner)[];
  expanded: boolean;
}

export interface Partner {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  familyId: number;
  born: string;
  email: string;
  phone: string;
  gender: string;
  avatar: Image | null;
  married: string;
  divorced: string | null;
  partnerId: number;
  died: string | null;
  motherId: number | null;
  fatherId: number | null;
  showInTree: true;
  placeOfBirth: string;
  occupation: string;
  bio: string;
  images: Image[];
  partnerName: string;
  expanded: boolean;
  children: (FamilyMember | Partner)[];
}

export interface Image {
  id: number;
  path: string;
  type: string;
  familyMemberId: number;
  createdAt: string;
}

export type FamilyNode = FamilyMember | Partner;
