import { Link } from "react-router-dom";
import NewNews from "./components/NewNews";
import RelatedContent from "./components/RelatedContent";
import Comments from "./components/Comments";
import { usePostInteractions } from "../home/components/PostInteractions";
import PostInteractionButtons from "../home/components/PostInteractionButtons";
import { PhotoProvider, PhotoView } from 'react-photo-view';

export default function PublicationDetails() {
    const postInteractions = usePostInteractions();

    // Datos de ejemplo para la publicación
    const publication = {
        idPublication: 1,
        title: "Historic Downtown Street Fair Attracts Record Crowds",
        totalLikes: 45,
        totalUnlikes: 2,
        totalComments: 12
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 xl:px-32 my-25">
            <div className="layout-content-container flex flex-col lg:flex-row gap-8">
                {/* Main Content*/}
                <div className="w-full lg:w-2/3 shrink-0">
                    <article className="bg-white rounded-xl shadow-sm p-3 sm:p-6 md:p-8">
                        {/* Breadcrumbs */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Link className="text-sm font-medium text-gray-500" to="/">Inicio</Link>
                            <span className="text-sm font-medium text-gray-500 ">/</span>
                            <Link className="text-sm font-medium text-gray-500" to="/#loultimo">Lo último</Link>
                            <span className="text-sm font-medium text-gray-500  hidden sm:inline">/</span>
                            <span className="text-sm font-medium text-[#111418]  line-clamp-1 sm:line-clamp-none">Historic Downtown Street Fair Attracts Record Crowds</span>
                        </div>
                        {/* Headline */}
                        <h1 className="text-[#111418]  tracking-tight text-3xl md:text-4xl font-bold leading-tight text-left pb-3 pt-2">Historic Downtown Street Fair Attracts Record Crowds</h1>
                        {/* Post Meta */}
                        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-4 border-y border-gray-200 py-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="Author avatar, Jane Doe" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg')" }}></div>
                                <p className="text-sm font-medium text-[#111418] flex-1 truncate">Jane Doe, City Correspondent</p>
                            </div>
                            <div className="shrink-0 ml-auto flex items-center gap-4 text-gray-500  text-sm">
                                <span>150 vistas</span>
                                <span>•</span>
                                <span>Octubre 26, 2023</span>
                                <span>•</span>
                                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs font-bold" >Categoría</span>
                            </div>
                        </div>
                        {/* Image Carousel */}
                        <PhotoProvider>
                            <div className="my-6">
                                <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-xl">
                                    <div className="flex items-stretch snap-x snap-mandatory gap-3">
                                        <div className="flex h-full flex-1 flex-col gap-4 min-w-[60vw] sm:min-w-60 snap-center">
                                            <PhotoView src="https://media1.thrillophilia.com/filestore/n2ib9inwzcilxpg3aumbigvq4jus_IMG_World_Dubai_Fun_38a0986c1a.jpg">
                                                <div
                                                    className="w-full h-[220px] sm:h-[200px] bg-center bg-no-repeat sm:aspect-video bg-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                                                    data-alt="A bustling street fair"
                                                    style={{
                                                        backgroundImage:
                                                            "url('https://media1.thrillophilia.com/filestore/n2ib9inwzcilxpg3aumbigvq4jus_IMG_World_Dubai_Fun_38a0986c1a.jpg')",
                                                    }}
                                                ></div>
                                            </PhotoView>
                                        </div>
                                        <div className="flex h-full flex-1 flex-col gap-4 min-w-[60vw] sm:min-w-60 snap-center">
                                            <PhotoView src="https://holidaylocationguide.com/wp-content/uploads/2023/11/Img-world-cartoon-network-1.jpg">
                                                <div
                                                    className="w-full h-[220px] sm:h-[200px] bg-center bg-no-repeat sm:aspect-video bg-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                                                    data-alt="Food stall"
                                                    style={{
                                                        backgroundImage:
                                                            "url('https://holidaylocationguide.com/wp-content/uploads/2023/11/Img-world-cartoon-network-1.jpg')",
                                                    }}
                                                ></div>
                                            </PhotoView>
                                        </div>
                                        <div className="flex h-full flex-1 flex-col gap-4 min-w-[60vw] sm:min-w-60 snap-center">
                                            <PhotoView src="https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000">
                                                <div
                                                    className="w-full h-[220px] sm:h-[200px] sm:aspect-video bg-center bg-no-repeat bg-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                                                    data-alt="Live music"
                                                    style={{
                                                        backgroundImage:
                                                            "url('https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000')",
                                                    }}
                                                ></div>
                                            </PhotoView>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PhotoProvider>
                        {/* Post Body */}
                        <div className="prose prose-lg  max-w-none text-gray-800 ">
                            <p>This past weekend, the heart of our city came alive as the annual Historic Downtown Street Fair attracted an unprecedented number of visitors. The event, which spanned three blocks, showcased the best of local culture, cuisine, and craftsmanship, drawing in families and tourists alike for a day of celebration and community.</p>
                            <p>From early morning until late evening, the streets were filled with the sights and sounds of joy. Over 150 vendors offered everything from handmade jewelry to artisanal cheeses, while food trucks served up a diverse array of culinary delights. The main stage featured a continuous lineup of local bands, providing a vibrant soundtrack to the festivities.</p>

                        </div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-8">
                            <span className="bg-gray-100 text-gray-600  text-xs font-bold py-1.5 px-3 rounded-full hover:bg-gray-200 transition-colors" >#StreetFair</span>
                            <span className="bg-gray-100 text-gray-600  text-xs font-bold py-1.5 px-3 rounded-full hover:bg-gray-200 transition-colors" >#Community</span>
                            <span className="bg-gray-100 text-gray-600  text-xs font-bold py-1.5 px-3 rounded-full hover:bg-gray-200 transition-colors" >#FamilyFriendly</span>
                        </div>
                        <div className="border-t border-gray-200 my-5 sm:my-8"></div>

                        <PostInteractionButtons
                            publication={publication}
                            likedPosts={postInteractions.likedPosts}
                            dislikedPosts={postInteractions.dislikedPosts}
                            savedPosts={postInteractions.savedPosts}
                            showFilledLike={postInteractions.showFilledLike}
                            showFilledDislike={postInteractions.showFilledDislike}
                            onLike={postInteractions.handleLike}
                            onDislike={postInteractions.handleDislike}
                            onComment={postInteractions.handleComment}
                            onBookmark={postInteractions.handleBookmark}
                            onShare={postInteractions.handleShare}
                        />
                    </article>
                    {/* Comments Section */}
                    <Comments />
                </div>
                {/* Sidebar */}
                <aside className="w-full lg:w-1/3 space-y-8 lg:sticky top-24 self-start">
                    {/* Últimas noticias*/}
                    <NewNews />
                    {/* Related Content */}
                    <RelatedContent />
                </aside>
            </div>
        </div>
    )
}