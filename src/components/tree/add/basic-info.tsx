import { cn } from "@/src/lib/utils";
import { IAddMemberSchema } from "@/src/validations/family-member-validation";
import { Label } from "@radix-ui/react-label";
import { Upload } from "lucide-react";
import { FC } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

interface BasicInfoProps {
  register: UseFormRegister<IAddMemberSchema>;
  errors: FieldErrors<IAddMemberSchema>;
  watch: UseFormWatch<IAddMemberSchema>;
  setValue: UseFormSetValue<IAddMemberSchema>;
}
const BasicInfo: FC<BasicInfoProps> = ({
  register,
  errors,
  watch,
  setValue,
}) => {
  const gender = watch("gender");

  const handleGenderChange = (option: string) => {
    setValue("gender", option as "Male" | "Female");
  };
  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <Avatar className={cn("h-24 w-24 border-2", "border-purple-300")}>
            <AvatarImage src={"/placeholder.svg"} alt={"New member"} />
            {/* <AvatarFallback>
                      {formData.name?.substring(0, 2) || "?"}
                    </AvatarFallback> */}
          </Avatar>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
            // onClick={handleImageUpload}
          >
            <Upload className="h-4 w-4" />
            <span className="sr-only">Upload avatar</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First name</Label>
          <Input
            id="first-name"
            {...register("firstName")}
            placeholder="Enter first name...."
          />
          {errors.firstName && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="middle-name">Middle name</Label>
          <Input
            id="middle-name"
            {...register("middleName")}
            placeholder="Enter middle name...."
          />
          {errors.middleName && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.middleName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input
            id="last-name"
            {...register("lastName")}
            placeholder="Enter last name...."
          />
          {errors.lastName && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Gender</Label>
        <RadioGroup
          value={gender}
          onValueChange={handleGenderChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="birthYear">Date of Birth</Label>
          <Input id="birthYear" type="date" {...register("born")} />
          {errors.born && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.born.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="deathYear">Date of Death</Label>
          <Input
            id="deathYear"
            type="date"
            {...register("died")}
            className={errors.died ? "border-destructive" : ""}
          />
          {errors.died && (
            <p className="text-sm text-destructive">{errors.died.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
