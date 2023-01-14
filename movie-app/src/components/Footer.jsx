import React from 'react'

const Footer = () => {
  return (
    
<footer class="p-4 bg-white  bottom-0 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-[#032541]">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-100">© 2023 <a href="https://flowbite.com/" class="hover:underline">Developed</a>. by Subham Mishra
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-100 dark:text-gray-100 sm:mt-0">
        <li>
            <a href="/" class="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="/" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="/" class="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href="/" class="hover:underline">Contact</a>
        </li>
    </ul>
</footer>

  )
}

export default Footer