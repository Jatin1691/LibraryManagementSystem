import { IconBrandFacebook,IconBrandInstagram,IconBrandX } from "@tabler/icons-react"

const Footer=()=>{
    
    return <>
    <div className="flex mt-10 justify-around">
     <div className="w-1/4   flex flex-col gap-4">
    <div className="flex gap-1 items-center text-malachite-700">
        
        <div className="text-3xl font-semibold">Library Management System</div>
        </div>

        <div className="text-sm text-malachite-600">A library management system streamlines cataloging, tracking, and managing books, member records, and transactions, improving library operations and user experience.</div>
        <div className="flex gap-5 text-malachite-500">
        <div className="p-2 rounded-full bg-silver-chalice-900 hover:bg-silver-chalice-700"><IconBrandFacebook/></div>
        <div className="p-2 rounded-full  bg-silver-chalice-900 hover:bg-silver-chalice-700" ><IconBrandInstagram/></div>
        <div className="p-2 rounded-full  bg-silver-chalice-900 hover:bg-silver-chalice-700"><IconBrandX/></div>
        </div>
    </div>

<div >
<div className="text-lg mb-4 font-semibold text-silver-chalice-900">Help</div>
<div  className="text-silver-chalice-800 text-sm mb-1 hover:text-malachite-500 cursor-pointer">Contact</div>
<div  className="text-silver-chalice-800 text-sm mb-1 hover:text-malachite-500 cursor-pointer">Return</div>
<div  className="text-silver-chalice-800 text-sm mb-1 hover:text-malachite-500 cursor-pointer">MyAccount</div>

</div>

<div >
<div className="text-lg mb-4 font-semibold text-silver-chalice-900">Learn</div>
<div  className="text-silver-chalice-800 text-sm mb-1 hover:text-malachite-500 cursor-pointer">FAQ</div>
<div  className="text-silver-chalice-800 text-sm mb-1 hover:text-malachite-500 cursor-pointer">ABOUT US</div>
<div  className="text-silver-chalice-800 text-sm mb-1 hover:text-malachite-500 cursor-pointer">Home</div>
<div  className="text-silver-chalice-800 text-sm mb-1 hover:text-malachite-500 cursor-pointer">BOOKLIST</div>

</div>

<div >
<div className="text-lg mb-4 font-semibold text-silver-chalice-900">Contact us</div>
<div  className="text-silver-chalice-800 text-sm mb-1 hover:text-malachite-500 cursor-pointer">+91 7392936195</div>
<div  className="text-silver-chalice-800 text-sm mb-1 hover:text-malachite-500 cursor-pointer">jatinkumar9162@gmail.com</div>
</div>

</div>
    
    
    </>
        
    

    


}

export default Footer