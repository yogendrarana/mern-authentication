import Navbar from "../../components/navbar/Navbar";
import RegisterForm from "../../forms/auth/RegisterForm";

const RegisterPage = () => {
    return (
        <div className="p-[1rem]">
            <Navbar />

            <div className="mt-[1rem] p-[2rem] border flex flex-col items-center">
                <h1 className="text-[2rem] mb-[3rem]">Register Page</h1>

                <RegisterForm />
            </div>


        </div>
    )
}

export default RegisterPage;