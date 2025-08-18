/* eslint-disable @typescript-eslint/no-unused-expressions*/

"use client";

import { FamilyMember, Image, Partner } from "@/src/types/family-member";
import { createSlice } from "@reduxjs/toolkit";

type FamilyNode = FamilyMember | Partner;

interface ITree {
  tree: {
    tree: FamilyNode | null;
    selectedPerson: FamilyNode | null;
    father: FamilyNode | null;
    mother: FamilyNode | null;
    child: FamilyNode | null;
    showDetailDialog: boolean;
    showEditDialog: boolean;
    showDeleteDialog: boolean;
    showAddDialog: boolean;
    highlightedPerson: number | null;
    showAddPartner: boolean;
    showEditPartnership: boolean;
    showAddPhoto: boolean;
    selectedPhoto: Image | null;
    showViewPhoto: boolean;
    showAddFather: boolean;
  };
}

export const treeSlice = createSlice({
  name: "tree",
  initialState: {
    tree: null,
    selectedPerson: null,
    showDetailDialog: false,
    showEditDialog: false,
    showDeleteDialog: false,
    showAddDialog: false,
    showAddPartner: false,
    showEditPartnership: false,
    highlightedPerson: null,
    showAddPhoto: false,
    selectedPhoto: null,
    showViewPhoto: false,
    showAddFather: false,
    father: null,
    mother: null,
    child: null,
  },
  reducers: {
    setFamilyData: (state, action) => {
      state.tree = action.payload;
    },
    setSelectedPerson: (state, action) => {
      state.selectedPerson = action.payload;
    },
    setViewPerson: (state, action) => {
      state.showDetailDialog = action.payload.show;
      state.selectedPerson = action.payload.person;
    },
    setEditPerson: (state, action) => {
      state.showEditDialog = action.payload.show;
      state.selectedPerson = action.payload.person;
    },
    setShowAddMember: (state, action) => {
      state.showAddDialog = action.payload.show;
      state.mother = action.payload.mother;
      state.father = action.payload.father;
      state.child = action.payload.child;
    },
    setConfirmDeletePerson: (state, action) => {
      state.showDeleteDialog = action.payload.show;
      state.selectedPerson = action.payload.person;
    },
    setHighlightedPerson: (state, action) => {
      state.highlightedPerson = action.payload;
    },
    setAddPartner: (state, action) => {
      (state.showAddPartner = action.payload.show),
        (state.selectedPerson = action.payload.person);
    },
    setEditPartnership: (state, action) => {
      (state.showEditPartnership = action.payload.show),
        (state.selectedPerson = action.payload.person);
    },
    setShowAddPhoto: (state, action) => {
      (state.showAddPhoto = action.payload.show),
        (state.selectedPerson = action.payload.person);
    },
    setShowPhoto: (state, action) => {
      (state.selectedPhoto = action.payload.photo),
        (state.showViewPhoto = action.payload.show);
    },
    setShowAddFatherDialog: (state, action) => {
      state.showAddFather = action.payload;
    },
  },
});

export const {
  setFamilyData,
  setViewPerson,
  setSelectedPerson,
  setEditPerson,
  setConfirmDeletePerson,
  setHighlightedPerson,
  setShowAddMember,
  setAddPartner,
  setEditPartnership,
  setShowAddPhoto,
  setShowPhoto,
  setShowAddFatherDialog,
} = treeSlice.actions;

export const selectFamilyData = (state: ITree) => state.tree.tree;
export const selectedPerson = (state: ITree) => state.tree.selectedPerson;
export const showDetailDialog = (state: ITree) => state.tree.showDetailDialog;
export const showDeleteDialog = (state: ITree) => state.tree.showDeleteDialog;
export const showEditDialog = (state: ITree) => state.tree.showEditDialog;
export const showAddDialog = (state: ITree) => state.tree.showAddDialog;
export const showAddPartner = (state: ITree) => state.tree.showAddPartner;
export const showEditPartnership = (state: ITree) =>
  state.tree.showEditPartnership;
export const highlightedPerson = (state: ITree) => state.tree.highlightedPerson;
export const showAddPhoto = (state: ITree) => state.tree.showAddPhoto;
export const showViewPhoto = (state: ITree) => state.tree.showViewPhoto;
export const selectedPhoto = (state: ITree) => state.tree.selectedPhoto;
export const showAddFatherDialog = (state: ITree) => state.tree.showAddFather;
export const selectedMother = (state: ITree) => state.tree.mother;
export const selectedFather = (state: ITree) => state.tree.father;
export const selectedChild = (state: ITree) => state.tree.child;

export default treeSlice.reducer;
