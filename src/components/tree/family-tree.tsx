import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import { selectFamilyData, setFamilyData } from "@/src/redux/tree/tree-slice";
import { FamilyMember, Partner } from "@/src/types/family-member";
import { FC } from "react";
import MultiplePartnerships from "./multiple-partnerships";
import PersonNode from "./person-node";
import RenderPartnership from "./single-partnership";

type FamilyNode = FamilyMember | Partner;

interface RenderFamilyTreeProps {
  node: FamilyNode;
  isPartnership: (node: FamilyNode) => boolean;
}
// Recursive component to render the tree
const RenderFamilyTree: FC<RenderFamilyTreeProps> = ({
  node,
  isPartnership,
}) => {
  const familyData = useAppSelector(selectFamilyData);

  const dispatch = useAppDispatch();

  // Function to toggle expanded state
  const toggleExpanded = (id: number) => {
    const updateNode = (node: FamilyNode): FamilyNode => {
      if (node.id === id) {
        return { ...node, expanded: !node.expanded };
      }

      if (isPartnership(node) && node.children) {
        return {
          ...node,
          children: node.children.map(updateNode),
        };
      }

      if ((node as FamilyMember)?.partners?.length > 0) {
        return {
          ...node,
          partners: (node as FamilyMember).partners.map((partnership) => ({
            ...partnership,
            children: partnership.children.map(updateNode),
          })),
        };
      }

      return node;
    };

    dispatch(setFamilyData(updateNode(familyData!)));
  };

  // Function to toggle partnership expanded state
  const togglePartnershipExpanded = (
    husband: FamilyMember,
    partnerId: number
  ) => {
    const updateNode = (node: FamilyNode): FamilyNode => {
      if (
        (node as FamilyMember).partners.length > 0 &&
        node.id === husband.id
      ) {
        return {
          ...node,
          partners: (node as FamilyMember).partners.map((partnership) =>
            partnership.id === partnerId
              ? { ...partnership, expanded: !partnership.expanded }
              : partnership
          ),
        };
      }

      if (isPartnership(node) && node.children) {
        return {
          ...node,
          children: node.children.map(updateNode),
        };
      }

      if ((node as FamilyMember).partners.length > 0) {
        return {
          ...node,
          partners: (node as FamilyMember).partners.map((partnership) => ({
            ...partnership,
            children: node.children
              .filter((child) => child.motherId === partnership.id)
              .map(updateNode),
          })),
        };
      }

      return node;
    };

    dispatch(setFamilyData(updateNode(familyData!)));
  };

  // This is a single person node
  if (!isPartnership(node)) {
    return (
      <div key={node.id} className="flex flex-col items-center">
        <PersonNode person={node} />
      </div>
    );
  }

  if ((node as FamilyMember).partners?.length === 1) {
    return (
      <RenderPartnership
        husband={node as FamilyMember}
        partner={(node as FamilyMember).partners[0]}
        toggleExpanded={toggleExpanded}
        isPartnership={isPartnership}
        togglePartnershipExpanded={togglePartnershipExpanded}
      />
    );
  }

  if ((node as FamilyMember).partners?.length > 0) {
    return (
      <MultiplePartnerships
        node={node as FamilyMember}
        toggleExpanded={toggleExpanded}
        isPartnership={isPartnership}
        togglePartnershipExpanded={togglePartnershipExpanded}
      />
    );
  }

  console.log("node:", node);
  return null;
};

export default RenderFamilyTree;
