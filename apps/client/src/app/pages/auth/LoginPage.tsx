import Navbar from "../../components/navbar/Navbar";
import LoginForm from "../../forms/auth/LoginForm";

const LoginPage = () => {
    return (
        <div className="p-[1rem]">
            <Navbar />

            <div className="mt-[1rem] p-[2rem] border flex flex-col items-center">
                <h1 className="text-[2rem] mb-[3rem]">Login Page</h1>

                <LoginForm />
            </div>

        </div>
    )
}

export default LoginPage;