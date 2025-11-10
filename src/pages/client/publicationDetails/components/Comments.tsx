export default function Comments() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mt-8">
            <h3 className="text-xl font-bold text-[#111418]  mb-6">Comentarios (3)</h3>
            {/* Comment Input */}
            <div className="flex items-start gap-4 mb-8">
                <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 mt-1"
                    data-alt="User avatar image"
                    style={{
                        backgroundImage:
                            "url('https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg')",
                    }}
                ></div>

                <div className="flex-1">
                    <textarea
                        className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none shadow-sm transition"
                        placeholder="Add a comment..."
                        rows={3}
                    ></textarea>

                    <div className="flex justify-end mt-2">
                        <button className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-semibold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow">
                            <span className="truncate">Post Comment</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Comment List */}
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0" data-alt="Avatar of Sarah P." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfmjetrQ2GGzJF8ijzdUKEVesnlVA2EjnWXzpJmtUFKVc0EMWCxAiUUpQpT2FEytZMrirLTnV-guqVQ7AOjBeyo1Ou3M5UZQU_upCIWe_utet_FStaLGVg3HWg18KdJyos_yK296ph2xarxpjD05WRrX9_nwEWEzXmHSmaheajc-MFK0ejjzCgl4n77ORtVUX-cLMrjwPn7LTKjWufPp1z49s11INZeGV_vL-tmAmqvlf0dnkAP4kiP29L7HMKhpE_Nxj6IOuSsg')" }}></div>
                    <div>
                        <div className="bg-gray-100  rounded-xl p-4">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-bold text-[#111418] ">Sarah P.</p>
                                <p className="text-xs text-gray-500 ">1 day ago</p>
                            </div>
                            <p className="text-sm text-gray-700 ">This was such a wonderful event! My kids had a blast. Can't wait for next year.</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500  mt-2 px-2">
                            <a className="hover:underline" href="#">Like</a>
                            <span>·</span>
                            <a className="hover:underline" href="#">Reply</a>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0" data-alt="Avatar of Mark Chen" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcZifhKd6c69a0Oh6shKbW7KvN8qq4R66T6RgGGHZL4ApKyPnoXB-9qEvuXj2Uvxq6v5Vwx4tQorknuPBEGon5SA-yDfos2V3AoyNB1O3AePZVAi_IsrwGcyrluM_n6XWdIZHCPfiqa7yN7ldNPYb6fY8CHjN7D1OyZZ8dX2PEdgk7hpRC2n7iMfb6mE8pupID3E9kImQJTo9-2HhCtsABJhV-3-IrdjmXpO6CrSze0BWV0SAYEpokosS1QpV9f9S6eXuXUOkr0Q')" }}></div>
                    <div>
                        <div className="bg-gray-100  rounded-xl p-4">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-bold text-[#111418] ">Mark Chen</p>
                                <p className="text-xs text-gray-500 ">2 days ago</p>
                            </div>
                            <p className="text-sm text-gray-700 ">The food was incredible. I tried the tacos from that new truck and they were the best I've ever had. Kudos to the organizers for bringing in such great vendors.</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500  mt-2 px-2">
                            <a className="hover:underline" href="#">Like</a>
                            <span>·</span>
                            <a className="hover:underline" href="#">Reply</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}