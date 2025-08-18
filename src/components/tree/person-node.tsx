/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from "@/src/lib/utils";
import { FamilyMember, Partner } from "@/src/types/family-member";
import { FC, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TooltipProvider } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, Eye, Plus, Trash2, UserPlus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import {
  highlightedPerson,
  setAddPartner,
  setConfirmDeletePerson,
  setEditPartnership,
  setEditPerson,
  setShowAddMember,
  setViewPerson,
} from "@/src/redux/tree/tree-slice";
import { formatToHumanReadableDate } from "@/src/lib/handle-dates";
import { selectUser } from "@/src/redux/auth/auth-slice";
import { UserRoles } from "@/src/enums/userRoles";

type FamilyNode = FamilyMember | Partner;
// Render a person node
interface PersonNodeParams {
  person: FamilyNode;
}
const PersonNode: FC<PersonNodeParams> = ({ person }) => {
  const isPersonHighlighted = useAppSelector(highlightedPerson);
  const isHighlighted = person.id === isPersonHighlighted;
  const [showFormActions, setShowFormActions] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  // View person details
  const handleViewPerson = (person: FamilyNode) => {
    dispatch(setViewPerson({ person, show: true }));
  };

  // Edit person
  const handleEditPerson = (person: FamilyNode) => {
    dispatch(setEditPerson({ person, show: true }));
  };

  // Add family child
  const handleAddChild = (father: FamilyNode) => {
    dispatch(setShowAddMember({ show: true, father }));
  };

  // Add partner
  const handleAddPartner = (person: FamilyNode) => {
    dispatch(setAddPartner({ show: true, person: person }));
  };

  // Add father
  const handleAddFather = (child: FamilyNode) => {
    dispatch(
      setShowAddMember({ show: true, father: null, mother: null, child: child })
    );
  };

  // Confirm delete person
  const handleConfirmDeletePerson = (person: FamilyNode) => {
    dispatch(setConfirmDeletePerson({ person, show: true }));
  };

  // Edit partnership
  const handleEditPartnership = (person: FamilyNode) => {
    dispatch(setEditPartnership({ person, show: true }));
  };

  useEffect(() => {
    if (user) {
      setShowFormActions((user as any).Role === UserRoles.ADMIN);
    }
  }, [user]);

  return (
    <div
      className={cn(
        "group  transition-all duration-300",
        "flex flex-col items-center",
        isHighlighted && "scale-110 shadow-lg"
      )}
    >
      <div className="relative">
        <Avatar
          className={cn(
            "h-16 w-16 border-2 transition-all duration-300",
            person.gender === "male"
              ? "border-blue-300"
              : person.gender === "female"
              ? "border-pink-300"
              : "border-purple-300",
            isHighlighted
              ? "ring-2 ring-primary ring-offset-2"
              : "group-hover:border-primary/30"
          )}
        >
          <AvatarImage src={person.avatar?.path ?? ""} alt={person.firstName} />
          <AvatarFallback>{person.firstName.substring(0, 2)}</AvatarFallback>
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
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleViewPerson(person)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  <span>View</span>
                </DropdownMenuItem>
                {person.fatherId === null && !(person as Partner).partnerId && (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleAddFather(person)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Add father</span>
                  </DropdownMenuItem>
                )}
                {showFormActions && (
                  <>
                    {(person as FamilyMember)?.partners &&
                      (person as FamilyMember).partners?.length > 0 && (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleAddChild(person)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          <span>Add child</span>
                        </DropdownMenuItem>
                      )}

                    {!(person as Partner).partnerId && (
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleAddPartner(person)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Add partner</span>
                      </DropdownMenuItem>
                    )}
                    {(person as Partner).partnerId && (
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleEditPartnership(person)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit Partnership</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleEditPerson(person)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-destructive focus:text-destructive"
                      onClick={() => handleConfirmDeletePerson(person)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        </div>
      </div>

      <div className="mt-1 text-center text-sm font-medium">
        {person.firstName} {person.middleName} {person.lastName}
      </div>
      <div className="flex flex-col text-center text-xs text-muted-foreground">
        <span>
          {person.born === ""
            ? "b. Unknown"
            : `b. ${formatToHumanReadableDate(person.born)}`}
        </span>
        <span>
          {person.died && ` - d. ${formatToHumanReadableDate(person.died)}`}
        </span>
      </div>
    </div>
  );
};

export default PersonNode;
