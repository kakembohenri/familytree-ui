// "use client";

// import type React from "react";

// import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
// import { setShowAddMember, showAddDialog } from "@/src/redux/tree/tree-slice";
// import { FamilyNode } from "@/src/types/family-member";
// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import { Textarea } from "../ui/textarea";
// import useAddFamilyMemberService from "@/src/apiServices/useAddFamilyMemberService";

// interface AddFamilyMemberDialogProps{
//   refetch: () => void;
// }

// export function AddFamilyMemberDialog({refetch}:AddFamilyMemberDialogProps) {
//   const [activeTab, setActiveTab] = useState("basic");

//   const {
//     isLoading,
//     handleSubmit,
//     submitMember,
//     register,
//     errors,
//   } = useAddFamilyMemberService({refetch})

//   const dispatch = useAppDispatch();

//   const open = useAppSelector(showAddDialog);

//   const onOpenChange = (show: boolean) => {
//     dispatch(setShowAddMember({ show: show, person: null }));
//   };

//   const handleGenderChange = (value: string) => {
//     // setFormData({
//     //   ...formData,
//     //   gender: value as "male" | "female" | "other",
//     // });
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Add Family Member</DialogTitle>
//           <DialogDescription>
//             Enter information about the new family member to add them to your
//             tree.
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit(submitMember)}>
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="basic">Basic Info</TabsTrigger>
//               <TabsTrigger value="details">Additional Details</TabsTrigger>
//               <TabsTrigger value="relationships">Relationships</TabsTrigger>
//             </TabsList>

//             <TabsContent value="basic" className="space-y-4 py-4">
//               <div className="flex justify-center mb-4">
//                 {/* <div className="relative">
//                   <Avatar
//                     className={cn(
//                       "h-24 w-24 border-2",
//                       formData.gender === "male"
//                         ? "border-blue-300"
//                         : formData.gender === "female"
//                         ? "border-pink-300"
//                         : "border-purple-300"
//                     )}
//                   >
//                     <AvatarImage
//                       src={formData.image || "/placeholder.svg"}
//                       alt={formData.name || "New member"}
//                     />
//                     <AvatarFallback>
//                       {formData.name?.substring(0, 2) || "?"}
//                     </AvatarFallback>
//                   </Avatar>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="icon"
//                     className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
//                     onClick={handleImageUpload}
//                   >
//                     <Upload className="h-4 w-4" />
//                     <span className="sr-only">Upload image</span>
//                   </Button>
//                 </div> */}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="name">
//                   Name <span className="text-destructive">*</span>
//                 </Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   // value={formData.name}
//                   onChange={handleChange}
//                   className={errors.name ? "border-destructive" : ""}
//                 />
//                 {errors.name && (
//                   <p className="text-sm text-destructive">{errors.name}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label>Gender</Label>
//                 <RadioGroup
//                   // value={formData.gender}
//                   onValueChange={handleGenderChange}
//                   className="flex space-x-4"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="male" id="male" />
//                     <Label htmlFor="male">Male</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="female" id="female" />
//                     <Label htmlFor="female">Female</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="other" id="other" />
//                     <Label htmlFor="other">Other</Label>
//                   </div>
//                 </RadioGroup>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="birthYear">Birth Year</Label>
//                   <Input
//                     id="birthYear"
//                     name="birthYear"
//                     type="number"
//                     // value={formData.birthYear || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="deathYear">Death Year</Label>
//                   <Input
//                     id="deathYear"
//                     name="deathYear"
//                     type="number"
//                     // value={formData.deathYear || ""}
//                     onChange={handleChange}
//                     className={errors.deathYear ? "border-destructive" : ""}
//                   />
//                   {errors.deathYear && (
//                     <p className="text-sm text-destructive">
//                       {errors.deathYear}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="pt-2 flex justify-end">
//                 <Button type="button" onClick={() => setActiveTab("details")}>
//                   Next
//                 </Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="details" className="space-y-4 py-4">
//               <div className="space-y-2">
//                 <Label htmlFor="birthPlace">Birth Place</Label>
//                 <Input
//                   id="birthPlace"
//                   name="birthPlace"
//                   // value={formData.birthPlace || ""}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="occupation">Occupation</Label>
//                 <Input
//                   id="occupation"
//                   name="occupation"
//                   // value={formData.occupation || ""}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="bio">Biography</Label>
//                 <Textarea
//                   id="bio"
//                   name="bio"
//                   // value={formData.bio || ""}
//                   onChange={handleChange}
//                   rows={4}
//                 />
//               </div>

//               <div className="pt-2 flex justify-between">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setActiveTab("basic")}
//                 >
//                   Back
//                 </Button>
//                 <Button
//                   type="button"
//                   onClick={() => setActiveTab("relationships")}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="relationships" className="space-y-4 py-4">
//               {/* <div className="space-y-2">
//                 <Label htmlFor="parents">Parents</Label>
//                 <Select
//                   value={relationshipData.parentPartnershipId}
//                   onValueChange={handleParentPartnershipSelect}
//                 >
//                   <SelectTrigger id="parents">
//                     <SelectValue placeholder="Select parents" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {existingPartnerships.map((partnership) => {
//                       const partner1 = existingPeople[partnership.partners[0]];
//                       const partner2 = existingPeople[partnership.partners[1]];

//                       if (!partner1 || !partner2) return null;

//                       return (
//                         <SelectItem key={partnership.id} value={partnership.id}>
//                           {partner1.name} & {partner2.name}
//                         </SelectItem>
//                       );
//                     })}
//                   </SelectContent>
//                 </Select>
//               </div> */}

//               {/* <div className="space-y-2">
//                 <Label htmlFor="partner">Partner</Label>
//                 <Select
//                   value={relationshipData.partnerId}
//                   onValueChange={handlePartnerSelect}
//                 >
//                   <SelectTrigger id="partner">
//                     <SelectValue placeholder="Select partner" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {getAvailablePartners().map((person) => (
//                       <SelectItem key={person.id} value={person.id}>
//                         {person.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div> */}

//               <div className="space-y-2">
//                 <Label>Children</Label>
//                 {/* <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
//                   {Object.values(existingPeople).length > 0 ? (
//                     Object.values(existingPeople).map((person) => (
//                       <div
//                         key={person.id}
//                         className="flex items-center space-x-2 py-1"
//                       >
//                         <input
//                           type="checkbox"
//                           id={`child-${person.id}`}
//                           checked={relationshipData.childrenIds.includes(
//                             person.id
//                           )}
//                           onChange={() => handleChildToggle(person.id)}
//                           className="rounded border-gray-300 text-primary focus:ring-primary"
//                         />
//                         <Label
//                           htmlFor={`child-${person.id}`}
//                           className="cursor-pointer"
//                         >
//                           {person.name}
//                         </Label>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-sm text-muted-foreground py-2">
//                       No existing people to select as children
//                     </p>
//                   )}
//                 </div> */}
//               </div>

//               <div className="pt-2 flex justify-between">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setActiveTab("details")}
//                 >
//                   Back
//                 </Button>
//                 <Button type="submit">Add Family Member</Button>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
