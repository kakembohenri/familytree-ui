"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Eye,
  LayoutGridIcon as LayoutHorizontal,
  LayoutGridIcon as LayoutVertical,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Types for our family tree data
interface FamilyMember {
  id: string;
  name: string;
  image?: string;
  birthYear?: number;
  deathYear?: number;
  children?: FamilyMember[];
  spouse?: string;
  expanded?: boolean;
}

// Sample data
const sampleFamilyData: FamilyMember = {
  id: "1",
  name: "John Smith",
  image: "/placeholder.svg?height=100&width=100",
  birthYear: 1940,
  expanded: true,
  children: [
    {
      id: "2",
      name: "Mary Johnson",
      image: "/placeholder.svg?height=100&width=100",
      birthYear: 1965,
      expanded: true,
      children: [
        {
          id: "5",
          name: "Robert Johnson",
          image: "/placeholder.svg?height=100&width=100",
          birthYear: 1990,
        },
        {
          id: "6",
          name: "Lisa Johnson",
          image: "/placeholder.svg?height=100&width=100",
          birthYear: 1992,
        },
      ],
    },
    {
      id: "3",
      name: "James Smith",
      image: "/placeholder.svg?height=100&width=100",
      birthYear: 1968,
      expanded: false,
      children: [
        {
          id: "7",
          name: "Michael Smith",
          image: "/placeholder.svg?height=100&width=100",
          birthYear: 1995,
        },
      ],
    },
    {
      id: "4",
      name: "Patricia Smith",
      image: "/placeholder.svg?height=100&width=100",
      birthYear: 1970,
    },
  ],
};

export default function AdvancedFamilyTree() {
  const [familyData, setFamilyData] = useState<FamilyMember>(sampleFamilyData);
  const [horizontalLayout, setHorizontalLayout] = useState(false);

  // Function to toggle expanded state
  const toggleExpanded = (id: string) => {
    const updateMember = (member: FamilyMember): FamilyMember => {
      if (member.id === id) {
        return { ...member, expanded: !member.expanded };
      }

      if (member.children) {
        return {
          ...member,
          children: member.children.map(updateMember),
        };
      }

      return member;
    };

    setFamilyData(updateMember(familyData));
  };

  // Function to handle member deletion
  const handleDelete = (id: string) => {
    const deleteMember = (member: FamilyMember): FamilyMember | null => {
      if (member.id === id) {
        return null;
      }

      if (member.children) {
        const updatedChildren = member.children
          .map(deleteMember)
          .filter((child): child is FamilyMember => child !== null);

        return {
          ...member,
          children: updatedChildren.length > 0 ? updatedChildren : undefined,
        };
      }

      return member;
    };

    const updatedData = deleteMember(familyData);
    if (updatedData) {
      setFamilyData(updatedData);
    }
  };

  // Function to expand all nodes
  const expandAll = () => {
    const expandMember = (member: FamilyMember): FamilyMember => {
      return {
        ...member,
        expanded: true,
        children: member.children
          ? member.children.map(expandMember)
          : undefined,
      };
    };

    setFamilyData(expandMember(familyData));
  };

  // Function to collapse all nodes
  const collapseAll = () => {
    const collapseMember = (member: FamilyMember): FamilyMember => {
      return {
        ...member,
        expanded: false,
        children: member.children
          ? member.children.map(collapseMember)
          : undefined,
      };
    };

    setFamilyData(collapseMember(familyData));
  };

  // Render a family member node
  const renderFamilyMemberNode = (member: FamilyMember) => {
    return (
      <div className="group relative">
        <Avatar className="h-16 w-16 border-2 border-primary/10 transition-all duration-300 group-hover:border-primary/30">
          <AvatarImage
            src={member.image || "/placeholder.svg"}
            alt={member.name}
          />
          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 rounded-full bg-white"
                >
                  <UserPlus className="h-3 w-3" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4" />
                  <span>View</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        </div>

        <div className="mt-1 text-center text-sm font-medium">
          {member.name}
        </div>
        {member.birthYear && (
          <div className="text-center text-xs text-muted-foreground">
            b. {member.birthYear}
            {member.deathYear && ` - d. ${member.deathYear}`}
          </div>
        )}
      </div>
    );
  };

  // Recursive component to render the vertical tree
  const renderVerticalTree = (member: FamilyMember, level = 0) => {
    return (
      <div key={member.id} className="relative">
        <div className="flex items-start mb-4">
          <div className="flex items-center">
            {member.children && member.children.length > 0 ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full"
                onClick={() => toggleExpanded(member.id)}
              >
                {member.expanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {member.expanded ? "Collapse" : "Expand"}
                </span>
              </Button>
            ) : (
              <div className="w-6" />
            )}

            {renderFamilyMemberNode(member)}
          </div>
        </div>

        {member.children && member.expanded && (
          <div className="ml-8 pl-6 border-l-2 border-dashed border-muted">
            {member.children.map((child) =>
              renderVerticalTree(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  // Recursive component to render the horizontal tree
  const renderHorizontalTree = (member: FamilyMember, level = 0) => {
    return (
      <div key={member.id} className="flex flex-col items-center">
        <div className="mb-2">{renderFamilyMemberNode(member)}</div>

        {member.children && member.children.length > 0 && (
          <div className="flex items-center mb-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={() => toggleExpanded(member.id)}
            >
              {member.expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span className="sr-only">
                {member.expanded ? "Collapse" : "Expand"}
              </span>
            </Button>
          </div>
        )}

        {member.children && member.expanded && (
          <>
            <div className="h-6 w-px bg-muted"></div>
            <div className="relative">
              <div className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-muted"></div>
              <div className="flex gap-8 pt-4">
                {member.children.map((child, index) => (
                  <div key={child.id} className="relative">
                    {index > 0 && index < member.children!.length && (
                      <div className="absolute top-0 left-0 right-0 h-px bg-muted"></div>
                    )}
                    {renderHorizontalTree(child, level + 1)}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Family Tree</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={expandAll}
              className="text-xs"
            >
              Expand All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={collapseAll}
              className="text-xs"
            >
              Collapse All
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Toggle
              aria-label="Toggle layout"
              pressed={horizontalLayout}
              onPressedChange={setHorizontalLayout}
            >
              {horizontalLayout ? (
                <LayoutHorizontal className="h-4 w-4" />
              ) : (
                <LayoutVertical className="h-4 w-4" />
              )}
            </Toggle>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Root Member
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add a new family member</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div
        className={`min-w-max ${horizontalLayout ? "flex justify-center" : ""}`}
      >
        {horizontalLayout
          ? renderHorizontalTree(familyData)
          : renderVerticalTree(familyData)}
      </div>
    </div>
  );
}
