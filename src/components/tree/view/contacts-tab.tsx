import { FamilyNode } from "@/src/types/family-member";
import { Card, CardContent } from "../../ui/card";
import { Briefcase, Phone } from "lucide-react";

interface ContactsTabProps {
  person: FamilyNode;
}

const ContactsTab = ({ person }: ContactsTabProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {person.email && (
            <div className="flex items-start">
              <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <dt className="font-medium">Email</dt>
                <dd className="text-muted-foreground">{person.email}</dd>
              </div>
            </div>
          )}
          {person.phone && (
            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <dt className="font-medium">Phone</dt>
                <dd className="text-muted-foreground">{person.phone}</dd>
              </div>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
};

export default ContactsTab;
