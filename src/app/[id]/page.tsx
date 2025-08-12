"use client";

import {
	AnimatePresence,
	motion,
	useScroll,
	useSpring,
	useTransform,
	type Variants,
} from "framer-motion";
import Image from "next/image";
import { type SVGProps, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Tab = "memories" | "tribute" | "services" | "photos";

export default function TributePage() {
	const [activeTab, setActiveTab] = useState<Tab>("memories");
	const [contributionAmount, setContributionAmount] = useState("");
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

	const tabs: Array<{ id: Tab; label: string; icon: string }> = [
		{ id: "memories", label: "Memories", icon: "💭" },
		{ id: "tribute", label: "Tribute", icon: "💝" },
		{ id: "services", label: "Service", icon: "🕊" },
		{ id: "photos", label: "Photos", icon: "📸" },
	];

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
			x: -10,
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.3,
				staggerChildren: 0.05,
			},
		},
		exit: {
			opacity: 0,
			x: 10,
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.2,
			},
		},
	};

	return (
		<div className="h-screen bg-gradient-to-br from-[#1a2321] via-[#040a09] to-[#1a2321] text-slate-100 overflow-auto">
			{/* <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 overflow-y-auto"> */}
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
				className="fixed w-6 h-6 bg-amber-400/20 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
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
					className="absolute w-2 h-2 bg-amber-400/30 rounded-full hidden lg:block"
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
				className="relative flex flex-col lg:flex-row w-full h-full"
				variants={containerVariants}
				initial="hidden"
				animate={isLoaded ? "visible" : "hidden"}
			>
				{/* Left Panel - Tribute Snapshot */}
				<motion.div
					className="w-full lg:w-1/4 p-6 lg:p-8 flex flex-col rounded-2xl shadow-xl"
					variants={itemVariants}
					style={{ x, y }}
				>
					<div className="space-y-6">
						{/* Portrait with advanced animations */}
						<motion.div
							className="relative mx-auto"
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
							aria-label="Portrait of Eleanor Grace Thompson"
						>
							<motion.div
								className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 p-1 relative overflow-hidden mx-auto"
								whileHover={{
									boxShadow: "0 0 40px rgba(251, 191, 36, 0.4)",
									rotate: [0, -2, 2, 0],
								}}
								transition={{ duration: 0.6 }}
							>
								<motion.img
									src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt="Smiling portrait of Eleanor Grace Thompson"
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

							{/* <motion.div */}
							{/* 	className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center" */}
							{/* 	animate={{ */}
							{/* 		scale: [1, 1.2, 1], */}
							{/* 		rotate: [0, 180, 360], */}
							{/* 	}} */}
							{/* 	transition={{ */}
							{/* 		duration: 4, */}
							{/* 		repeat: Number.POSITIVE_INFINITY, */}
							{/* 		ease: "easeInOut", */}
							{/* 	}} */}
							{/* 	whileHover={{ scale: 1.3 }} */}
							{/* 	aria-hidden="true" */}
							{/* > */}
							{/* 	<Heart className="w-4 h-4 text-slate-900" /> */}
							{/* </motion.div> */}
							<div className="absolute -bottom-8 right-5 flex items-center justify-center">
								<Image
									src="/image/flower.png"
									width={100}
									height={100}
									alt="flower"
								/>
							</div>
						</motion.div>

						{/* Name, Dates, Motto */}
						<motion.div className="text-center" variants={itemVariants}>
							<motion.h1
								className="text-3xl lg:text-2xl font-serif font-bold mb-1"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5, duration: 0.8 }}
							>
								Eleanor Grace Thompson
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
									icon: CalendarSvg,
									label: "Aug 2",
									sublabel: "2:00 PM",
								},
								{
									icon: LocationSvg,
									label: "Location",
									sublabel: "St. Mary's",
								},
								{ icon: ClockSvg, label: "Duration", sublabel: "1 Hour" },
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
							<h3 className="text-lg font-semibold text-center lg:text-left">
								Life & Legacy
							</h3>
							<ul className="list-disc list-inside text-sm text-slate-300 space-y-1 text-center lg:text-left">
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
							className="flex flex-wrap gap-2 pt-1 justify-center lg:justify-start"
							aria-label="Core values"
						>
							{/* <Badge className="bg-amber-500 text-slate-900">Kindness</Badge> */}
							{/* <Badge className="bg-slate-700 text-amber-200">Wisdom</Badge> */}
							{/* <Badge className="bg-amber-400 text-slate-900">Patience</Badge> */}
						</motion.div>

						{/* Call to action / Obituary */}
						<motion.div
							variants={itemVariants}
							className="mt-2 flex flex-col gap-2 items-center lg:items-start"
						>
							<Button
								className="w-full bg-slate-800 border border-amber-400 text-amber-400 flex items-center justify-center gap-2"
								aria-label="Read full obituary"
							>
								Read Full Obituary
							</Button>
							{/* <button */}
							{/* 	className="text-xs underline text-slate-400 hover:text-slate-200 self-center lg:self-start" */}
							{/* 	aria-label="Download obituary as PDF" */}
							{/* > */}
							{/* 	Download as PDF */}
							{/* </button> */}
						</motion.div>
					</div>
				</motion.div>

				{/* Center Panel - Tabbed Content */}
				<motion.div
					className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col"
					variants={itemVariants}
				>
					{/* Tab Navigation with morphing background */}
					<div className="flex flex-wrap space-x-1 mb-6 bg-slate-800/50 rounded-lg p-1 relative">
						{tabs.map((tab) => (
							<motion.button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 relative z-10 flex items-center justify-center gap-2 ${
									activeTab === tab.id
										? "text-slate-900"
										: "text-slate-400 hover:text-slate-200"
								}`}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<span className="text-xs">{tab.icon}</span>
								<span className="hidden sm:inline">{tab.label}</span>
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
									className="space-y-6 p-2"
								>
									<motion.div variants={itemVariants}>
										<h2 className="text-2xl font-serif font-bold mb-4 text-center lg:text-left">
											Remembering Eleanor Grace
										</h2>
										<div className="space-y-4 text-slate-300 leading-relaxed text-center lg:text-left">
											{[
												"Eleanor Grace Thompson lived a life that touched countless hearts. Born in a small town in Ohio, she dedicated her career to education, spending over 30 years as an elementary school teacher.",
												"Her students remember her not just for her patience and wisdom, but for the way she made each child feel special and capable. Eleanor Grace believed that every person had something unique to offer the world.",
												"Beyond the classroom, Eleanor Grace was a devoted mother, grandmother, and friend. She found joy in her garden, Sunday dinners with family, and volunteering at the local animal shelter.",
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
											— Eleanor Grace&apos;s favorite teaching philosophy
										</p>
									</motion.div>
								</motion.div>
							)}

							{activeTab === "services" && (
								<motion.div
									key="services"
									variants={tabContentVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="space-y-6 p-2"
								>
									<motion.div variants={itemVariants}>
										<h2 className="text-2xl font-serif font-bold mb-4 text-center lg:text-left">
											Service Details
										</h2>
										<div className="space-y-4">
											{[
												{
													icon: CalendarSvg,
													title: "Memorial Service",
													subtitle: "Friday, August 2, 2025 at 2:00 PM",
												},
												{
													icon: LocationSvg,
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
																	<h3 className="font-semibold text-white">
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
												<h3 className="font-semibold mb-2 text-center lg:text-left">
													In lieu of flowers
												</h3>
												<p className="text-slate-300 text-sm text-center lg:text-left">
													The family requests donations be made to the
													Springfield Animal Shelter or the Eleanor Grace
													Thompson Education Fund.
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
									className="space-y-6 p-2"
								>
									<motion.div variants={itemVariants}>
										<h2 className="text-2xl font-serif font-bold mb-4 text-center lg:text-left">
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
													placeholder="Share your favorite memory of Eleanor Grace..."
													className="bg-slate-800/50  border-slate-600 text-slate-100 placeholder:text-slate-400 max-h-[120px] transition-colors resize-none"
												/>
											</motion.div>
											<div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
												<motion.div
													className="flex-1"
													whileFocus={{ scale: 1.02 }}
												>
													<Input
														placeholder="Your name (optional)"
														className="bg-slate-800/50 border-slate-600 text-slate-100 placeholder:text-slate-400 transition-colors"
													/>
												</motion.div>
												<motion.div
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
												>
													<Button className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900">
														Share Memory
													</Button>
												</motion.div>
											</div>
										</div>
									</motion.div>

									<motion.div className="space-y-3" variants={itemVariants}>
										<h3 className="font-semibold text-lg text-center lg:text-left">
											Recent Memories
										</h3>
										<div className="space-y-3 max-h-[500px] overflow-y-scroll p-4 cursor-all-scroll">
											{[
												{
													text: "Mrs. Thompson encouraged me to pursue art, and now I paint every day with joy.",
													author: "Emma W.",
												},
												{
													text: "Coach Miller taught me resilience — not just in sports, but in life.",
													author: "James R.",
												},
												{
													text: "Grandma Lucy's bedtime stories sparked my love for reading and writing.",
													author: "Hannah K.",
												},
												{
													text: "Uncle Ben always reminded me to be kind to everyone, no matter the circumstances.",
													author: "Michael P.",
												},
												{
													text: "Aunt Clara’s smile could brighten even the gloomiest of days.",
													author: "Sophie L.",
												},
												{
													text: "Mr. Carter showed me that hard work and patience can open any door.",
													author: "Daniel H.",
												},
												{
													text: "Nana Mae baked the best pies, but her warmth was the real treat.",
													author: "Olivia F.",
												},
												{
													text: "Eleanor Grace’s Sunday dinners brought our whole family together. Her laughter filled every room she entered.",
													author: "David T.",
												},
												{
													text: "The journey of a thousand miles begins with a single step.",
													author: "Lao Tzu",
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
									className="space-y-6 p-2"
								>
									<motion.div variants={itemVariants}>
										<h2 className="text-2xl font-serif font-bold mb-4 text-center lg:text-left">
											Photo Memories
										</h2>
										<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
					className="w-full lg:w-1/4 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-slate-700"
					variants={itemVariants}
				>
					<div className="space-y-6 p-2">
						<motion.div variants={itemVariants}>
							<h2 className="text-2xl font-serif font-bold mb-2 text-center lg:text-left">
								Contribute in Her Honor
							</h2>
							<p className="text-slate-400 text-sm text-center lg:text-left">
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
										<HeartSvg className="text-green-900" />
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
										<label className="block text-sm font-medium mb-2 text-center lg:text-left">
											Contribution Amount
										</label>
										<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 relative">
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
												className="bg-slate-800/50 border-slate-600 text-slate-100 transition-colors 
                                                 [&::-webkit-inner-spin-button]:appearance-none"
												placeholder="Enter Amount"
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
													className="bg-slate-800/50 border-slate-600 text-slate-100  transition-colors"
												/>
											</motion.div>
										))}
										<motion.div whileFocus={{ scale: 1.02 }}>
											<Textarea
												placeholder="Message (optional)"
												className="bg-slate-800/50 border-slate-600 text-slate-100  min-h-[80px]  transition-colors resize-none "
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
											<CardSvg className="w-5 h-5 mr-2" />
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
		</div>
	);
}

function CalendarSvg(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="none"
			{...props}
		>
			<path
				d="M16 2V6M8 2V6"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M3 10H21"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M11.9955 14H12.0045M11.9955 18H12.0045M15.991 14H16M8 14H8.00897M8 18H8.00897"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function LocationSvg(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="none"
			{...props}
		>
			<path
				d="M18 18C19.2447 18.4244 20 18.9819 20 19.5925C20 20.9221 16.4183 22 12 22C7.58172 22 4 20.9221 4 19.5925C4 18.9819 4.75527 18.4244 6 18"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
			></path>
			<path
				d="M15 9.5C15 11.1569 13.6569 12.5 12 12.5C10.3431 12.5 9 11.1569 9 9.5C9 7.84315 10.3431 6.5 12 6.5C13.6569 6.5 15 7.84315 15 9.5Z"
				stroke="currentColor"
				stroke-width="2"
			></path>
			<path
				d="M12 2C16.0588 2 19.5 5.42803 19.5 9.5869C19.5 13.812 16.0028 16.777 12.7725 18.7932C12.5371 18.9287 12.2709 19 12 19C11.7291 19 11.4629 18.9287 11.2275 18.7932C8.00325 16.7573 4.5 13.8266 4.5 9.5869C4.5 5.42803 7.9412 2 12 2Z"
				stroke="currentColor"
				stroke-width="2"
			></path>
		</svg>
	);
}

function ClockSvg(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="none"
			{...props}
		>
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				stroke-width="2"
			></circle>
			<path
				d="M12 8V12L14 14"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	);
}

function HeartSvg(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="none"
			{...props}
		>
			<path
				d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	);
}

function CardSvg(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="none"
			{...props}
		>
			<path
				d="M3.3457 16.1976L16.1747 3.36866M18.6316 11.0556L16.4321 13.2551M14.5549 15.1099L13.5762 16.0886"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
			></path>
			<path
				d="M3.17467 16.1411C1.60844 14.5749 1.60844 12.0355 3.17467 10.4693L10.4693 3.17467C12.0355 1.60844 14.5749 1.60844 16.1411 3.17467L20.8253 7.85891C22.3916 9.42514 22.3916 11.9645 20.8253 13.5307L13.5307 20.8253C11.9645 22.3916 9.42514 22.3916 7.85891 20.8253L3.17467 16.1411Z"
				stroke="currentColor"
				stroke-width="2"
			></path>
			<path
				d="M4 22H20"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
			></path>
		</svg>
	);
}
