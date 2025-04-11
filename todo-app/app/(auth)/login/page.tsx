import {StaticImageData} from "next/image";
import AuthenticationFrame, {ImagePosition} from "@/app/(auth)/Frame/frame";
import LoginForm from "@/app/(auth)/forms/login";

export default function LoginPage() {

    const loginImage = {
        src: "/login.jpg",
        height: 1080,
        width: 1920,
    } as StaticImageData;

    return (
        <AuthenticationFrame
            imageSlide={loginImage}
            imagePosition={ImagePosition.Right}
            imageAlt="Login background image"
        >
            <LoginForm/>
        </AuthenticationFrame>
    );
}