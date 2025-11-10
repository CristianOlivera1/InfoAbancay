export default function NewNews() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-[#111418]  mb-4 border-b border-gray-200  pb-3">Últimas noticias</h3>
            <div className="space-y-4">
                <a className="flex items-center gap-4 group" href="#">
                    <div className="w-20 h-20 bg-center bg-no-repeat bg-cover rounded-lg shrink-0" data-alt="City council in a meeting" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOi6jnktC68Y-_nZsGMRL7-RbrbtaSeLD5YDftGJWpf79CHlCjKHVxkoXhVKEbVjxLB6cobk7oOZF1HiHp-wiXkFfcbmFI77LBYG4_Q_r47kV-MSOATNMMzcnoBnpyPMSHQvI-0l8X4D8lM4jRmRhlmjwo3j_UlYmmvWiQR6-TcHV-kIpqwhmN4wnCpOBzhxTRO4y4c_50yERU39pEczkBgHkLMhV9kCUx-qr4R1pxFFa0xHIa9g90bEE4FaBs2wCuxP-pMb9hBw')" }}></div>
                    <div>
                        <p className="text-sm font-bold leading-snug text-[#111418]    transition-colors">City Council Approves New Green Space Initiative</p>
                        <p className="text-xs text-gray-500  mt-1">October 25, 2023</p>
                    </div>
                </a>
                <a className="flex items-center gap-4 group" href="#">
                    <div className="w-20 h-20 bg-center bg-no-repeat bg-cover rounded-lg shrink-0" data-alt="Modern library interior" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaG2rlDTnt0ruZ0OXzM2PiNncHv5-y9s2BZ3_aH8_ILtLjhO_yziY0O9ZZGXr-zWINyIkzqs1GfpX5J8HKU1brrpJeEGl-PGcfcFfPFjjdhyj842PYi2mcBaooABHGGKmi40RWEh26Kiyhilv8gA8RXmv5-7owo9Tuhjo7Z5knRpr7zENlN1n33tCedK37NGrh6_32XBCIoMti4a7ZiLRLe0VKCMqbgwQC1bn6oNKUgoOb_f_d1F5-CN9SnJMFvyUF2Q1gO0Ur1A')" }}></div>
                    <div>
                        <p className="text-sm font-bold leading-snug text-[#111418]    transition-colors">Public Library Launches Digital Literacy Program</p>
                        <p className="text-xs text-gray-500  mt-1">October 24, 2023</p>
                    </div>
                </a>
            </div>
        </div>
    )
}