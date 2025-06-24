import { cn } from "@/src/lib/utils";
import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import { selectFamilyData, setFamilyData } from "@/src/redux/tree/tree-slice";
import { FamilyMember, Partner } from "@/src/types/family-member";
import { ChevronDown, ChevronRight, Heart } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import PersonNode from "./person-node";

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

      return node;
    };

    dispatch(setFamilyData(updateNode(familyData!)));
  };

  if (!isPartnership(node)) {
    // This is a single person node
    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* {renderPersonNode(node)} */}
        <PersonNode person={node} />
      </div>
    );
  }

  // // This is a partnership node
  // const partner1 = people[node.partners[0]];
  // const partner2 = people[node.partners[1]];

  // if (!partner1 || !partner2) {
  //   return null; // Skip if partners don't exist
  // }

  return (
    <div key={node.id} className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        {/* Partners side by side */}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex flex-col items-center">
            {/* {renderPersonNode(partner1)} */}
            <PersonNode person={node} />
          </div>
          <div className="flex flex-col items-center relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 -mx-4 bg-primary/30"></div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Heart
                    className={cn(
                      "h-6 w-6",
                      (node as Partner).divorced
                        ? "text-red-300"
                        : "text-pink-400"
                    )}
                  />
                </TooltipTrigger>
                {(node as FamilyMember)?.partners &&
                  (node as FamilyMember)?.partners?.length > 0 && (
                    <TooltipContent>
                      {(node as FamilyMember).partners[0].married &&
                        `Married: ${
                          (node as FamilyMember).partners[0].married
                        }`}
                      {(node as FamilyMember).partners[0].divorced &&
                        ` - Divorced: ${
                          (node as FamilyMember).partners[0].divorced
                        }`}
                      {!(node as FamilyMember).partners[0].married &&
                        !(node as FamilyMember).partners[0].divorced &&
                        "Partners"}
                    </TooltipContent>
                  )}
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col items-center">
            {/* {renderPersonNode(partner2)} */}
            <PersonNode person={(node as FamilyMember).partners[0]} />
          </div>
        </div>

        {/* Expand/collapse button */}
        {(node as FamilyMember).children &&
          (node as FamilyMember).children.length > 0 && (
            <div className="flex items-center mb-2">
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
          )}

        {/* Children */}
        {node.children && node.children.length > 0 && node.expanded && (
          <>
            <div className="h-8 w-0.5 bg-primary/30"></div>
            <div className="flex flex-row items-start gap-8 relative">
              {/* Horizontal line connecting children */}
              {node.children.length > 1 && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/30"></div>
              )}

              {/* Render each child */}
              {node.children.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  {/* Vertical line to child */}
                  <div className="h-4 w-0.5 bg-primary/30"></div>
                  {/* {renderFamilyTree(child)} */}
                  <PersonNode person={child} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RenderFamilyTree;
