import { useAppDispatch } from "@/src/redux/redux-hooks";
import {
  setFamilyData,
  setHighlightedPerson,
} from "@/src/redux/tree/tree-slice";
import { FamilyMember, FamilyNode } from "@/src/types/family-member";
import { useState } from "react";

const TreeUtilities = ({
  isPartnership,
  familyData,
}: {
  isPartnership: (node: FamilyNode) => boolean;
  familyData: FamilyNode | null;
}) => {
  const dispatch = useAppDispatch();

  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  // Function to expand all nodes
  const expandAll = () => {
    const expandNode = (node: FamilyNode): FamilyNode => {
      if (isPartnership(node)) {
        return {
          ...node,
          expanded: true,
          children: node.children.map(expandNode),
        };
      }
      return { ...node, expanded: true };
    };

    dispatch(setFamilyData(expandNode(familyData!)));
  };
  // Function to collapse all nodes
  const collapseAll = () => {
    const collapseNode = (node: FamilyNode): FamilyNode => {
      if (isPartnership(node)) {
        return {
          ...node,
          expanded: false,
          children: node.children.map(collapseNode),
        };
      }
      return { ...node, expanded: false };
    };

    dispatch(setFamilyData(collapseNode(familyData!)));
  };

  // Zoom in function
  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  };

  // Zoom out function
  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  };

  // Reset zoom and position
  const resetView = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch start for mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPosition({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  // Handle touch move for mobile dragging
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - startPosition.x,
        y: touch.clientY - startPosition.y,
      });
    }
  };

  // Handle touch end to stop mobile dragging
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // If search is empty, clear highlight
    if (!e.target.value) {
      dispatch(setHighlightedPerson(null));
      return;
    }

    // Find the first matching person
    const searchLower = e.target.value.toLowerCase();
    const match =
      familyData !== null &&
      Object.values(familyData).find(
        (person) =>
          person.firstName.toLowerCase().includes(searchLower) ||
          person.lastName.toLowerCase().includes(searchLower) ||
          person.middleName.toLowerCase().includes(searchLower)
      );

    if (match) {
      dispatch(setHighlightedPerson(match.id));

      // Expand nodes to show the highlighted person
      const expandToShowPerson = (node: FamilyNode): FamilyNode => {
        if (isPartnership(node)) {
          // Check if this partnership contains the highlighted person
          if ((node as FamilyMember).partners.includes(match.id)) {
            return { ...node, expanded: true };
          }

          // Check if any children contain the highlighted person
          let containsHighlighted = false;
          const updatedChildren = node.children.map((child) => {
            const updatedChild = expandToShowPerson(child);
            if (isPartnership(updatedChild) && updatedChild.expanded) {
              containsHighlighted = true;
            } else if (
              !isPartnership(updatedChild) &&
              updatedChild.id === match.id
            ) {
              containsHighlighted = true;
            }
            return updatedChild;
          });

          return {
            ...node,
            expanded: containsHighlighted,
            children: updatedChildren,
          };
        }

        return node;
      };

      setFamilyData(expandToShowPerson(familyData));
    } else {
      dispatch(setHighlightedPerson(null));
    }
  };

  return {
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
  };
};

export default TreeUtilities;
