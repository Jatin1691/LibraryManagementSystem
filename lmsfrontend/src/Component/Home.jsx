const Home=()=>{
    return <>
       
     <div className=" flex  mt-10 items-center px-20">
        <div className="flex flex-col w-[45%] flex-wrap gap-6">
            <div className="text-6xl p-3 font-bold leading-tight  text-malachite-700">Welcome to Library Management System</div>
            <div className="text-lg font-bold text-silver-chalice-700">
            A Library Management System efficiently handles book, member management, borrowing, returning in libraries.</div>
        </div>
        <div className="w-[55%]">
           <img src="./book3.png"></img>
        </div>
    </div>
    </>
}

export default Home;