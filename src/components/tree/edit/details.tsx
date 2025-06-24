import { IUpdateMemberSchema } from "@/src/validations/family-member-validation";
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

interface DetailsProps {
  register: UseFormRegister<IUpdateMemberSchema>;
  errors: FieldErrors<IUpdateMemberSchema>;
}

const Details: FC<DetailsProps> = ({ register, errors }) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="birthPlace">Birth Place</Label>
        <Input id="birthPlace" {...register("placeOfBirth")} />
        {errors.placeOfBirth && (
          <p className="text-sm" style={{ color: "red" }}>
            {errors.placeOfBirth.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupation">Occupation</Label>
        <Input id="occupation" {...register("occupation")} />
        {errors.occupation && (
          <p className="text-sm" style={{ color: "red" }}>
            {errors.occupation.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Biography</Label>
        <Textarea id="bio" {...register("bio")} rows={4} />
        {errors.bio && (
          <p className="text-sm" style={{ color: "red" }}>
            {errors.bio.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Details;
