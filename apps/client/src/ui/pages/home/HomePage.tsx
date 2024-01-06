import Navbar from "../../components/navbar/Navbar";

const HomePage = () => {
    return (
        <div className="p-[1rem]">
            <Navbar />

            <div className="mt-[2rem] flex flex-col items-center">
                <h1>Welcome to Home Page</h1>
            </div>

        </div>
    )
}

export default HomePage;