const About=()=>{
    return <>
    <section className="" id="#about">
    <div>
      <div className=" flex text-4xl font-bold mt-10 items-center justify-center">About Us</div>
      </div>
     <div>
        <div className=" flex  mt-10 items-center px-20">
        
        <div className="w-[55%]">
           <img src="./book3.png"></img>
        </div>
        <div className="flex flex-col w-[45%] flex-wrap gap-6">
            <div className="text-3xl p-3 font-bold leading-tight  text-malachite-700">A system to organize, track, and manage library resources and transactions.</div>
            <div className="text-lg font-bold text-silver-chalice-700">A library management system enables efficient cataloging, tracking of borrowed and returned items, managing member records, and automating routine library tasks and processes.</div>
        </div>
    </div>
    </div>
    </section>
    </>
}

export default About;