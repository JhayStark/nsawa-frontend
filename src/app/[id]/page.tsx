"use client";

import {
	AnimatePresence,
	motion,
	useScroll,
	useSpring,
	useTransform,
	type Variants,
} from "framer-motion";
import {
	Calendar,
	Clock,
	CreditCard,
	Heart,
	MapPin,
	Share2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TributePage() {
	const [activeTab, setActiveTab] = useState("tribute");
	const [contributionAmount, setContributionAmount] = useState("50");
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isLoaded, setIsLoaded] = useState(false);

	const { scrollY } = useScroll();
	const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
	const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
	const x = useSpring(0, springConfig);
	const y = useSpring(0, springConfig);

	useEffect(() => {
		setIsLoaded(true);

		const handleMouseMove = (e: MouseEvent) => {
			const { clientX, clientY } = e;
			const { innerWidth, innerHeight } = window;
			const xPct = (clientX - innerWidth / 2) / innerWidth;
			const yPct = (clientY - innerHeight / 2) / innerHeight;
			x.set(xPct * 20);
			y.set(yPct * 20);
			setMousePosition({ x: clientX, y: clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [x, y]);

	const handleContribution = () => {
		setShowConfirmation(true);
		setTimeout(() => setShowConfirmation(false), 3000);
	};

	const tabs = [
		{ id: "tribute", label: "Tribute", icon: "💝" },
		{ id: "service", label: "Service", icon: "🕊" },
		{ id: "memories", label: "Memories", icon: "💭" },
		{ id: "photos", label: "Photos", icon: "📸" },
	];

	const presetAmounts = ["25", "50", "100", "250"];

	const serviceDateLabel = "Friday, August 2, 2025 at 2:00 PM";
	const quickInfoDate = "Aug 2";
	const quickInfoTime = "2:00 PM";

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 12,
			},
		},
	};

	const tabContentVariants: Variants = {
		hidden: {
			opacity: 0,
			x: -20,
			filter: "blur(4px)" as any,
		},
		visible: {
			opacity: 1,
			x: 0,
			filter: "blur(0px)" as any,
			transition: {
				type: "spring",
				stiffness: 120,
				damping: 20,
				staggerChildren: 0.05,
			},
		},
		exit: {
			opacity: 0,
			x: 20,
			filter: "blur(4px)" as any,
			transition: { duration: 0.2 },
		},
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 overflow-hidden relative">
			{/* Animated background elements */}
			<motion.div
				className="absolute inset-0 opacity-30"
				style={{ y: backgroundY }}
			>
				<div className="absolute top-20 left-20 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
				<div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
			</motion.div>
			{/* Mouse follower */}
			<motion.div
				className="fixed w-6 h-6 bg-amber-400/20 rounded-full pointer-events-none z-50 mix-blend-difference"
				animate={{
					x: mousePosition.x - 12,
					y: mousePosition.y - 12,
				}}
				transition={{
					type: "spring",
					stiffness: 500,
					damping: 28,
				}}
			/>
			{/* Floating particles */}
			{[...Array(6)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
					animate={{
						y: [0, -100, 0],
						x: [0, Math.sin(i) * 50, 0],
						opacity: [0.3, 0.8, 0.3],
					}}
					transition={{
						duration: 8 + i * 2,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
						delay: i * 0.5,
					}}
					style={{
						left: `${20 + i * 15}%`,
						top: `${60 + i * 5}%`,
					}}
				/>
			))}
			<motion.div
				className="relative h-screen flex flex-col lg:flex-row"
				variants={containerVariants}
				initial="hidden"
				animate={isLoaded ? "visible" : "hidden"}
			>
				{/* Left Panel - Tribute Snapshot */}
				<motion.div
					className="lg:w-1/3 p-6 lg:p-8 flex flex-col rounded-2xl shadow-xl"
					variants={itemVariants}
					style={{ x, y }}
				>
					<div className="space-y-6">
						{/* Portrait with advanced animations */}
						<motion.div
							className="relative mx-auto"
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
							aria-label="Portrait of Maria Thompson"
						>
							<motion.div
								className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 p-1 relative overflow-hidden"
								whileHover={{
									boxShadow: "0 0 40px rgba(251, 191, 36, 0.4)",
									rotate: [0, -2, 2, 0],
								}}
								transition={{ duration: 0.6 }}
							>
								<motion.img
									src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt="Smiling portrait of Maria Thompson"
									className="w-full h-full rounded-full object-cover"
									whileHover={{ scale: 1.1 }}
									transition={{ duration: 0.4 }}
								/>
								<motion.div
									className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent rounded-full"
									initial={{ opacity: 0 }}
									whileHover={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								/>
							</motion.div>

							<motion.div
								className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center"
								animate={{
									scale: [1, 1.2, 1],
									rotate: [0, 180, 360],
								}}
								transition={{
									duration: 4,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
								whileHover={{ scale: 1.3 }}
								aria-hidden="true"
							>
								<Heart className="w-4 h-4 text-slate-900" />
							</motion.div>
						</motion.div>

						{/* Name, Dates, Motto */}
						<motion.div
							className="text-center lg:text-left"
							variants={itemVariants}
						>
							<motion.h1
								className="text-3xl lg:text-4xl font-serif font-bold mb-1"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5, duration: 0.8 }}
							>
								Maria Thompson
							</motion.h1>
							<motion.p
								className="text-slate-400 text-lg mb-2"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7, duration: 0.8 }}
							>
								June 9, 1952 – July 24, 2025
							</motion.p>
							<motion.p
								className="text-amber-200 italic font-medium"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.9, duration: 0.8 }}
							>
								“A life of quiet strength, boundless kindness”
							</motion.p>
						</motion.div>

						{/* Quick Stats / Service Info */}
						<motion.div
							className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700"
							variants={itemVariants}
						>
							{[
								{
									icon: Calendar,
									label: quickInfoDate,
									sublabel: quickInfoTime,
								},
								{ icon: MapPin, label: "Location", sublabel: "St. Mary's" },
								{ icon: Clock, label: "Duration", sublabel: "1 Hour" },
							].map((item, index) => (
								<motion.div
									key={index}
									className="text-center cursor-pointer"
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.95 }}
									transition={{ type: "spring", stiffness: 400, damping: 17 }}
								>
									<motion.div
										whileHover={{ rotate: 360 }}
										transition={{ duration: 0.6 }}
									>
										<item.icon
											className="w-5 h-5 text-amber-400 mx-auto mb-1"
											aria-hidden="true"
										/>
									</motion.div>
									<p className="text-xs text-slate-400">{item.label}</p>
									<p className="text-sm font-medium">{item.sublabel}</p>
								</motion.div>
							))}
						</motion.div>

						{/* Divider */}
						<div className="border-t border-slate-700 mt-2" />

						{/* Brief Bio / Timeline */}
						<motion.div variants={itemVariants} className="space-y-2">
							<h3 className="text-lg font-semibold">Life & Legacy</h3>
							<ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
								<li>
									Born in a small Ohio town; devoted over 30 years to elementary
									education.
								</li>
								<li>
									Beloved teacher known for making every child feel seen and
									capable.
								</li>
								<li>
									Passionate gardener, family matriarch, and community
									volunteer.
								</li>
							</ul>
						</motion.div>

						{/* Core values / traits */}
						<motion.div
							variants={itemVariants}
							className="flex flex-wrap gap-2 pt-1"
							aria-label="Core values"
						>
							<Badge className="bg-amber-500 text-slate-900">Kindness</Badge>
							<Badge className="bg-slate-700 text-amber-200">Wisdom</Badge>
							<Badge className="bg-amber-400 text-slate-900">Patience</Badge>
							<Badge className="bg-slate-600 text-slate-300">Community</Badge>
						</motion.div>

						{/* Call to action / Obituary */}
						<motion.div
							variants={itemVariants}
							className="mt-2 flex flex-col gap-2"
						>
							<Button
								className="w-full bg-slate-800 border border-amber-400 text-amber-400 flex items-center justify-center gap-2"
								aria-label="Read full obituary"
							>
								Read Full Obituary
							</Button>
							<button
								className="text-xs underline text-slate-400 hover:text-slate-200 self-start"
								aria-label="Download obituary as PDF"
							>
								Download as PDF
							</button>
						</motion.div>
					</div>
				</motion.div>

				{/* Center Panel - Tabbed Content */}
				<motion.div
					className="lg:w-1/2 p-6 lg:p-8 flex flex-col"
					variants={itemVariants}
				>
					{/* Tab Navigation with morphing background */}
					<div className="flex space-x-1 mb-6 bg-slate-800/50 rounded-lg p-1 relative">
						{tabs.map((tab) => (
							<motion.button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 relative z-10 flex items-center justify-center gap-2 ${
									activeTab === tab.id
										? "text-slate-900"
										: "text-slate-400 hover:text-slate-200"
								}`}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<span className="text-xs">{tab.icon}</span>
								{tab.label}
								{activeTab === tab.id && (
									<motion.div
										className="absolute inset-0 bg-amber-400 rounded-md"
										layoutId="activeTab"
										transition={{ type: "spring", stiffness: 500, damping: 30 }}
										style={{ zIndex: -1 }}
									/>
								)}
							</motion.button>
						))}
					</div>

					{/* Tab Content with advanced transitions */}
					<div className="flex-1 overflow-hidden">
						<AnimatePresence mode="wait">
							{activeTab === "tribute" && (
								<motion.div
									key="tribute"
									variants={tabContentVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="space-y-6"
								>
									<motion.div variants={itemVariants}>
										<h2 className="text-2xl font-serif font-bold mb-4">
											Remembering Maria
										</h2>
										<div className="space-y-4 text-slate-300 leading-relaxed">
											{[
												"Maria Thompson lived a life that touched countless hearts. Born in a small town in Ohio, she dedicated her career to education, spending over 30 years as an elementary school teacher.",
												"Her students remember her not just for her patience and wisdom, but for the way she made each child feel special and capable. Maria believed that every person had something unique to offer the world.",
												"Beyond the classroom, Maria was a devoted mother, grandmother, and friend. She found joy in her garden, Sunday dinners with family, and volunteering at the local animal shelter.",
											].map((text, index) => (
												<motion.p
													key={index}
													variants={itemVariants}
													custom={index}
												>
													{text}
												</motion.p>
											))}
										</div>
									</motion.div>
									<motion.div
										className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-amber-400 relative overflow-hidden"
										variants={itemVariants}
										whileHover={{ scale: 1.02, x: 4 }}
										transition={{ type: "spring", stiffness: 300, damping: 20 }}
									>
										<motion.div
											className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-transparent"
											initial={{ x: "-100%" }}
											whileHover={{ x: "100%" }}
											transition={{ duration: 0.6 }}
										/>
										<p className="italic text-amber-200 relative z-10">
											&quot;The best teachers are those who show you where to
											look, but do not tell you what to see.&quot;
										</p>
										<p className="text-sm text-slate-400 mt-2 relative z-10">
											— Maria&apos;s favorite teaching philosophy
										</p>
									</motion.div>
								</motion.div>
							)}

							{activeTab === "service" && (
								<motion.div
									key="service"
									variants={tabContentVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="space-y-6"
								>
									<motion.div variants={itemVariants}>
										<h2 className="text-2xl font-serif font-bold mb-4">
											Service Details
										</h2>
										<div className="space-y-4">
											{[
												{
													icon: Calendar,
													title: "Memorial Service",
													subtitle: serviceDateLabel,
												},
												{
													icon: MapPin,
													title: "St. Mary's Chapel",
													subtitle: "123 Oak Street, Springfield, OH 45503",
													note: "Reception to follow in Fellowship Hall",
												},
											].map((item, index) => (
												<motion.div
													key={index}
													variants={itemVariants}
													whileHover={{ scale: 1.02, y: -2 }}
													transition={{
														type: "spring",
														stiffness: 300,
														damping: 20,
													}}
												>
													<Card className="bg-slate-800/50 border-slate-700 overflow-hidden relative">
														<motion.div
															className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-transparent"
															initial={{ x: "-100%" }}
															whileHover={{ x: "100%" }}
															transition={{ duration: 0.8 }}
														/>
														<CardContent className="p-4 relative z-10">
															<div className="flex items-start space-x-3">
																<motion.div
																	whileHover={{ rotate: 360, scale: 1.2 }}
																	transition={{ duration: 0.6 }}
																>
																	<item.icon className="w-5 h-5 text-amber-400 mt-1" />
																</motion.div>
																<div>
																	<h3 className="font-semibold">
																		{item.title}
																	</h3>
																	<p className="text-slate-400">
																		{item.subtitle}
																	</p>
																	{item.note && (
																		<p className="text-sm text-amber-200 mt-1">
																			{item.note}
																		</p>
																	)}
																</div>
															</div>
														</CardContent>
													</Card>
												</motion.div>
											))}

											<motion.div
												className="bg-slate-800/30 rounded-lg p-4"
												variants={itemVariants}
												whileHover={{ scale: 1.01 }}
											>
												<h3 className="font-semibold mb-2">
													In lieu of flowers
												</h3>
												<p className="text-slate-300 text-sm">
													The family requests donations be made to the
													Springfield Animal Shelter or the Maria Thompson
													Education Fund.
												</p>
											</motion.div>
										</div>
									</motion.div>
								</motion.div>
							)}

							{activeTab === "memories" && (
								<motion.div
									key="memories"
									variants={tabContentVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="space-y-6"
								>
									<motion.div variants={itemVariants}>
										<h2 className="text-2xl font-serif font-bold mb-4">
											Share a Memory
										</h2>
										<div className="space-y-4">
											<motion.div
												whileFocus={{ scale: 1.02 }}
												transition={{
													type: "spring",
													stiffness: 300,
													damping: 20,
												}}
											>
												<Textarea
													placeholder="Share your favorite memory of Maria..."
													className="bg-slate-800/50 border-slate-600 text-slate-100 placeholder:text-slate-400 min-h-[120px] focus:border-amber-400 transition-colors"
												/>
											</motion.div>
											<div className="flex space-x-3">
												<motion.div
													className="flex-1"
													whileFocus={{ scale: 1.02 }}
												>
													<Input
														placeholder="Your name (optional)"
														className="bg-slate-800/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-amber-400 transition-colors"
													/>
												</motion.div>
												<motion.div
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
												>
													<Button className="bg-amber-400 hover:bg-amber-500 text-slate-900">
														Share Memory
													</Button>
												</motion.div>
											</div>
										</div>
									</motion.div>

									<motion.div className="space-y-3" variants={itemVariants}>
										<h3 className="font-semibold text-lg">Recent Memories</h3>
										<div className="space-y-3 max-h-64 overflow-y-auto">
											{[
												{
													text: "Mrs. Thompson was my 3rd grade teacher. She always believed in me when I didn't believe in myself. Her kindness changed my life.",
													author: "Sarah M.",
												},
												{
													text: "Maria's Sunday dinners brought our whole family together. Her laughter filled every room she entered.",
													author: "David T.",
												},
											].map((memory, index) => (
												<motion.div
													key={index}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: index * 0.1 }}
													whileHover={{ scale: 1.02, x: 4 }}
												>
													<Card className="bg-slate-800/30 border-slate-700">
														<CardContent className="p-4">
															<p className="text-slate-300 text-sm mb-2">
																{memory.text}
															</p>
															<p className="text-slate-500 text-xs">
																— {memory.author}
															</p>
														</CardContent>
													</Card>
												</motion.div>
											))}
										</div>
									</motion.div>
								</motion.div>
							)}

							{activeTab === "photos" && (
								<motion.div
									key="photos"
									variants={tabContentVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="space-y-6"
								>
									<motion.div variants={itemVariants}>
										<h2 className="text-2xl font-serif font-bold mb-4">
											Photo Memories
										</h2>
										<div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
											{[
												"https://images.unsplash.com/photo-1569292912461-802a58b76d5f?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
												"https://images.unsplash.com/photo-1588857805015-3fb765b35e92?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMwfHx8ZW58MHx8fHx8",
												"https://images.unsplash.com/photo-1542595735-e9f9932efe8b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM1fHx8ZW58MHx8fHx8",
												"https://images.unsplash.com/photo-1601745398440-0118cf2a433f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8",
												"https://images.unsplash.com/photo-1567125160728-02758830ef6d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
												"https://plus.unsplash.com/premium_photo-1664461666605-902038868774?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDY3fHx8ZW58MHx8fHx8",
												"https://images.unsplash.com/photo-1573579509754-e9c73edcbaf0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDk0fHx8ZW58MHx8fHx8",
												"https://images.unsplash.com/photo-1616014247708-51c2d58e6bd8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDg4fHx8ZW58MHx8fHx8",
												"https://images.unsplash.com/photo-1662690833162-c45cae0357fc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDg5fHx8ZW58MHx8fHx8",
											].map((imageUrl, index) => (
												<motion.div
													key={index}
													className="aspect-square rounded-lg overflow-hidden bg-slate-800/50 border border-slate-700 cursor-pointer"
													initial={{ opacity: 0, scale: 0.8 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{ delay: index * 0.1 }}
													whileHover={{
														scale: 1.05,
														rotate: Math.random() * 4 - 2,
														zIndex: 10,
													}}
													whileTap={{ scale: 0.95 }}
												>
													<motion.img
														src={imageUrl}
														alt={`Memory ${index + 1}`}
														className="w-full h-full object-cover"
														whileHover={{ scale: 1.1 }}
														transition={{ duration: 0.4 }}
													/>
												</motion.div>
											))}
										</div>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</motion.div>

				{/* Right Panel - Contribution with enhanced animations */}
				<motion.div
					className="lg:w-1/3 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-slate-700"
					variants={itemVariants}
				>
					<div className="space-y-6">
						<motion.div variants={itemVariants}>
							<h2 className="text-2xl font-serif font-bold mb-2">
								Contribute in Her Honor
							</h2>
							<p className="text-slate-400 text-sm">
								Support the family&apos;s legacy—your gift honors her memory.
							</p>
						</motion.div>

						<AnimatePresence mode="wait">
							{showConfirmation ? (
								<motion.div
									key="confirmation"
									initial={{ opacity: 0, scale: 0.8, y: 20 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.8, y: -20 }}
									className="bg-green-900/50 border border-green-700 rounded-lg p-6 text-center"
								>
									<motion.div
										className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-3"
										animate={{
											scale: [1, 1.2, 1],
											rotate: [0, 360],
										}}
										transition={{ duration: 0.6 }}
									>
										<Heart className="w-6 h-6 text-green-900" />
									</motion.div>
									<h3 className="font-semibold text-green-200 mb-2">
										Thank You
									</h3>
									<p className="text-green-300 text-sm">
										Your contribution has been received with gratitude.
									</p>
								</motion.div>
							) : (
								<motion.div
									key="form"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="space-y-4"
								>
									{/* Amount Selection with morphing selection */}
									<motion.div variants={itemVariants}>
										<label className="block text-sm font-medium mb-2">
											Contribution Amount
										</label>
										<div className="grid grid-cols-4 gap-2 mb-3 relative">
											{/* {presetAmounts.map((amount) => ( */}
											{/* 	<motion.button */}
											{/* 		key={amount} */}
											{/* 		onClick={() => setContributionAmount(amount)} */}
											{/* 		className={`py-2 px-3 rounded-md text-sm font-medium transition-colors relative ${ */}
											{/* 			contributionAmount === amount */}
											{/* 				? "text-slate-900" */}
											{/* 				: "bg-slate-800 text-slate-300 hover:bg-slate-700" */}
											{/* 		}`} */}
											{/* 		whileHover={{ scale: 1.05 }} */}
											{/* 		whileTap={{ scale: 0.95 }} */}
											{/* 	> */}
											{/* 		${amount} */}
											{/* 		{contributionAmount === amount && ( */}
											{/* 			<motion.div */}
											{/* 				className="absolute inset-0 bg-amber-400 rounded-md" */}
											{/* 				layoutId="selectedAmount" */}
											{/* 				transition={{ */}
											{/* 					type: "spring", */}
											{/* 					stiffness: 500, */}
											{/* 					damping: 30, */}
											{/* 				}} */}
											{/* 				style={{ zIndex: -1 }} */}
											{/* 			/> */}
											{/* 		)} */}
											{/* 	</motion.button> */}
											{/* ))} */}
										</div>
										<motion.div whileFocus={{ scale: 1.02 }}>
											<Input
												type="number"
												value={contributionAmount}
												onChange={(e) => setContributionAmount(e.target.value)}
												className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-amber-400 transition-colors"
												placeholder="Custom amount"
											/>
										</motion.div>
									</motion.div>

									{/* Contributor Info with focus animations */}
									<motion.div className="space-y-3" variants={itemVariants}>
										{[
											{ placeholder: "Name (optional)", type: "text" },
											{ placeholder: "Email (optional)", type: "email" },
										].map((field, index) => (
											<motion.div key={index} whileFocus={{ scale: 1.02 }}>
												<Input
													type={field.type}
													placeholder={field.placeholder}
													className="bg-slate-800/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-amber-400 transition-colors"
												/>
											</motion.div>
										))}
										<motion.div whileFocus={{ scale: 1.02 }}>
											<Textarea
												placeholder="Message (optional)"
												className="bg-slate-800/50 border-slate-600 text-slate-100 placeholder:text-slate-400 min-h-[80px] focus:border-amber-400 transition-colors"
											/>
										</motion.div>
									</motion.div>

									{/* Payment Button with advanced hover effects */}
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										variants={itemVariants}
									>
										<Button
											onClick={handleContribution}
											className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold py-3 relative overflow-hidden"
										>
											<motion.div
												className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
												initial={{ x: "-100%" }}
												whileHover={{ x: "100%" }}
												transition={{ duration: 0.6 }}
											/>
											<CreditCard className="w-4 h-4 mr-2" />
											Contribute ${contributionAmount}
										</Button>
									</motion.div>

									<motion.div
										className="flex items-center justify-center space-x-2 text-xs text-slate-500"
										variants={itemVariants}
									>
										<Badge
											variant="outline"
											className="border-slate-600 text-slate-400"
										>
											Secure
										</Badge>
										<span>•</span>
										<span>Powered by Stripe</span>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</motion.div>
			</motion.div>
			{/* Enhanced Footer Strip */}
			<motion.div
				className="absolute bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 px-6 py-3"
				initial={{ y: 100 }}
				animate={{ y: 0 }}
				transition={{ delay: 1, type: "spring", stiffness: 100, damping: 20 }}
			>
				<div className="flex items-center justify-between text-xs text-slate-400">
					<div className="flex items-center space-x-4">
						<span>Hosted by Transition Funeral Home</span>
						<motion.button
							className="flex items-center space-x-1 hover:text-slate-200 transition-colors"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Share2 className="w-3 h-3" />
							<span>Share</span>
						</motion.button>
					</div>
					<div className="flex items-center space-x-2">
						<motion.button
							className="hover:text-slate-200 transition-colors"
							whileHover={{ scale: 1.05 }}
						>
							Accessibility
						</motion.button>
						<span>•</span>
						<motion.button
							className="hover:text-slate-200 transition-colors"
							whileHover={{ scale: 1.05 }}
						>
							Contact
						</motion.button>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
