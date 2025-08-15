"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ImageListType } from "react-images-uploading";
import * as z from "zod";
import FileUpload from "@/components/FileUpload";
import { SmsPurchaseFlow } from "@/components/SmsPurchaseFlow";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { DatePickerField, InputField } from "@/components/ui/form-fields";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCreateMutation } from "@/lib/features/funeralApiSlice";

const createFuneralSchema = z.object({
	nameOfDeceased: z.string().min(1, "Name is required"),
	familyName: z.string().min(1, "Family name is required"),
	yearOfBirth: z.string().min(1, "Year of birth is required"),
	yearOfDeath: z.string().min(1, "Year of death is required"),
	phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
	funeralLocation: z.string().min(1, "Funeral location is required"),
	startDate: z.date(),
	endDate: z.date(),
	lifeAndLegacy: z
		.string()
		.min(10, "Life and legacy must be at least 10 characters"),
	tribute: z.string().min(10, "Tribute must be at least 10 characters"),
	donationRequest: z.string().optional(),
	funeralEndDate: z.string().min(1, "Funeral end time is required"),
});

const preset_key: string = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string;
const cloud_name: string = process.env
	.NEXT_PUBLIC_CLOUDINARY_USERNAME as string;

const handleImageUpload = async (imageFiles: File[]) => {
	const files = imageFiles;

	try {
		const uploadPromises = files.map(async (file) => {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", preset_key);
			const response = await axios.post(
				`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
				formData,
			);
			return response.data.secure_url;
		});

		const uploadedImages = await Promise.all(uploadPromises);
		return uploadedImages;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const CreateFuneral = () => {
	const { toast } = useToast();
	const router = useRouter();
	const [createFuneral] = useCreateMutation();
	const [submitting, setSubmitting] = useState(false);
	const [showSmsPlans, setShowSmsPlans] = useState(false);
	const [funeralId, setFuneralId] = useState<string | null>(null);
	const [imageData, setImageData] = useState<{
		bannerIndex: number | null;
		images: ImageListType | [];
	}>({ bannerIndex: null, images: [] });

	const form = useForm<z.infer<typeof createFuneralSchema>>({
		resolver: zodResolver(createFuneralSchema),
		defaultValues: {
			nameOfDeceased: "",
			familyName: "",
			yearOfBirth: "",
			yearOfDeath: "",
			phoneNumber: "",
			funeralLocation: "",
			lifeAndLegacy: "",
			tribute: "",
			donationRequest: "",
			funeralEndDate: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof createFuneralSchema>) => {
		setSubmitting(true);
		if (imageData?.images?.length <= 0) {
			setSubmitting(false);
			toast({
				title: "Upload images of deceased",
				description:
					"You failed to upload images of the deceased or set a banner Image",
			});

			return;
		}

		const bannerImage = imageData.images[0].file as File;

		// Filter out the undefined values
		const imagesWithoutBannerImage = imageData.images
			.map((image, index) =>
				index !== imageData.bannerIndex ? image.file : null,
			)
			.filter((file): file is File => file !== null);

		// Debug: Log filtered images
		console.log("Images without banner:", imagesWithoutBannerImage);

		// Upload images
		let imageToUpload = [];
		if (imageData.images?.length > 1) {
			imageToUpload = (await handleImageUpload(imagesWithoutBannerImage)) || [];
		}
		const uploadedBannerImage = (await handleImageUpload([bannerImage])) || [];

		// Add image URLs to the data
		if ([...imageToUpload, ...uploadedBannerImage].length < 1) {
			toast({
				title: "Image upload failed",
				description:
					"An error occurred while uploading the images. Please try again.",
				variant: "destructive",
			});
			setSubmitting(false);
			return;
		}

		const objectToSubmit = {
			...data,
			imagesOfDeceased: [...imageToUpload, ...uploadedBannerImage],
			bannerImage: uploadedBannerImage[0],
		};

		createFuneral(objectToSubmit)
			.unwrap()
			.then((res) => {
				console.log(res);
				// toast({
				//   title: 'Funeral Created',
				// });
				setFuneralId(res?.id);
				// setShowSmsPlans(true);
				router.push(`/app/funerals/${res?.id}`);
			})
			.catch((err) => {
				console.log(err);
				toast({
					title: "Failed to create funeral",
					variant: "destructive",
				});
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	const onImageChange = (data: any) => {
		setImageData(data);
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full max-w-[1500px]">
			<Form {...form}>
				<div className=" space-y-3 lg:space-y-5 max-w-xl pb-5">
					<div className="flex items-center justify-between">
						<h2 className="text-primary font-bold text-lg lg:text-2xl">
							Set Up Funeral
						</h2>
						<div className="flex justify-end items-center">
							<Dialog>
								<DialogTrigger className="flex gap-2 text-sm items-center bg-secondary rounded-md p-2 lg:hidden">
									<Upload size={18} />
									<span>Upload Images</span>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle className="mb-5">Upload Images</DialogTitle>
										<FileUpload onUpdate={onImageChange} />
									</DialogHeader>
								</DialogContent>
							</Dialog>
						</div>
					</div>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-3 lg:space-y-5"
						id="funeral-form"
					>
						<InputField
							form={form}
							placeholder="Name of Deceased"
							name="nameOfDeceased"
							className="placeholder:text-gray-500"
						/>
						<InputField
							form={form}
							placeholder="Family Name"
							name="familyName"
							className="placeholder:text-gray-500"
						/>
						<InputField
							form={form}
							placeholder="Designated Phone Number for Funeral"
							name="phoneNumber"
							className="placeholder:text-gray-500"
							description="This phone number will be used to confirm all funeral withdrawals"
						/>
						<InputField
							form={form}
							placeholder="Funeral location"
							name="funeralLocation"
							className="placeholder:text-gray-500"
						/>
						<InputField
							form={form}
							placeholder="Year of Birth"
							name="yearOfBirth"
							className="placeholder:text-gray-500"
						/>
						<InputField
							form={form}
							placeholder="Year of Passing"
							name="yearOfDeath"
							className="placeholder:text-gray-500"
						/>
						<DatePickerField
							form={form}
							placeholder="Start date of funeral"
							name="startDate"
						/>
						<DatePickerField
							form={form}
							placeholder="End date of funeral"
							name="endDate"
						/>
						<InputField
							form={form}
							placeholder="Funeral End Time (e.g., 3:00 PM)"
							name="funeralEndDate"
							className="placeholder:text-gray-500"
						/>
						<div className="space-y-2">
							<Textarea
								{...form.register("lifeAndLegacy")}
								placeholder="Write about the life and legacy of the deceased..."
								rows={4}
								className="placeholder:text-gray-500"
							/>
							{form.formState.errors.lifeAndLegacy && (
								<p className="text-red-500 text-sm">
									{form.formState.errors.lifeAndLegacy.message}
								</p>
							)}
						</div>
						<div className="space-y-2">
							<Textarea
								{...form.register("tribute")}
								placeholder="Write a tribute to the deceased..."
								rows={4}
								className="placeholder:text-gray-500"
							/>
							{form.formState.errors.tribute && (
								<p className="text-red-500 text-sm">
									{form.formState.errors.tribute.message}
								</p>
							)}
						</div>
						<InputField
							form={form}
							placeholder="Donation Request (Optional)"
							name="donationRequest"
							className="placeholder:text-gray-500"
						/>
					</form>
					<Button
						className="bg-primary lg:h-16 w-full lg:w-48"
						form="funeral-form"
						disabled={submitting}
					>
						{submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Set Up Funeral
					</Button>
				</div>
			</Form>
			<div className="hidden lg:block">
				<div className="max-w-xl ml-auto">
					<FileUpload onUpdate={onImageChange} />
				</div>
			</div>
			<SmsPurchaseFlow funeralId={funeralId as string} open={showSmsPlans} />
		</div>
	);
};

export default CreateFuneral;
