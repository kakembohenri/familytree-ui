"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import { useFetchTreeQuery } from "@/src/redux/tree/tree-api-slice";
import {
  selectedPerson,
  selectFamilyData,
  setFamilyData,
  setShowAddMember,
  showAddDialog,
  showAddPartner,
  showDeleteDialog,
  showDetailDialog,
  showEditDialog,
  showEditPartnership,
} from "@/src/redux/tree/tree-slice";
import { FamilyMember, FamilyNode } from "@/src/types/family-member";
import {
  ChevronDown,
  ChevronRight,
  Loader2,
  Move,
  Search,
  TriangleAlertIcon,
  UserPlus,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AddFamilyMemberDialog } from "./add";
import { AddPartner } from "./add/add-partner";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { UpdateFamilyMemberDialog } from "./edit";
import { EditPartnershipDialog } from "./edit/partnership";
import { FamilyMemberDetailDialog } from "./family-member-detail-dialog";
import RenderFamilyTree from "./family-tree";
import TreeUtilities from "./tree-utilities";
import JWTDecodeContainer from "../auth/jwt-decode-container";

export default function Tree() {
  const dispatch = useAppDispatch();

  const { data, isFetching, refetch, isError } = useFetchTreeQuery();

  // Add tree to redux store
  useEffect(() => {
    if (data && !isFetching) {
      dispatch(setFamilyData(data));
    }
  }, [data, isFetching]);

  const containerRef = useRef<HTMLDivElement>(null);

  const showFamilyMemberDetails = useAppSelector(showDetailDialog);

  const showDeleteFamilyMemberDialog = useAppSelector(showDeleteDialog);

  const showEditMemberPartnership = useAppSelector(showEditPartnership);

  const showAddMemberDialog = useAppSelector(showAddDialog);

  const showAddMemberPartner = useAppSelector(showAddPartner);

  const showEditMember = useAppSelector(showEditDialog);

  // const isMobile = useMobile();

  // Function to check if a node is a partnership
  const isPartnership = (node: FamilyNode) => {
    return (
      (node as FamilyMember).partners &&
      (node as FamilyMember)?.partners?.length > 0
    );
  };

  const handleRefetch = () => {
    refetch();
  };

  const familyData = useAppSelector(selectFamilyData);

  const chosenPerson = useAppSelector(selectedPerson);

  const {
    zoomLevel,
    searchTerm,
    expandAll,
    collapseAll,
    zoomIn,
    zoomOut,
    resetView,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleSearch,
    isDragging,
    position,
  } = TreeUtilities({ isPartnership, familyData });

  const setShowAddDialog = (show: boolean) => {
    dispatch(setShowAddMember({ show, person: null }));
  };

  return (
    <div className="p-6 w-full h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      <JWTDecodeContainer />
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Blood line</h1>

        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search family members..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8 h-9 w-full md:w-[200px]"
            />
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={zoomOut}
              className="h-8 w-8"
            >
              <ZoomOut className="h-4 w-4" />
              <span className="sr-only">Zoom Out</span>
            </Button>
            <span className="text-sm w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={zoomIn}
              className="h-8 w-8"
            >
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoom In</span>
            </Button>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={expandAll}
              className="text-xs h-8"
            >
              <ChevronDown className="h-3 w-3 mr-1" />
              Expand
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={collapseAll}
              className="text-xs h-8"
            >
              <ChevronRight className="h-3 w-3 mr-1" />
              Collapse
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={resetView}
            className="h-8 w-8"
          >
            <Move className="h-4 w-4" />
            <span className="sr-only">Reset View</span>
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[calc(100vh-10rem)] overflow-hidden bg-white rounded-lg shadow-sm"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-in-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
          }}
        >
          {isError ? (
            <Alert
              variant="destructive"
              // style={{ background: "lightgreen" }}
            >
              <TriangleAlertIcon className="h-4 w-4" />
              <AlertTitle>Fetch Error</AlertTitle>
              <AlertDescription>
                Can not fetch records at this moment in time!
              </AlertDescription>
            </Alert>
          ) : isFetching ? (
            <Loader2 className="animate-spin h-8 w-8" />
          ) : familyData === null ? (
            <div className="flex flex-col gap-2">
              <span>Add new members here!</span>

              <Button size="sm" onClick={() => setShowAddDialog(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>
          ) : (
            <RenderFamilyTree node={familyData} isPartnership={isPartnership} />
          )}
        </div>
      </div>

      {/* Family Member Detail Dialog */}
      {showFamilyMemberDetails && chosenPerson && (
        <FamilyMemberDetailDialog person={chosenPerson} refetch={refetch} />
      )}

      {/* Family Member Detail Dialog Edit */}
      {showEditMember && chosenPerson && (
        <UpdateFamilyMemberDialog refetch={refetch} />
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteFamilyMemberDialog && chosenPerson && (
        <DeleteConfirmationDialog
          title="Delete Family Member"
          description={`Are you sure you want to delete ${chosenPerson?.firstName} ${chosenPerson?.lastName} from your family tree? This action cannot be undone.`}
          person={chosenPerson}
          refetch={refetch}
        />
      )}

      {/* Handle edit partnership */}
      {showEditMemberPartnership && chosenPerson && (
        <EditPartnershipDialog refetch={handleRefetch} />
      )}

      {/* Add First Family Member Dialog */}
      {showAddMemberDialog && <AddFamilyMemberDialog refetch={handleRefetch} />}

      {/* Add partner */}
      {showAddMemberPartner && chosenPerson && (
        <AddPartner refetch={handleRefetch} />
      )}
    </div>
  );
}
