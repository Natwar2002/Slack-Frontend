export const Auth = ({ children }) => {
    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="md:h-auto md:w-[450px] border-none p-5">
                { children }
            </div>
        </div>
    );
};