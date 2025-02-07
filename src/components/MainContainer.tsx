import {Cell} from "./Cell.tsx";

export const MainContainer = () => {
    return (
        <>
            <div className="h-screen w-screen bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                <div className="margin-auto w-full md:max-w-[500px] xl:max-w-[700px] h-full md:h-[70%] p-10 bg-blue-500 text-center m-auto gap-3 text-white md:rounded-2xl shadow-2xl">
                    <h1 className="text-2xl font-bold">Find a Couple</h1>
                    <div className="text-xl font-light">Round 1</div>
                    <div className="grid grid-cols-4 grid-rows-5 gap-6 h-full m-10">
                        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((item) => (<Cell/>))}

                    </div>
                </div>
            </div>
        </>
    );
};