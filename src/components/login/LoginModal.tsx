import CustomModal from "../custom/CustomModal"


const LoginModal = () => {
    return (
        <CustomModal
            title="Login"
            isOpen={true}
            onClose={() => { }}
            size="sm"
            // animation="slide-down"
        >
            <div className="flex flex-col gap-4">
                <a
                    href={`https://discord.com/api/oauth2/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${window.location.origin}/callback`)}&response_type=code&scope=identify%20guilds`}
                    className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Login with Discord
                </a>
            </div>
        </CustomModal>
    )
}

export default LoginModal
