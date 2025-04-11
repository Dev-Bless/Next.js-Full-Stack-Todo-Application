import Link from 'next/link';
import Image, {StaticImageData} from 'next/image';
import {JSX, ReactNode} from 'react';

export enum ImagePosition {
    Left = 'left',
    Right = 'right',
}

type AuthenticationFrameProps = Readonly<{
    children: ReactNode;
    imageSlide: StaticImageData;
    imagePosition?: ImagePosition;
    imageAlt: string;
}>;

export default function AuthenticationFrame({
                                                children,
                                                imageSlide,
                                                imagePosition = ImagePosition.Right,
                                                imageAlt,
                                            }: AuthenticationFrameProps): JSX.Element {
    const flexDirection = imagePosition === ImagePosition.Right ? 'flex-row-reverse' : 'flex-row';

    return (
        <main className={`flex h-screen w-full ${flexDirection} p-5`}>
            <div className="relative hidden h-full w-1/2 overflow-clip rounded-[10px] bg-gray-400 lg:flex">
                <Image
                    src={imageSlide}
                    className="absolute z-0 h-full w-full object-cover object-center"
                    alt={imageAlt}
                />
            </div>
            <div className="flex h-full flex-1 flex-col">
                <div className="flex flex-1 flex-col items-center justify-center">{children}</div>
                <div className="mt-2 flex flex-col justify-center px-4 text-center text-sm sm:flex-row sm:gap-6">
                    <div className="text-primary space-x-1">
                        <Link href="/">Terms & Conditions</Link>
                        <span className="text-black">|</span>
                        <Link href="/">Privacy & Policy</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}