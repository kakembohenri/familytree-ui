import { FamilyMember, FamilyNode, Partner } from "@/src/types/family-member";
import { Card, CardContent } from "../../ui/card";
import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

interface RelationshipTabProps {
  person: FamilyNode;
}
const RelationshipTab = ({ person }: RelationshipTabProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <Heart className="h-4 w-4 mr-2 text-pink-500" />
              Partnerships
            </h4>
            {!(person as Partner).partnerId ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(person as FamilyMember)?.partners &&
                (person as FamilyMember)?.partners.length === 0 ? (
                  <span>No partners</span>
                ) : (
                  (person as FamilyMember)?.partners.map((partner, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 border rounded-md"
                    >
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage
                          src="/placeholder.svg?height=100&width=100"
                          alt="Partner"
                        />
                        <AvatarFallback>SP</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {partner.firstName} {partner.middleName}{" "}
                          {partner.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Married {partner.married} -{" "}
                          {!partner.divorced || partner.divorced !== ""
                            ? "To date"
                            : partner.divorced}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-3 border rounded-md">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src="/placeholder.svg?height=100&width=100"
                      alt="Partner"
                    />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {(person as Partner).partnerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Married {(person as Partner).married} -{" "}
                      {!(person as Partner).divorced ||
                      (person as Partner).divorced !== ""
                        ? "To date"
                        : (person as Partner).divorced}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {!(person as Partner).partnerId && (
            <div>
              <h4 className="font-medium mb-3">Children</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {person.children.length === 0 ? (
                  <span>No children</span>
                ) : (
                  person.children.map((child, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 border rounded-md"
                    >
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage
                          src="/placeholder.svg?height=100&width=100"
                          alt="Child"
                        />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {child.firstName} {child.middleName} {child.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Born {child.born}
                        </p>
                        {child.died && (
                          <p className="text-sm text-muted-foreground">
                            Died {child.died}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* <div>
                        <h4 className="font-medium mb-3">Parents</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center p-3 border rounded-md">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage
                                src="/placeholder.svg?height=100&width=100"
                                alt="Parent"
                              />
                              <AvatarFallback>RS</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Robert Smith</p>
                              <p className="text-sm text-muted-foreground">
                                1920-1995
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 border rounded-md">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage
                                src="/placeholder.svg?height=100&width=100"
                                alt="Parent"
                              />
                              <AvatarFallback>MS</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Mary Smith</p>
                              <p className="text-sm text-muted-foreground">
                                1925-2000
                              </p>
                            </div>
                          </div>
                        </div>
                      </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelationshipTab;
