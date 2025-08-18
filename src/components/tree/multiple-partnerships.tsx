import { FamilyMember, FamilyNode } from "@/src/types/family-member";
import { FC } from "react";
import PersonNode from "./person-node";
import { Badge } from "../ui/badge";
import { ChevronDown, ChevronRight, Users } from "lucide-react";
import { Button } from "../ui/button";
import RenderFamilyTree from "./family-tree";

interface MultiplePartnershipsProps {
  node: FamilyMember;
  toggleExpanded: (id: number) => void;
  togglePartnershipExpanded: (
    husband: FamilyMember,
    partnershipId: number
  ) => void;
  isPartnership: (node: FamilyNode) => boolean;
}

const MultiplePartnerships: FC<MultiplePartnershipsProps> = ({
  node,
  toggleExpanded,
  togglePartnershipExpanded,
  isPartnership,
}) => {
  if (!node) return null;

  return (
    <div key={node.id} className="flex flex-col items-center">
      {/* All partners on the same horizontal line */}
      <div className="flex items-center gap-8 mb-4 relative">
        {/* Horizontal connection line spanning all partners */}
        {/* {node.partners.length > 0 && ( */}
        <div className="absolute top-8 left-16 right-16 h-0.5 bg-primary/30"></div>
        {/* )} */}

        <div className="flex flex-col items-center">
          <PersonNode person={node} />
          <div className="mt-2">
            <Badge variant="outline" className="text-xs">
              Husband
            </Badge>
          </div>
        </div>

        {node.partners.map((person) => (
          <div key={person.id} className="flex flex-col items-center">
            {/* {renderPersonNode(person, person.id === node.primaryPerson)} */}
            <PersonNode person={person} />

            {/* Show partnership info below each partner (except primary person) */}
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                {person.married === "" ? "m. Unknown" : `m. ${person.married}`}
                {person.divorced && ` - div. ${person.divorced}`}
                {/* {!person.married && !person.divorced && "Partners"} */}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Primary person indicator */}
      <div className="mb-2">
        <Badge variant="secondary" className="text-xs flex items-center gap-1">
          <Users className="h-3 w-3" />
          {node.partners.length} partnerships
        </Badge>
      </div>

      {/* Expand/collapse button */}
      <div className="flex items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-full"
          onClick={() => toggleExpanded(node.id)}
        >
          {node.expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <span className="sr-only">
            {node.expanded ? "Collapse" : "Expand"}
          </span>
        </Button>
      </div>

      {/* All children from all partnerships */}
      {node.expanded && (
        <div className="flex flex-col items-center">
          <div className="h-8 w-0.5 bg-primary/30"></div>

          {/* Group children by partnership */}
          <div className="flex flex-row items-start gap-12">
            {node.partners.map((partner, partnershipIndex) => (
              <div key={partner.id} className="flex flex-col items-center">
                {/* Partnership label */}
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    Partnership {partnershipIndex + 1}
                  </Badge>
                </div>

                {/* Partnership expand/collapse */}
                {node.children.find(
                  (child) => child.motherId === partner.id
                ) && (
                  <div className="flex items-center mb-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full"
                      onClick={() =>
                        togglePartnershipExpanded(node, partner.id)
                      }
                    >
                      {partner.expanded ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                )}

                {/* Children for this partnership */}
                {node.children.find((child) => child.motherId === partner.id) &&
                  partner.expanded && (
                    <>
                      <div className="h-6 w-0.5 bg-primary/30"></div>
                      <div className="flex flex-row items-start gap-6 relative">
                        {node.children.filter(
                          (child) => child.motherId === partner.id
                        ).length > 1 && (
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/30"></div>
                        )}
                        {node.children
                          .filter((child) => child.motherId === partner.id)
                          .map((child) => (
                            <div
                              key={child.id}
                              className="flex flex-col items-center"
                            >
                              <div className="h-4 w-0.5 bg-primary/30"></div>
                              {/* {renderFamilyTree(child)} */}
                              <RenderFamilyTree
                                node={child}
                                isPartnership={isPartnership}
                              />
                            </div>
                          ))}
                      </div>
                    </>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiplePartnerships;
