"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FuneralDonationPage() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	// QR Code URL pointing to a donation page
	const donationUrl = "https://www.example.com/donate/memorial-fund";
	const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
		donationUrl,
	)}&bgcolor=FFFFFF&color=1a1a1a&margin=10&ecc=M`;

	function handleCopyLink() {
		navigator.clipboard
			.writeText(donationUrl)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			})
			.catch(() => {
				/* no-op */
			});
	}

	async function handleShare() {
		try {
			if (navigator.share) {
				await navigator.share({
					title: "Memorial Fund",
					text: "Support the Eleanor Grace Memorial Fund",
					url: donationUrl,
				});
			} else {
				handleCopyLink();
			}
		} catch (error) {
			/* sharing cancelled or failed */
		}
	}

	return (
		<div className="min-h-[100dvh] bg-gradient-to-br from-[#1a2321] via-[#040a09] to-[#1a2321] relative overflow-x-hidden">
			{/* Subtle background pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full" />
				<div className="absolute bottom-32 right-32 w-24 h-24 border border-white/10 rounded-full" />
				<div className="absolute top-1/2 left-10 w-2 h-16 bg-white/10 rounded-full" />
				<div className="absolute top-1/3 right-20 w-1 h-12 bg-white/15 rounded-full" />
			</div>

			<main className="min-h-[100dvh] flex items-center justify-center px-4 py-6 sm:px-6 lg:p-12 [padding-top:calc(env(safe-area-inset-top)+1rem)] [padding-bottom:calc(env(safe-area-inset-bottom)+1rem)]">
				<div
					className={`w-full max-w-7xl transition-all duration-1000 ease-out transform ${
						isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}
				>
					{/* Main Grid - Desktop: 2 columns, Mobile: 1 column */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
						{/* Left Column - Memorial Content */}
						<div className="space-y-6 lg:space-y-8">
							{/* Header */}
							<div
								className={`transition-all duration-800 delay-200 ease-out transform ${
									isLoaded
										? "opacity-100 translate-x-0"
										: "opacity-0 -translate-x-6"
								}`}
							>
								<div className="space-y-4">
									<div className="flex items-center space-x-4 mb-6">
										<div className="w-12 h-px bg-gradient-to-r from-amber-400 to-amber-600" />
										<div className="w-2 h-2 bg-amber-500 rounded-full" />
									</div>

									<h1 className="text-sm sm:text-base lg:text-xl font-light text-amber-400 tracking-[0.2em] uppercase">
										In Loving Memory Of
									</h1>
									<h2 className="text-3xl sm:text-4xl lg:text-6xl font-light text-white leading-tight tracking-tight">
										Eleanor Grace
										<br />
										<span className="text-slate-300">Thompson</span>
									</h2>

									{/* Date */}
									<div className="flex items-center space-x-6 pt-2 sm:pt-4">
										<div className="text-lg sm:text-xl text-slate-400 font-light">
											1952
										</div>
										<div className="flex items-center space-x-2">
											<div className="w-1 h-1 bg-amber-500 rounded-full" />
											<div className="w-8 h-px bg-slate-600" />
											<div className="w-1 h-1 bg-amber-500 rounded-full" />
										</div>
										<div className="text-lg sm:text-xl text-slate-400 font-light">
											2024
										</div>
									</div>
								</div>
							</div>

							{/* Memorial Photo */}
							<div
								className={`relative transition-all duration-800 delay-400 ease-out transform ${
									isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
								}`}
							>
								<div className="relative group">
									<div className="absolute -inset-1 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-lg blur-sm" />
									<div className="relative overflow-hidden rounded-lg bg-slate-800 p-2">
										<div className="grid grid-cols-3 gap-2">
											<Image
												src="https://images.unsplash.com/photo-1569292912461-802a58b76d5f?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
												alt="Eleanor Grace Thompson"
												width={500}
												height={400}
												className="w-full h-36 sm:h-48 lg:h-64 object-cover rounded transition-all duration-500 group-hover:scale-105"
												style={{
													filter:
														"sepia(15%) saturate(80%) contrast(105%) brightness(95%)",
												}}
											/>
											<Image
												src="https://images.unsplash.com/photo-1588857805015-3fb765b35e92?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMwfHx8ZW58MHx8fHx8"
												alt="Eleanor Grace Thompson"
												width={500}
												height={400}
												className="w-full h-36 sm:h-48 lg:h-64 object-cover rounded transition-all duration-500 group-hover:scale-105"
												style={{
													filter:
														"sepia(15%) saturate(80%) contrast(105%) brightness(95%)",
												}}
											/>
											<Image
												src="https://images.unsplash.com/photo-1542595735-e9f9932efe8b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM1fHx8ZW58MHx8fHx8"
												alt="Eleanor Grace Thompson"
												width={500}
												height={400}
												className="w-full h-36 sm:h-48 lg:h-64 object-cover rounded transition-all duration-500 group-hover:scale-105"
												style={{
													filter:
														"sepia(15%) saturate(80%) contrast(105%) brightness(95%)",
												}}
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Memorial Message */}
							<div
								className={`space-y-4 transition-all duration-800 delay-600 ease-out transform ${
									isLoaded
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-4"
								}`}
							>
								<div className="w-8 h-px bg-amber-500" />
								<p className="text-lg lg:text-xl leading-relaxed text-slate-300 font-light max-w-md">
									A beloved mother and friend whose gentle spirit touched
									countless lives. Her legacy of compassion continues to
									inspire.
								</p>

								<blockquote className="text-slate-400 italic pl-4 border-l-2 border-slate-700 font-light">
									&ldquo;She made everyone feel deeply valued.&rdquo;
								</blockquote>
							</div>
						</div>

						{/* Right Column - QR Code */}
						<div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 h-full">
							{/* QR Code Section */}

							{/* Alternative Methods - Compact */}
							{/* <div */}
							{/* 	className={`transition-all duration-800 delay-1000 ease-out transform w-full ${ */}
							{/* 		isLoaded */}
							{/* 			? "opacity-100 translate-y-0" */}
							{/* 			: "opacity-0 translate-y-4" */}
							{/* 	} order-2 lg:order-1`} */}
							{/* > */}
							{/* 	<div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700 p-6 space-y-4"> */}
							{/* 		<h4 className="text-center text-sm font-medium text-slate-400 tracking-wide uppercase"> */}
							{/* 			Other Ways to Donate */}
							{/* 		</h4> */}
							{/**/}
							{/* 		<div className="grid grid-cols-3 gap-4 text-center"> */}
							{/* 			<div className="space-y-1"> */}
							{/* 				<div className="text-2xl">🌐</div> */}
							{/* 				<div className="text-xs text-slate-400">Online</div> */}
							{/* 			</div> */}
							{/* 			<div className="space-y-1"> */}
							{/* 				<div className="text-2xl">📞</div> */}
							{/* 				<div className="text-xs text-slate-400">Phone</div> */}
							{/* 			</div> */}
							{/* 			<div className="space-y-1"> */}
							{/* 				<div className="text-2xl">✉</div> */}
							{/* 				<div className="text-xs text-slate-400">Mail</div> */}
							{/* 			</div> */}
							{/* 		</div> */}
							{/* 	</div> */}
							{/* </div> */}
							<div
								className={`transition-all duration-800 delay-800 ease-out transform ${
									isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
								} order-1 lg:order-2`}
							>
								<div className="relative group bg">
									{/* Card background with gradient */}
									{/* <div className="absolute -inset-6 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-2xl" /> */}
									{/* <div className="absolute -inset-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl" /> */}

									<div
										className="relative bg-white w-full max-w-lg sm:max-w-2xl lg:w-[40rem] border border-slate-200 
                                        p-5 sm:p-8 lg:p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500"
									>
										<div className="text-center space-y-6">
											<div className="space-y-2">
												<h3 className="text-lg sm:text-xl lg:text-2xl font-light text-slate-800 tracking-wide uppercase">
													Memorial Fund
												</h3>
												<div className="w-16 h-px bg-slate-300 mx-auto" />
											</div>

											{/* Large QR code for easy mobile scanning */}
											<div className="relative">
												<Image
													src={qrCodeUrl}
													alt="Memorial Fund Donation QR Code"
													width={320}
													height={320}
													className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105"
												/>

												{/* QR code corner accents */}
												<div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-slate-400" />
												<div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-slate-400" />
												<div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-slate-400" />
												<div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-slate-400" />
											</div>

											<div className="space-y-3">
												<p className="text-base sm:text-lg text-slate-600 font-light tracking-wide uppercase">
													Scan to Donate
												</p>
												<p className="text-xs sm:text-sm text-slate-500">
													Supporting The Eleanor Grace Foundation
												</p>
												<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-1">
													<Link
														href="/qr-code"
														target="_blank"
														rel="noopener noreferrer"
														className="inline-flex items-center justify-center rounded-md bg-amber-400 px-4 py-2 text-sm font-medium
                                                        text-slate-900 shadow-sm hover:bg-amber-500 focus:outline-none transition-colors duration-300"
													>
														Open Donation Page
													</Link>
													<button
														onClick={handleCopyLink}
														className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 active:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
														aria-live="polite"
													>
														{copied ? "Copied!" : "Copy Link"}
													</button>
													<button
														onClick={handleShare}
														className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 active:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
													>
														Share
													</button>
												</div>
											</div>
										</div>
									</div>

									{/* Floating accent */}
									<div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-400 rounded-full opacity-60" />
									<div className="absolute -top-2 -left-2 w-5 h-5 bg-amber-400 rounded-full opacity-60" />
								</div>
							</div>
						</div>
					</div>

					{/* Bottom Quote - Minimal */}
					<div
						className={`mt-8 lg:mt-12 text-center transition-all duration-1000 delay-1200 ease-out transform ${
							isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
						}`}
					>
						<div className="max-w-2xl mx-auto">
							<div className="flex items-center justify-center space-x-4 mb-4">
								<div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
								<div className="w-1 h-1 bg-amber-500 rounded-full" />
								<div className="w-12 h-px bg-gradient-to-l from-transparent via-amber-500 to-transparent" />
							</div>

							<blockquote className="text-lg lg:text-xl font-light text-slate-400 italic leading-relaxed">
								&ldquo;Those we love never truly leave us. They live on in our
								hearts and memories.&rdquo;
							</blockquote>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
