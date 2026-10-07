This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install dependancies.
```bash
yarn install
```

Set up database.
- Install Docker if you have not.
- Start Docker.

```bash
yarn docker:db
```

If there is no data in the database, seed data.
```bash
yarn seed:db
```

Run the App on dev server.
```bash
yarn dev
```

 [http://localhost:3000/home](http://localhost:3000/home) with your browser to load the App. It will show the home page by default.

## Styling

Modular Scss is used in the App. There are global scss functions and stylings defined in `/styles` folder. Some rules as below:
- All colours should be defined in `_colours.scss`.
- All sizes that are defined as px in Figma should be converted with `px-to-vw`, which is defined in `_functions.scss`.
- All breakpoints shouold be defined in `_sizes.scss`.

## Icons and Images

All icon images should be stored in `src/assets/icons`. They will be imported in the Icon component `src/components/icons/index.tsx`. Use the Icon component to render icon in the App like below.
```bash
import Icon from "@/components/Icon";

<Icon icon={ICONS.ARROW_RIGHT} />
```

All icon and image animations should be stored in `/public`. The file path will be defined in `/lib/_imageMaps.ts`. Use the Animation component to render the animation like below.
```bash
import Animation frmo "@/components/Animation";

<Animation src={ANIMATIONS.ONBOARD} />
```

All images should be stoerd in `/public`. The file path will be defined in `/lib/_imageMaps.ts`. Use the Image component to render the images like below.
```bash
import Image from "@/components/Image";

<Image src={PRODUCT_IMAGES.BOILER} {...props} />
```

For banners on pages, use the Banner component.
```bash
import Banner from "@/components/Image/Banner";

<Banner bannerUrl={src} {...props}>
    overlay contnet here
</Banner>
```

For Image component, there are 3 types of images.
- "brand": Brand logo images
- "product": Product images, for example, photos of a boiler.
- "other": None of the above. It is set as default. For this option, widht and height of the image have to be provided.

# Deployment

`next build` cannot be run on EC2 instances because of memory limitation. Build it locally first.
```bash
yarn build
```

Then upload it to the instance.
```base
scp -r -i /path/to/your-key.pem .next/ ec2-user@your-ec2-ip:/path/to/your/app/
```

For updates,
```bash
rsync -avz --delete -e "ssh -i /path/to/your-key.pem" .next/ ec2-user@your-ec2-ip:/path/to/your/app/.next/
```