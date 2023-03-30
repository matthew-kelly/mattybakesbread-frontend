<script>
	import Picture from '$lib/components/Picture.svelte';
	// import mattyAvif from '$lib/assets/matty.avif';
	import mattyWebp from '$lib/assets/matty.webp';
	import mattyPng from '$lib/assets/matty.png';

	import 'lazysizes';
	// import { lazyload } from '$lib/utils/lazyload.js';

	const mattyBase64 =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAMAAAAhfX2ZAAABAlBMVEXW1NfQ0dezsLXRtZ6blJYCAADJyM6vqqzSrpWWkZLJqZCOiYzAoos6NTfm5ujCw8q2tLimoKKznYyNhYaIgoS6nIKNgoKEe3umi3mzk3itjnOoem1uaWuYdl9nYFhlMSwnICAUCxL6+vzp6u3Ny9C/vcHjxq+/sa+1r665rKfbvqbCsqbVuqOcmZ3Jr5yvopuUmZixnJbKrJTMno2bkIy+mYqcj4m8k4G2jX62iHp8dXaSfnKYfHGqi2+bfmWmgmSdfWSFbl2AZ12adVmMY1l/YVhTTEyEZEp+U0p0WkhHQ0dTTUWLZEFUKiFpIx4CFx0eFBgmFhdbFw5sLABOBQBGBACsq8FMAAAAkElEQVQI1wXBgwHDAAAEwI9dx65t2zb2X6V3iEfI8+vBMGGIJNL011eU4Akpgrd//wV7BXSm9dneNIdhQLLDkb0jiJqEJtexj2sWBAHPmw7cUy4ajWF1MXj1migVOfRjhZ64WcqJCcCSQp2SzZmBLBmXKnlKtExwgpBqVClKtUCP9VS3zLfnB9COntREXnYXf2leEOO1xU1EAAAAAElFTkSuQmCC';
</script>

<div>
	<h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">I'm Matty</h1>
	<p class="font-semibold mb-4 ml-4 md:ml-8 text-h6">(and that's Darcy)</p>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-5 bg-white p-4">
		<Picture
			width={480}
			height={600}
			blur={mattyBase64}
			alt="Matty (of Matty Bakes Bread), with his dog Darcy"
			classesPicture="flex flex-col w-full"
			classes="w-auto rounded-5 lazyload"
		>
			<!-- <source data-srcset={mattyAvif} type="image/avif" /> -->
			<source data-srcset={mattyWebp} type="image/webp" />
			<source data-srcset={mattyPng} />
		</Picture>
		<div class="bio">
			<h2 class="mb-0 text-h3 md:text-h2">Hello friends and family!</h2>
			<p class="text-base font-bold">(and random people online)</p>
			<p>
				Like literally everyone else during the pandemic, I got into sourdough in April 2020 when my neighbour gave me
				some of her starter.
			</p>
			<p>I've been baking all my life, but since then, I've really fallen in love with bread.</p>
			<p>
				<span class="font-semibold">Matty Bakes Bread</span> started as a way for me to combine two of my passions — making
				delicious food and sitting on my ass in front of the computer.
			</p>
			<p>
				Please take a look at anything I've got in <a href="/shop" class="text-secondary-dark">the shop</a>, see if I've
				posted <a href="/content" class="text-secondary-dark">anything new</a>, or feel free to follow me on my
				Instagram account.
			</p>
			<p>Thanks for supporting me on this journey!</p>
			<div class="flex">
				<a
					href="https://www.instagram.com/mattybakesbread/"
					target="_blank"
					rel="noreferrer"
					class="btn my-2 mx-auto flex items-center"
				>
					<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10.946 5.33081C7.84058 5.33081 5.33569 7.83569 5.33569 10.9412C5.33569 14.0466 7.84058 16.5515 10.946 16.5515C14.0515 16.5515 16.5564 14.0466 16.5564 10.9412C16.5564 7.83569 14.0515 5.33081 10.946 5.33081ZM10.946 14.5886C8.93921 14.5886 7.29858 12.9529 7.29858 10.9412C7.29858 8.92944 8.93433 7.2937 10.946 7.2937C12.9578 7.2937 14.5935 8.92944 14.5935 10.9412C14.5935 12.9529 12.9529 14.5886 10.946 14.5886V14.5886ZM18.0945 5.10132C18.0945 5.82886 17.5085 6.40991 16.7859 6.40991C16.0584 6.40991 15.4773 5.82397 15.4773 5.10132C15.4773 4.37866 16.0632 3.79272 16.7859 3.79272C17.5085 3.79272 18.0945 4.37866 18.0945 5.10132ZM21.8103 6.42944C21.7273 4.67651 21.3269 3.12378 20.0427 1.84448C18.7634 0.565185 17.2107 0.164795 15.4578 0.0769043C13.6511 -0.0256348 8.23608 -0.0256348 6.42944 0.0769043C4.6814 0.159912 3.12866 0.560303 1.84448 1.8396C0.560303 3.1189 0.164795 4.67163 0.0769043 6.42456C-0.0256348 8.2312 -0.0256348 13.6462 0.0769043 15.4529C0.159912 17.2058 0.560303 18.7585 1.84448 20.0378C3.12866 21.3171 4.67651 21.7175 6.42944 21.8054C8.23608 21.908 13.6511 21.908 15.4578 21.8054C17.2107 21.7224 18.7634 21.322 20.0427 20.0378C21.322 18.7585 21.7224 17.2058 21.8103 15.4529C21.9128 13.6462 21.9128 8.23608 21.8103 6.42944V6.42944ZM19.4763 17.3914C19.0955 18.3484 18.3582 19.0857 17.3962 19.4714C15.9558 20.0427 12.5378 19.9109 10.946 19.9109C9.35425 19.9109 5.9314 20.0378 4.49585 19.4714C3.53882 19.0906 2.80151 18.3533 2.41577 17.3914C1.84448 15.9509 1.97632 12.533 1.97632 10.9412C1.97632 9.34937 1.84937 5.92651 2.41577 4.49097C2.79663 3.53394 3.53394 2.79663 4.49585 2.41089C5.93628 1.8396 9.35425 1.97144 10.946 1.97144C12.5378 1.97144 15.9607 1.84448 17.3962 2.41089C18.3533 2.79175 19.0906 3.52905 19.4763 4.49097C20.0476 5.9314 19.9158 9.34937 19.9158 10.9412C19.9158 12.533 20.0476 15.9558 19.4763 17.3914Z"
							fill="#222222"
						/>
					</svg>
					<span class="ml-2">@mattybakesbread</span>
				</a>
			</div>
		</div>
	</div>
</div>
