'use client'
import {StaticImageData} from "next/image";
import AuthenticationFrame, {ImagePosition} from "@/app/(auth)/Frame/frame";
import RegisterForm from "@/app/(auth)/forms/register";

export default function RegisterPage() {

    const loginImage = {
        src: "/register.jpg",
        height: 1080,
        width: 1920,
    } as StaticImageData;

    return (
        <AuthenticationFrame
            imageSlide={loginImage}
            imagePosition={ImagePosition.Left}
            imageAlt="register background image"
        >
            <RegisterForm/>
        </AuthenticationFrame>
    );
}