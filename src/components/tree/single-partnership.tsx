import { FamilyMember, FamilyNode, Partner } from "@/src/types/family-member";
import { ChevronDown, ChevronRight } from "lucide-react";
import { FC } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import RenderFamilyTree from "./family-tree";
import PersonNode from "./person-node";

interface RenderPartnershipProps {
  husband: FamilyMember;
  partner: Partner;
  toggleExpanded: (id: number) => void;
  togglePartnershipExpanded: (
    husband: FamilyMember,
    partnershipId: number
  ) => void;
  isPartnership: (node: FamilyNode) => boolean;
}

const RenderPartnership: FC<RenderPartnershipProps> = ({
  husband,
  partner,
  toggleExpanded,
  isPartnership,
  togglePartnershipExpanded,
}) => {
  return (
    <div className="flex flex-col items-center mb-6">
      {/* Partnership header with marriage info */}
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className="text-xs">
          {partner.married && `m. ${partner.married}`}
          {partner.divorced && ` - div. ${partner.divorced}`}
          {!partner.married && !partner.divorced && "Partners"}
        </Badge>
      </div>

      {/* Partners */}
      <div className="flex items-center gap-4 mb-2 relative">
        {/* Connection line between partners */}
        <div className="absolute top-8 left-16 right-16 h-0.5 bg-primary/30"></div>

        <div className="flex flex-col items-center">
          <PersonNode person={husband} />
        </div>
        <div className="flex flex-col items-center">
          <PersonNode person={partner} />
        </div>
      </div>

      {/* Expand/collapse button for children */}
      {husband.children.length > 0 &&
        husband.children.find((child) => child.motherId === partner.id) && (
          <div className="flex items-center mb-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full"
              onClick={() =>
                husband.partners.length > 0
                  ? togglePartnershipExpanded(husband, partner.id)
                  : toggleExpanded(partner.id)
              }
            >
              {partner.expanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
              <span className="sr-only">
                {partner.expanded ? "Collapse" : "Expand"}
              </span>
            </Button>
          </div>
        )}

      {/* Children */}
      {husband.children.find((child) => child.motherId === partner.id) &&
        partner.expanded && (
          <>
            <div className="h-6 w-0.5 bg-primary/30"></div>
            <div className="flex flex-row items-start gap-6 relative">
              {husband.children.filter((child) => child.motherId === partner.id)
                .length > 1 && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/30"></div>
              )}
              {husband.children
                .filter((child) => child.motherId === partner.id)
                .map((child) => (
                  <div key={child.id} className="flex flex-col items-center">
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
  );
};

export default RenderPartnership;
