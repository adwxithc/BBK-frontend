import LoginForm from "./LoginForm"

function page() {
    return (
        <div className="h-screen bg-neutral-950 text-neutral-100 flex justify-center items-center">
            <div className="max-w-lg w-full  border border-neutral-700 bg-neutral-900 p-5 rounded-md text-sm font-semibold">
                <h2 className="font-semibold text-center text-2xl mb-5 capitalize text-neutral-50">Login</h2>
                <div>
                    <LoginForm />
                </div>

            </div>

        </div>
    )
}

export default page
