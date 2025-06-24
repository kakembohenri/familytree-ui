import { FamilyNode } from "@/src/types/family-member";
import { Card, CardContent } from "../../ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import { differenceInYears } from "date-fns";

interface DetailsTabProps {
  person: FamilyNode;
}
const DetailsTab = ({ person }: DetailsTabProps) => {
  const calculateLifeSpan = (born: string, died: string) => {
    let result = 0;

    if (died !== null || died !== "") {
      result = differenceInYears(new Date(died), new Date(born));
    } else {
      result = differenceInYears(new Date(born), new Date());
    }
    return `${result} years`;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {person.born && (
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <dt className="font-medium">Birth Place</dt>
                <dd className="text-muted-foreground">{person.placeOfBirth}</dd>
              </div>
            </div>
          )}
          {person.occupation && (
            <div className="flex items-start">
              <Users className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <dt className="font-medium">Occupation</dt>
                <dd className="text-muted-foreground">{person.occupation}</dd>
              </div>
            </div>
          )}
          {(person.born || person.died) && (
            <div className="flex items-start">
              <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <dt className="font-medium">Lifespan</dt>
                <dd className="text-muted-foreground">
                  {/* {person.born || "Unknown"} -{" "}
                              {person.died || "Present"} */}
                  {/* {person.born &&
                                person.died &&
                                ` (${
                                  person.died - person.born
                                } years)`} */}
                  {calculateLifeSpan(person.born, person.died ?? "")}
                </dd>
              </div>
            </div>
          )}
        </dl>

        {person.bio && (
          <div className="mt-6">
            <h4 className="font-medium mb-2">Biography</h4>
            <p className="text-muted-foreground">
              {person.bio || "No biography available."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailsTab;
